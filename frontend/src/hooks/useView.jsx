import { useState } from 'react';

export default function useView(defaultView = 'default') {
    const [currentView, setCurrentView] = useState(defaultView);

    const setView = (variant) => {
        setCurrentView(variant);
    };

    const isActive = (variant) => {
        return variant === currentView;
    };

    return { setView, currentView, isActive };
}
