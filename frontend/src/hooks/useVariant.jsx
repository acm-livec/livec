import { useState } from 'react';

export default function useVariant(defaultVariant = 'default') {
    const [currentVariant, setCurrentVariant] = useState(defaultVariant);

    const setVariant = (variant) => {
        if (variant === currentVariant) {
            setCurrentVariant(defaultVariant);
        } else {
            setCurrentVariant(variant);
        }

    };

    const isActive = (variant) => {
        return variant === currentVariant;
    };

    return { setVariant, currentVariant, isActive };
}
