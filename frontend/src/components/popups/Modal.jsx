import styles from './Overlays.module.css';
import { createPortal } from 'react-dom';
import { ModalContext } from './ModalContext';
import React, { useContext } from 'react';

export default function Modal({ children }) {
    const { showing, view } = useContext(ModalContext);

    if (!showing) return null;

    const [defaultView, confirmationView] = React.Children.toArray(children);

    return createPortal(
        <div className={styles['overlay-backdrop']}>
            {view === 'default' && defaultView}
            {view === 'confirmation' && confirmationView}
        </div>,
        document.body
    );
}

export const DefaultView = ({ message = 'message', children }) => {
    const { close, onSubmit } = useContext(ModalContext);

    return (
        <div className={styles['overlay-content']}>
            <p className={styles.text}>{message}</p>
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
                    onClick={onSubmit}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export const ConfirmationView = ({ message, children }) => {
    const { close } = useContext(ModalContext);

    return (
        <div className={styles['overlay-content']}>
            <p className={styles.text}>{message}</p>
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
