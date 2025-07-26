// ModalContext.js
import { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
export const ModalContext = createContext(undefined);

export default function ModalProvider({ children, onSubmit }) {
    const [showing, setShowing] = useState(false);
    const [view, setView] = useState('default');
    const navigate = useNavigate();

    const submit = async () => {
        await onSubmit();
        setView('confirmation');
    };

    const open = () => setShowing(true);

    const close = () => {
        if (view === 'confirmation') {
            navigate(0);
        }
        setShowing(false);
    };

    const values = {
        showing,
        view,
        open,
        close,
        onSubmit: submit,
    };

    return (
        <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
    );
}
