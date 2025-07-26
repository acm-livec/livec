import useInputField from './useInputField';
import styles from './inputs.module.scss'; // if you use CSS Modules

export default function RadioGroup({
    className = '',
    keyName,
    val = '',
    label,
    options = [], // Array of { label, value }
}) {
    const { key, value, handleChange } = useInputField({ keyName, val });

    return (
        <fieldset className={`${styles.radioGroup} ${className}`}>
            {label && <legend>{label}</legend>}
            {options.map((option, index) => (
                <label key={index} className={styles.radioLabel}>
                    <input
                        type="radio"
                        id={`${key}-${index}`}
                        name={key}
                        value={option.value}
                        onChange={handleChange}
                        checked={value === option.value}
                        className={styles.radioInput}
                    />
                    {option.label}
                </label>
            ))}
        </fieldset>
    );
}
