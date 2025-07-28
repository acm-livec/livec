import useInputField from './useInputField';

export default function TextArea({
    className = '',
    keyName,
    val = '',
    label,
    ...rest
}) {
    const { key, value, handleChange } = useInputField({ keyName, val });

    return (
        <>
            {label && <label htmlFor={key}>{label}</label>}
            <textarea
                id={key}
                className={className}
                name={key}
                value={value}
                onChange={handleChange}
                {...rest}
            />
        </>
    );
}
