import useInputField from './useInputField';
import styles from './inputs.module.scss'; // if you use CSS Modules

export default function CheckboxGroup({
    className = '',
    keyName,
    val = [], // initial selected values (array)
    label,
    options = [], // Array of { label, value }
}) {
    const { key, value, handleChange: baseChange } = useInputField({ keyName, val });

    const handleCheckboxChange = (e) => {
        const { value: optionValue, checked } = e.target;
        let newValue;

        if (checked) {
            newValue = [...value, optionValue];
        } else {
            newValue = value.filter((v) => v !== optionValue);
        }

        baseChange({ target: { value: newValue } });
    };

    return (
        <fieldset className="flex flex-col ">
            {label && <legend>{label}</legend>}
            {options.map((option, index) => (
                <label key={index}>
                    <input
                        type="checkbox"
                        id={`${key}-${index}`}
                        name={key}
                        value={option.value}
                        checked={value.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="cursor-pointer"
                    />
                    {option.label}
                </label>
            ))}
        </fieldset>
    );
}
