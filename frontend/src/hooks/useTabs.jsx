import { useEffect, useState } from 'react';

/**
 *
 * @param {*} components
 * @returns {Object}
 */
const _generateKeys = (components) => {
    return Object.keys(components).reduce(
        (keys, item) => {
            keys[item] = false;
            return keys;
        },
        { default: true }
    );
};

export default function useTabs(components, DefaultView) {
    if (!DefaultView) throw Error('Must pass in a default view');

    const [CurrentView, setCurrentView] = useState(DefaultView);
    const [keys, setKeys] = useState(_generateKeys(components));

    const setView = (key) => {
        const view = components[key] || DefaultView;
        setCurrentView(view);

        setKeys((prev) => ({
            ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])),
            [key]: true,
        }));
    };

    return { setView, CurrentView, keys };
}
