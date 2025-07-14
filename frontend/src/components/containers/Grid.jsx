import React from 'react'
import styles from './Grid.module.scss'



const _convertGrid = (item) => {

    if (typeof item === 'number') {
        return `repeat(${item}, 1fr)`;
    } else if (typeof item === 'string') {
        return item
    } else {
        return 0;
    }
}




export const Grid = ({ 
    children, 
    layout = null, 
    columns, 
    rows, 
    colSpan = 0, 
    rowSpan = 0, 
    full = false }) => {

    return (
        <div
            style={{
                gridTemplateColumns: _convertGrid(columns),
                gridTemplateRows: _convertGrid(rows),
                gridTemplateAreas: layout ? layout : '',
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : '',
                height: full ? 'fit-content' : ''
            }}
            className={styles.grid}>
            {children}
        </div>
    )
}


export const Header = ({ children, gridArea = 'H', colSpan, rowSpan }) => {
    return (
        <header
            style={{
                gridArea,
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : ''
            }}

        >
            {children}
        </header>
    )
}

export const MainContent = ({ children, gridArea = 'M', colSpan, rowSpan }) => {
    return (
        <div
            style={{
                gridArea,
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : ''
            }}
            className={styles['main-content']}
        >
            {children}
        </div>
    )
}

export const SideContent = ({ children, gridArea = 'S', colSpan, rowSpan }) => {
    return (
        <aside
            style={{
                gridArea,
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : ''
            }}
            className={styles['side-content']}
        >
            {children}
        </aside>
    )
}


export const GridPanel = ({ children, gridArea = 'P', colSpan = 1, rowSpan = 1 }) => {
    return (
        <div
            style={{
                gridArea,
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : ''
            }}
            className={styles['grid-panel']}
        >
            {children}
        </div>
    )
}


export const Footer = ({ children, gridArea = 'F', colSpan = 1, rowSpan = 1 }) => {
    return (
        <footer          style={{
                gridArea,
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : ''
            }}>
            {children}
        </footer>
    )
}