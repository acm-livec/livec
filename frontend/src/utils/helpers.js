import React from 'react';

/**
 * Builds default values from children with a `keyName` and optional `val` prop.
 *
 * @param {*} children - React children elements to process.
 * @returns {Record<string, any>} An object mapping keys to default values.
 */
export const buildDefaultValues = (children) => {
    return React.Children.toArray(children).reduce((acc, child) => {
        if (React.isValidElement(child) && child.props) {
            const { keyName, name, val } = child.props;
            const field = name || keyName;

            if (typeof field === 'string') {
                acc[field] = val !== undefined ? val : '';
            }
        }
        return acc;
    }, {});
};

/**
 * Builds validation rules from form children.
 *
 * @param {*} children - React children elements to process.
 * @returns {Record<string, any>} rules per field
 */
export const buildValidationRules = (children) => {
    return React.Children.toArray(children).reduce((acc, child) => {
        if (React.isValidElement(child) && child.props) {
            const { keyName, name, required, maxLength, validate } = child.props;
            const field = name || keyName;
            if (!field) return acc;

            const config = {};
            if (required) config.required = true;
            if (typeof maxLength === 'number') config.maxLength = maxLength;
            if (typeof validate === 'function') config.validate = validate;

            acc[field] = config;
        }
        return acc;
    }, {});
};
