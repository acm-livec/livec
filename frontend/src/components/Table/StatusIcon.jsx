import styles from './StatusIcon.module.scss';
import {statusMap } from '@utils/constants';
import { toTitleCase } from '@utils/format';
import { useContext } from 'react';
import { UserContext } from '@context/UserProvider';



export default function StatusIcon({ status }) {
    const { user, loading } = useContext(UserContext);

    if (loading) return <p>loading...</p>

    const statusStyle = statusMap[status]

    if (!statusStyle) {
        return <div className={styles.unknown}>Unknown</div>;
    }

    return (
        <div className={`${styles['status-badge']} ${styles[statusStyle]}`}>
            {toTitleCase(status)}
        </div>
    );
}
