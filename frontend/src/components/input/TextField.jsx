import useInputField from './useInputField';

export default function TextField({
    className = '',
    name,
    keyName,
    val = '',
    label,
    ...rest
}) {
    const { key, value, handleChange, error } = useInputField({ name, keyName, val });

    return (
        <>
            {label && <label htmlFor={key}>{label}</label>}
            <input
                id={key}
                value={value}
                className={`${className} ${error ? 'warning' : ''}`}
                type="text"
                onChange={handleChange}
                {...rest}
            />
            {error && <p className="warning">{error}</p>}
        </>
    );
}
