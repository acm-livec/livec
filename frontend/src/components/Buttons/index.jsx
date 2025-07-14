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
    normal: 'button--normal'
}


export const Button = ({
    modal = null,
    variant = 'normal',
    text = 'Submit',
    onClick = () => alert("Button Clicked"),
    icon = <></>,
    isActive = false,
    disableOn = false,
    hideOn = false }) => {

    const className = clsx(styles[variants[variant]], isActive && styles[`${variants[variant]}--active`]);


    return modal ? (
        <ModalProvider onSubmit={onClick}>
           <ButtonWithModal text={text}/>
           {modal}
        </ModalProvider>

    ) : (
        <button
            disabled={disableOn}
            hidden={hideOn}
            className={className}
            type='button'
            onClick={onClick}
        >
            {icon && <span>{icon}</span>}{text}
        </button>
    )
}


function ButtonWithModal({ children = null, text }) {
    const { open } = useContext(ModalContext);

    return (
        <>
            <Button onClick={open} text={text} />
            {children}
        </>
    );
}