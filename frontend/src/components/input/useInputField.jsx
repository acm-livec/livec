import { useContext } from 'react';
import { FormContext } from './Form';

export default function useInputField({ name, keyName, val = '' }) {
    const field = name || keyName;
    const { formData, onFormChange, errors } = useContext(FormContext);
    const value = formData[field] !== undefined ? formData[field] : val;

    const handleChange = (e) => onFormChange(field, e.target.value);

    return { key: field, value, handleChange, error: errors?.[field] };
}
