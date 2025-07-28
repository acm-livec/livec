import useInputField from './useInputField';
import styles from './inputs.module.scss'; // same CSS module
import React from 'react';

export default function RadioAsCheckbox({ className = '', keyName, val = '', label, options = [] }) {
    const { key, value, handleChange } = useInputField({ keyName, val });

    return (
        <div className={`${styles.radioGroup} ${className}`}>
            {label && <label className={styles.groupLabel}>{label}</label>}

            {options.map((item, index) => (
                <label key={index} className={styles.customRadio}>
                    <input type="radio" name={key} value={item.value} checked={value === item.value} onChange={handleChange} />
                    <span className={styles.checkmark}></span>
                    <span className={styles.labelText}>{item.label}</span>
                </label>
            ))}
        </div>
    );
}
