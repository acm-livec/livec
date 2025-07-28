import useInputField from './useInputField';
import styles from './inputs.module.scss'; // if you use CSS Modules

export default function Dropdown({
    className = '',
    name,
    keyName,
    val = '',
    label,
    values = [],
    ...rest
}) {
    const { key, value, handleChange, error } = useInputField({ name, keyName, val });

    return (
        <>
            {label && <label htmlFor={key}>{label}</label>}
            <div className={styles.select}>
                <select
                    id={key}
                    value={value}
                    className={`${className} ${error ? 'warning' : ''}`}
                    onChange={handleChange}
                    {...rest}
                >
                    {values.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="warning">{error}</p>}
        </>
    );
}
