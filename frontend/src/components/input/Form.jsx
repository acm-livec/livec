import React, { useContext, createContext, useEffect } from 'react'

import styles from './inputs.module.scss'
import { Button } from '../buttons';
import useForm from '@hooks/useForm';
import clsx from 'clsx';
import { buildDefaultValues } from '@utils/helpers';
import useConfirmationBox from './useConfirmationBox';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';


export const FormContext = createContext({});

export const useFormContext = () => useContext(FormContext);

Form.propTypes = {
    showConfirmation: PropTypes.shape({
        defaultInfo: PropTypes.any,
        successInfo: PropTypes.any,
    }),
};

export default function Form({ children, defaultValues = {}, resetOn = [], className = '', onSubmit, showConfirmation }) {

    const builtDefaults = buildDefaultValues(children);
    const mergedDefaults = { ...builtDefaults, ...defaultValues };
    const { formData, onFormChange, resetForm } = useForm(mergedDefaults);

    const { showing, view, open, close, submit } = useConfirmationBox(() => onSubmit(formData))

    useEffect(() => {
        resetForm();
    }, resetOn);


    return (
        <FormContext.Provider value={{ formData, onFormChange, resetForm }}>
            <form className={clsx(styles.form, className)}>
                {children}

                {!showConfirmation ? (
                    <Button onClick={() => onSubmit(formData)} text='Submit' />
                ) : (
                    <>
                        <Button onClick={open} text='Submit' />
                        <ConfirmationBox showing={showing} view={view}>
                            <Default close={close} submit={submit}>
                                {showConfirmation.defaultInfo}
                            </Default>
                            <Success close={close}>
                                {showConfirmation.successInfo}
                            </Success>
                            <Failure close={close}/>
                        </ConfirmationBox>
                    </>
                )}
            </form>
        </FormContext.Provider>
    );
}


const ConfirmationBox = ({ children, showing, view }) => {

    if (!showing) return null;

    const [Default, Success, Failure] = React.Children.toArray(children);

    return createPortal(
        <div className={styles['overlay-backdrop']}>
            {view === 'default' && Default}
            {view === 'success' && Success}
            {view === 'failure' && Failure}
        </div>,
        document.body
    );
}


const Default = ({ children, close, submit }) => {
    return (
        <div className={styles['overlay-content']}>
            {children}
            <div className={styles['button-group']}>
                <button
                    className={`${styles.button} ${styles['button--cancel']}`}
                    onClick={close}
                >
                    Cancel
                </button>
                <button
                    className={`${styles.button} ${styles['button--confirm']}`}
                    onClick={submit}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};



const Success = ({ children, close }) => {
    return (
        <div className={styles['overlay-content']}>
            {children}
            <div className={styles['button-group']}>
                <button
                    className={`${styles.button} ${styles['button--cancel']}`}
                    onClick={close}
                >
                    Close
                </button>
            </div>
        </div>
    );
};



const Failure = ({ close }) => {
    return (
        <div className={styles['overlay-content']}>
            Error
            <div className={styles['button-group']}>
                <button
                    className={`${styles.button} ${styles['button--cancel']}`}
                    onClick={close}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
















