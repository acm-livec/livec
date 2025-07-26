import { useState } from 'react';

/**
 * @typedef {Object} FormHook
 * @property {Object.<string, any>} formData - The current form data.
 * @property {(field: string, value: any) => void} onFormChange - Update a specific field in the form.
 * @property {() => void} resetForm - Reset the form to default values.
 */

/**
 * Custom hook for managing form state.
 *
 * @param {Object.<string, any>} defaultData - Initial form data.
 * @returns {FormHook} Form data and utility functions.
 *
 * @example
 * const { formData, onFormChange, resetForm } = useForm({ name: '', email: '' });
 */

export default function useForm(defaultData = {}) {
    const [formData, setFormData] = useState(defaultData);

    const onFormChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData({ ...defaultData });
    };

    return { formData, onFormChange, resetForm };
}
