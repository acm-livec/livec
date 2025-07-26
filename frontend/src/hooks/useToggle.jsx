import React from 'react';
import { useState } from 'react';

export default function useToggle() {
    const [toggle, setToggle] = useState(false);

    const toggleView = () => {
        setToggle(!toggle);
    };

    return { toggle, toggleView };
}
