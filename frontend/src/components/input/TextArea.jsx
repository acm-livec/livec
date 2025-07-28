import useInputField from './useInputField';

export default function TextArea({
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
            <textarea
                id={key}
                className={`${className} ${error ? 'warning' : ''}`}
                name={key}
                value={value}
                onChange={handleChange}
                {...rest}
            />
            {error && <p className="warning">{error}</p>}
        </>
    );
}
