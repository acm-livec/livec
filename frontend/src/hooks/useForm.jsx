import { useState, useEffect } from 'react';

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

export default function useForm(defaultData = {}, fields = {}) {
    const [formData, setFormData] = useState(defaultData);
    const [errors, setErrors] = useState({});
    const [canSubmit, setCanSubmit] = useState(false);

    const validateField = (field, value) => {
        const cfg = fields[field] || {};

        if (cfg.required && value.toString().trim() === '') {
            return 'Required';
        }

        if (
            typeof cfg.maxLength === 'number' &&
            value.toString().length > cfg.maxLength
        ) {
            return `Max ${cfg.maxLength} chars`;
        }

        if (typeof cfg.validate === 'function') {
            return cfg.validate(value) || '';
        }

        return '';
    };

    const runValidation = (data) => {
        const newErrors = {};
        for (const key of Object.keys(fields)) {
            const err = validateField(key, data[key] ?? '');
            if (err) newErrors[key] = err;
        }
        setErrors(newErrors);
        setCanSubmit(Object.keys(newErrors).length === 0);
    };

    const onFormChange = (field, value) => {
        setFormData((prev) => {
            const updated = { ...prev, [field]: value };
            runValidation(updated);
            return updated;
        });
    };

    const resetForm = () => {
        setFormData({ ...defaultData });
        setErrors({});
        setCanSubmit(false);
    };

    useEffect(() => {
        runValidation(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { formData, errors, canSubmit, onFormChange, resetForm };
}
