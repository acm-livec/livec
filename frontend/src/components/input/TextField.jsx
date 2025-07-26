import useInputField from './useInputField';

export default function TextField({
    className = '',
    keyName,
    val = '',
    label,
}) {
    const { key, value, handleChange } = useInputField({ keyName, val });

    return (
        <>
            {label && <label htmlFor={key}>{label}</label>}
            <input
                id={key}
                value={value}
                className={className}
                type="text"
                onChange={handleChange}
            />
        </>
    );
}
