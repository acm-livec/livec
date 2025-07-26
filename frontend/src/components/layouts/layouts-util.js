export function getMergedLayoutProps(props) {
    const {
        align,
        justify,
        padding,
        gap,
        colSpan,
        rowSpan,
        style = {},
        ...rest
    } = { ...props };

    const mergedStyle = {
        alignItems: align,
        justifyContent: justify,
        padding,
        gap,
        gridColumn: colSpan ? `span ${colSpan}` : '',
        gridRow: rowSpan ? `span ${rowSpan}` : '',
        ...style,
    };

    return {
        style: mergedStyle,
        ...rest,
    };
}
