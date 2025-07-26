import { createContext, useState } from 'react';
import { useNavigate } from 'react-router';

export default function useConfirmationBox(onSubmit) {
    const [showing, setShowing] = useState(false);
    const [view, setView] = useState('default');
    const navigate = useNavigate();

    const submit = async () => {
        const success = await onSubmit();

        if (success) {
            setView('success');
        } else {
            setView('failure');
        }
    };

    const open = () => setShowing(true);

    const close = () => {
        if (view === 'success') {
            navigate(0);
        }
        setShowing(false);
        setView('default');
    };

    return { showing, view, open, close, submit };
}
