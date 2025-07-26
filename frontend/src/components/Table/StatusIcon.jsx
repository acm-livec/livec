import styles from './StatusIcon.module.scss';
import { statusMap } from '@utils/constants';
import { toTitleCase } from '@utils/format';

export default function StatusIcon({ status, ...props }) {
    const statusStyle = statusMap[status];

    if (!statusStyle) {
        return <div className={styles.unknown}>Unknown</div>;
    }

    return (
        <div
            {...props}
            className={`${styles['status-badge']} ${styles[statusStyle]}`}
        >
            {toTitleCase(status)}
        </div>
    );
}
