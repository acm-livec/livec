import React, { useContext } from 'react';
import FormProvider, { FormContext } from './FormContext';
import ModalProvider from '../popups/ModalContext';
import { ModalContext } from '../popups/ModalContext';
import styles from './Form.module.scss';
import { Button } from '../buttons';

/**
 *
 * Builds default values from children with a `val` prop.
 *
 * @param {React.ReactNode} children - React children elements to process.
 * @returns {Record<string, any>} An object mapping keys to default values.
 *
 **/
function buildDefaultValues(children) {
    return React.Children.toArray(children).reduce((acc, child) => {
        if (
            React.isValidElement(child) &&
            child.props &&
            typeof child.props === 'object'
        ) {
            /** @type {{ val?: any }} */
            const props = child.props;
            const val = props.val;

            if (val && typeof val === 'object') {
                const entries = Object.entries(val);
                if (entries.length === 1) {
                    const [key, value] = entries[0];
                    acc[key] = value;
                }
            }
        }

        return acc;
    }, {});
}

export function Form({ className = styles.form, children, resetOn = [] }) {
    const defaultValues = buildDefaultValues(children);

    if (!children || !children.length) return <p>No Children</p>;

    return (
        <FormProvider defaultValues={defaultValues} resetOn={resetOn}>
            <form className={className}>{children}</form>
        </FormProvider>
    );
}

export const SubmitButton = ({
    children = null,
    onSubmit = () => {},
    text = 'Submit',
}) => {
    const { formData } = useContext(FormContext);
    const hasModal = React.Children.count(children) > 0;

    if (hasModal) {
        return (
            <ModalProvider onSubmit={() => onSubmit(formData)}>
                <SubmitButtonWithModal text={text}>
                    {children}
                </SubmitButtonWithModal>
            </ModalProvider>
        );
    }

    return <Button onClick={() => onSubmit(formData)} text={text} />;
};

function SubmitButtonWithModal({ children, text }) {
    const { open } = useContext(ModalContext);

    return (
        <>
            <Button onClick={open} text={text} />
            {children}
        </>
    );
}
