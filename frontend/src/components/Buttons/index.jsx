import { useNavigate } from 'react-router';
import { useContext } from 'react';
import styles from './Buttons.module.scss'
import * as Icons from '@components/Icons'
import useAuth from '@hooks/useAuth'
import { UserContext } from '@context/UserProvider';
import ModalProvider, { ModalContext } from '@components/popups/ModalContext';


export function BackButton() {
    const { user } = useContext(UserContext)

    const navigate = useNavigate()
    return (
        <button className={styles['button--back']} onClick={() => navigate(`/dashboard/${user.id}`)}>
            <span>←</span> Back to suggestions
        </button>
    )
}


export function LogoutButton({ className = '' }) {
    const { logout } = useAuth()

    return (
        <button className={`${styles['button--logout']} ${className}`} onClick={logout}><Icons.Logout />Logout</button>
    )
}

import clsx from 'clsx';




const variants = {
    danger: 'button--danger',
    confirm: 'button--confirm',
    info: 'button--info',
    blue: 'button--blue',
    round: 'button--round',
    purple: 'button--purple',
    normal: 'button--normal',
    gray: 'button--gray',
    fit: 'button--fit'
}


export const Button = ({
    className = '',
    modal = null,
    variant = 'normal',
    size = '100%',
    text = 'Submit',
    onClick = () => alert("Button Clicked"),
    icon = <></>,
    style = {},
    isActive = false,
    disableOn = false,
    hideOn = false,
    ...props }) => {

    if (hideOn) return null

    const cssClassName = clsx(
        styles[variants[variant]], 
        isActive && styles[`${variants[variant]}--active`],
        disableOn && styles['button--disabled'], 
        className);


    return modal ? (
        <ModalProvider onSubmit={onClick}>
           <ButtonWithModal text={text} {...props}/>
           {modal}
        </ModalProvider>

    ) : (
        <button
            {...props}
            style={{
                width: size,
                ...style
            }}
            disabled={disableOn}
            className={cssClassName}
            type='button'
            onClick={onClick}
        >
            {icon && <span>{icon}</span>}{text}
        </button>
    )
}


function ButtonWithModal({ children = null, text, ...props }) {
    const { open } = useContext(ModalContext);

    return (
        <>
            <Button onClick={open} text={text} {...props}/>
            {children}
        </>
    );
}