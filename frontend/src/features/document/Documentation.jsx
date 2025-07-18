import React from 'react'

export default function Documentation({ html }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    )
}
