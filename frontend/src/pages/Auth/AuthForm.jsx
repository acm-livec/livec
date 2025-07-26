import { useState, useEffect } from 'react';
import useForm from '@hooks/useForm';
import useAuth from '@hooks/useAuth';
import styles from './AuthPage.module.scss';

// Default form data for Register & Login
const defaultData = {
    name: '',
    email: '',
    password: '',
    passwordConfirmed: '',
};

export default function AuthForm() {
    const { login, register, message, setMessage } = useAuth();
    const { formData, onFormChange, resetForm } = useForm(defaultData);

    const [newUser, setNewUser] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [canSubmit, setCanSubmit] = useState(false);

    /**
     * Check if passwords match (only in Register mode)
     */
    useEffect(() => {
        if (newUser) {
            const { password, passwordConfirmed } = formData;
            const bothFilled = password && passwordConfirmed;
            setPasswordsMatch(!bothFilled || password === passwordConfirmed);
        }
    }, [formData.password, formData.passwordConfirmed, newUser]);

    /**
     * Check if form can be submitted
     */
    useEffect(() => {
        if (newUser) {
            const allFilled = Object.values(formData).every(
                (val) => val?.trim() !== ''
            );
            setCanSubmit(allFilled && passwordsMatch);
        } else {
            setCanSubmit(
                formData.email?.trim() !== '' &&
                    formData.password?.trim() !== ''
            );
        }
    }, [formData, newUser, passwordsMatch]);

    /**
     * Toggle between Login and Register
     */
    const handleToggleMode = () => {
        resetForm();
        setNewUser((prev) => !prev);
        setCanSubmit(false);
        setPasswordsMatch(true);
        setMessage('');
    };

    /**
     * Handle form submit
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        newUser ? register(formData) : login(formData);
    };

    return (
        <form className={styles['auth-form']} onSubmit={handleSubmit}>
            <h1>{newUser ? 'Get Started' : 'Welcome Back'}</h1>

            {newUser && (
                <FormField
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(value) => onFormChange('name', value)}
                />
            )}

            <FormField
                label="Email"
                name="email"
                type="text"
                placeholder="name@email.com"
                value={formData.email}
                onChange={(value) => onFormChange('email', value)}
            />

            <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(value) => onFormChange('password', value)}
            />

            {newUser && (
                <div className={styles.field}>
                    <div className="flex justify-between">
                        <label htmlFor="password-confirmed">
                            Confirm Password
                        </label>
                        {!passwordsMatch && (
                            <p className="warning">Passwords must match</p>
                        )}
                    </div>
                    <input
                        name="password-confirmed"
                        type="password"
                        placeholder="••••••••"
                        value={formData.passwordConfirmed}
                        onChange={(e) =>
                            onFormChange('passwordConfirmed', e.target.value)
                        }
                    />
                </div>
            )}

            <p>
                {newUser ? (
                    <>
                        Already have an account?{' '}
                        <span onClick={handleToggleMode}>Sign In</span>
                    </>
                ) : (
                    <>
                        Don't have an account?{' '}
                        <span onClick={handleToggleMode}>Sign Up</span>
                    </>
                )}
            </p>

            <button
                type="submit"
                disabled={!canSubmit}
                className={`monts ${!canSubmit ? 'disabled' : ''}`}
            >
                {newUser ? 'Sign Up' : 'Sign In'}
            </button>

            {message && <p>{message}</p>}
        </form>
    );
}

/**
 * Small reusable FormField component
 */
function FormField({ label, name, type, placeholder, value, onChange }) {
    return (
        <div className={styles.field}>
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
