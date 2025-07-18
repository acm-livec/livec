import { useContext } from 'react';
import { FormContext } from './Form';

export default function useInputField({ keyName, val = '' }) {
    const { formData, onFormChange } = useContext(FormContext);
    const value = formData[keyName] !== undefined ? formData[keyName] : val;

    const handleChange = (e) => onFormChange(keyName, e.target.value);

    return { key: keyName, value, handleChange };
}
