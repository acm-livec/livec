import { useState, useCallback, useMemo } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

// Convert JSON blocks to Slate node structure
const jsonToSlateNodes = (blocks) => {
    const nodeForBlock = (block) => {
        if (block.items) {
            // It's a list block
            const listType = block.listType === 'ol' ? 'numbered-list' : 'bulleted-list'
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

// Render Slate elements according to element.type
const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case 'heading': {
            const Tag = `h${element.level}`
            return <Tag {...attributes}>{children}</Tag>
        }
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
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
            <Editable
                renderElement={renderElement}
                placeholder="Enter content..."
            />
        </Slate>
    )
}

export default PageEditor