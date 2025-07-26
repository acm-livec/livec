import React from 'react';
import styles from './Grid.module.scss';

const _convertGrid = (item) => {
    if (typeof item === 'number') {
        return `repeat(${item}, 1fr)`;
    } else if (typeof item === 'string') {
        return item;
    } else {
        return 0;
    }
};

export const Grid = ({
    children,
    layout = null,
    columns,
    rows,
    colSpan = 0,
    rowSpan = 0,
    full = false,
    gap = 0,
    className = '',
    style = {},
    ...rest
}) => {
    return (
        <div
            style={{
                gridTemplateColumns: _convertGrid(columns),
                gridTemplateRows: _convertGrid(rows),
                gridTemplateAreas: layout ? layout : '',
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : '',
                height: full ? 'fit-content' : '',
                gap,
                ...style,
            }}
            className={`${styles.grid} ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export const Header = ({
    children,
    gridArea = 'H',
    colSpan,
    rowSpan,
    className = '',
    style = {},
    ...rest
}) => {
    return (
        <header
            style={{
                gridArea,
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : '',
                ...style,
            }}
            className={className}
            {...rest}
        >
            {children}
        </header>
    );
};

export const MainContent = ({
    children,
    gridArea = 'M',
    colSpan,
    rowSpan,
    className = '',
    style = {},
    ...rest
}) => {
    return (
        <div
            style={{
                gridArea,
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : '',
                ...style,
            }}
            className={`${styles['main-content']} ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export const SideContent = ({
    children,
    gridArea = 'S',
    colSpan,
    rowSpan,
    className = '',
    style = {},
    ...rest
}) => {
    return (
        <aside
            style={{
                gridArea,
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : '',
                ...style,
            }}
            className={`${styles['side-content']} ${className}`}
            {...rest}
        >
            {children}
        </aside>
    );
};

export const GridPanel = ({
    children,
    gridArea = 'P',
    colSpan = 1,
    rowSpan = 1,
    padding = 0,
    className = '',
    style = {},
    ...rest
}) => {
    return (
        <div
            style={{
                padding,
                gridArea,
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : '',
                ...style,
            }}
            className={`${styles['grid-panel']} ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export const SubGrid = ({
    children,
    layout = null,
    columns,
    rows,
    colSpan = 0,
    rowSpan = 0,
    full = false,
    className = '',
    style = {},
    ...rest
}) => {
    return (
        <div
            style={{
                gridTemplateColumns: _convertGrid(columns),
                gridTemplateRows: _convertGrid(rows),
                gridTemplateAreas: layout ? layout : '',
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : '',
                height: full ? 'fit-content' : '',
                ...style,
            }}
            className={`${styles.subgrid} ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export const Footer = ({
    children,
    gridArea = 'F',
    colSpan = 1,
    rowSpan = 1,
    className = '',
    style = {},
    ...rest
}) => {
    return (
        <footer
            style={{
                gridArea,
                gridColumn: colSpan ? `span ${colSpan}` : '',
                gridRow: rowSpan ? `span ${rowSpan}` : '',
                ...style,
            }}
            className={className}
            {...rest}
        >
            {children}
        </footer>
    );
};
