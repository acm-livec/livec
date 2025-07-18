import styles from './Layout.module.scss'
import { NavLink } from 'react-router-dom';
import { UserContext } from '@context/UserProvider';
import React, { useContext, useState } from 'react';
import { toTitleCase } from '@utils/format'
import * as Icons from '@components/Icons'
import useAuth from '@hooks/useAuth'




export const Layout = ({ children }) => {
    const [collapse, setCollapse] = useState(false);
    const [Sidebar, MainPanel] = React.Children.toArray(children);

    return (
        <div className={styles.dashboard}>
            <div
                style={{ width: collapse ? '5%' : '15%' }}
                className={styles.dashboard__sidebar}
            >
                {React.cloneElement(Sidebar, { collapse, setCollapse })}
            </div>
            <div className={styles.dashboard__main}>{MainPanel}</div>
        </div>
    );
}







export function Sidebar({ collapse, setCollapse, children }) {
    const { user } = useContext(UserContext);

    const { logout } = useAuth()

    return (
        <aside
            className={`${styles.sidebar} ${collapse ? styles['sidebar--collapsed'] : ''}`}
        >

            <nav>
                <Sidebar.Item style={{ marginBottom: '1rem' }} text={toTitleCase(user.role)} icon={<Icons.Burger />} collapse={collapse} action={() => setCollapse(!collapse)} />

                {React.Children.toArray(children).map(child =>
                    React.cloneElement(child, { collapse })
                )}
                <Sidebar.Item style={{ marginTop: 'auto' }} text='Logout' icon={<Icons.Logout />} collapse={collapse} action={logout} />
            </nav>

        </aside>
    );
}








Sidebar.Item = function SidebarItem({ text = '', icon, route, collapse, action, style }) {
    const { user } = useContext(UserContext);

    const baseClass = styles['sidebar-item'];
    const activeClass = styles['sidebar-item--active'];

    if (!route && !action) {
        
        console.warn("SideBar.Item requires either 'route' or 'action' prop.");
    }

    return route ? (
        <NavLink
            to={`/dashboard/${user.id}/${route}`}
            className={({ isActive }) => (isActive ? activeClass : baseClass)}
        >
            <span className={styles['sidebar-item__icon']}>{icon}</span>
            {!collapse && (
                <h3 className={styles['sidebar-item__text']}>{text}</h3>
            )}
        </NavLink>
    ) : (
        <div
            className={baseClass}
            onClick={action}
            style={style}
        >
            <span className={styles['sidebar-item__icon']}>{icon}</span>
            {!collapse && (
                <h3 className={styles['sidebar-item__text']}>{text}</h3>
            )}
        </div>
    );
};













export function MainPanel({ children }) {
    return (
        <>
            {children}
        </>
    );
};