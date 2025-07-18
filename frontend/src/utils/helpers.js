import React from "react";

/**
 * Builds default values from children with a `keyName` and optional `val` prop.
 *
 * @param {*} children - React children elements to process.
 * @returns {Record<string, any>} An object mapping keys to default values.
 */
export const buildDefaultValues = (children) => {
    return React.Children.toArray(children).reduce((acc, child) => {
        if (React.isValidElement(child) && child.props) {
            const { keyName, val } = child.props;

            if (typeof keyName === 'string') {
                acc[keyName] = val !== undefined ? val : ''; // fallback if val is undefined
            }
        }
        return acc;
    }, {});
}