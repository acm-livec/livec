import { createContext, useEffect } from 'react';
import useForm from '@hooks/useForm';

export const FormContext = createContext('form');

/**
 *
 * @param {*} param0
 */
export default function FormProvider({
    children,
    defaultValues = {},
    resetOn,
}) {
    const { formData, onFormChange, resetForm } = useForm(defaultValues);

    useEffect(() => {
        resetForm();
    }, resetOn);

    return (
        <FormContext.Provider value={{ formData, onFormChange, resetForm }}>
            {children}
        </FormContext.Provider>
    );
}
