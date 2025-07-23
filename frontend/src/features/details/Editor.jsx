import { useState, useCallback, useMemo } from 'react'
import { createEditor, Transforms, Editor as SlateEditor, Element as SlateElement } from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'

// Custom block types that should default to ordered lists when items are present
const CUSTOM_ORDERED_LIST_TYPES = [
  'cs-core',
  'ka-core',
  'non-core',
  'illustrative-learning-outcomes',
  'professional-dispositions',
]

// List types for toggling and indent/outdent
const LIST_TYPES = ['numbered-list', 'bulleted-list']

// Styled list renderer (copied from Page.jsx)
const renderList = (children, type = 'ul', depth = 0) => {
  const ListTag = type
  const className = `${type}-list depth-${depth}`

  return (
    <ListTag className={className} style={{ paddingLeft: `${1.5 * (depth + 1)}rem` }}>
      {children}
    </ListTag>
  )
}

// Toggle block formats (headings, lists)
const isBlockActive = (editor, format) => {
  const [match] = SlateEditor.nodes(editor, {
    match: (n) => !SlateEditor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })
  return !!match
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(!SlateEditor.isEditor(n) && SlateElement.isElement(n) && n.type),
    split: true,
  })

  Transforms.setNodes(editor, { type: isActive ? 'paragraph' : isList ? 'list-item' : format })

  if (!isActive && isList) {
    Transforms.wrapNodes(editor, { type: format, children: [] }, { match: (n) => n.type === 'list-item' })
  }
}

// Indent/outdent behavior for list items via Tab/Shift+Tab or toolbar
const indentList = (editor) => {
  const [match] = SlateEditor.nodes(editor, { match: (n) => n.type === 'list-item' })
  if (match) {
    const [, path] = match
    const [parentNode] = SlateEditor.parent(editor, path)
    if (LIST_TYPES.includes(parentNode.type)) {
      Transforms.wrapNodes(editor, { type: parentNode.type, children: [] }, { at: path })
    }
  }
}

const outdentList = (editor) => {
  const [match] = SlateEditor.nodes(editor, { match: (n) => LIST_TYPES.includes(n.type) })
  if (match) {
    const [, path] = match
    Transforms.unwrapNodes(editor, { at: path })
  }
}

// Simple toolbar button wrapper
const BlockButton = ({ format, icon, action }) => {
  const editor = useSlate()
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault()
        if (action) action(editor)
        else toggleBlock(editor, format)
      }}
      style={{ padding: '0.25rem 0.5rem', marginRight: '0.25rem', cursor: 'pointer' }}
    >
      {icon}
    </button>
  )
}
const jsonToSlateNodes = (blocks) => {
  const nodeForBlock = (block) => {
    if (block.items) {
      // It's a list block; determine ordered vs. bulleted (default to custom ordered types)
      let htmlList = block.listType
      if (!htmlList) {
        htmlList = CUSTOM_ORDERED_LIST_TYPES.includes(block.type.toLowerCase()) ? 'ol' : 'ul'
      }
      const listType = htmlList === 'ol' ? 'numbered-list' : 'bulleted-list'
      const children = block.items.map((item) => {
        let text = ''
        let subitems = []
        if (typeof item === 'string') {
          text = item
        } else if (item.text) {
          text = item.text
          subitems = item.subitems || []
        }
        const liNode = { type: 'list-item', children: [{ text }] }
        if (subitems.length) {
          // Recursively handle nested lists
          const nested = nodeForBlock({
            type: block.type,
            listType: block.listType,
            items: subitems,
          })
          liNode.children.push(nested)
        }
        return liNode
      })
      return { type: listType, children }
    }

    // Non-list blocks
    switch (block.type.toLowerCase()) {
      case 'heading': {
        const level = block.level || 1
        return { type: 'heading', level, children: [{ text: block.text || '' }] }
      }
      case 'paragraph':
        return { type: 'paragraph', children: [{ text: block.text || '' }] }
      default:
        return { type: 'paragraph', children: [{ text: block.text || '' }] }
    }
  }
  return blocks.map(nodeForBlock)
}

// Render Slate elements based on element.type
const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'heading': {
      const Tag = `h${element.level}`
      return <Tag {...attributes}>{children}</Tag>
    }
    case 'numbered-list':
      return renderList(children, 'ol')
    case 'bulleted-list':
      return renderList(children, 'ul')
    case 'list-item':
      return <li {...attributes}>{children}</li>
    default:
      return <p {...attributes}>{children}</p>
  }
}

/**
 * PageEditor
 * A Slate-based editor for custom blocks (headings, paragraphs, lists).
 * @param {{ content: Array }} props
 */
export const PageEditor = ({ content = [] }) => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState(() => jsonToSlateNodes(content))

  const renderElement = useCallback((props) => <Element {...props} />, [])

  return (
    <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
      {/* Toolbar (non-editable) */}
      <div contentEditable={false} style={{ marginBottom: '0.5rem' }}>
        <BlockButton format="heading" icon="H1" />
        <BlockButton action={(ed) => toggleBlock(ed, 'heading')} icon="H2" />
        <BlockButton format="bulleted-list" icon="•" />
        <BlockButton format="numbered-list" icon="1." />
        <BlockButton action={indentList} icon="Tab→" />
        <BlockButton action={outdentList} icon="←Tab" />
      </div>
      <Editable
        renderElement={renderElement}
        placeholder="Enter content..."
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault()
            if (e.shiftKey) outdentList(editor)
            else indentList(editor)
          }
        }}
      />
    </Slate>
  )
}

export default PageEditor