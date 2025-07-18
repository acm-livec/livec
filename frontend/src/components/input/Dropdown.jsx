import useInputField from './useInputField';
import styles from './inputs.module.scss'; // if you use CSS Modules

export default function Dropdown({
    className = '',
    keyName,
    val = '',
    label,
    values = []               
}) {


    const { key, value, handleChange } = useInputField({ keyName, val });

    return (
        <>
            {label && <label htmlFor={key}>{label}</label>}
            <div className={styles.select}>
                <select
                    id={key}
                    value={value}
                    className={className}
                    onChange={handleChange}
                >
                    {values.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
