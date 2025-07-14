

import clsx from 'clsx';

import styles from './Flex.module.scss'

export const FlexColumn = ({
    children,
    className = '',
    align = 'flex-start',
    justify = 'flex-start',
    padding = '2.5%',
    gap = '1rem'     }) => {


    const css = clsx(styles.column, className);
        
    return (
        <div 
        style={{
            alignItems: align,
            justifyContent: justify,
            padding,
            gap
        }}
        className={css}>
            {children}
        </div>
    )
}



export const FlexRow = ({
    children,
    className = '',
    align = 'flex-start',
    justify = 'flex-start',
    padding = '2.5%',
    gap = '1rem'     }) => {


    const css = clsx(styles.row, className);
        
    return (
        <div 
        style={{
            alignItems: align,
            justifyContent: justify,
            padding,
            gap
        }}
        className={css}>
            {children}
        </div>
    )
}
