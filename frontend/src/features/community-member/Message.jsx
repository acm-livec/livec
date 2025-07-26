import useToggle from '@hooks/useToggle';
import { formatDate } from '@utils/format';
import StatusIcon from '@components/Table/StatusIcon';
import styles from './Message.module.scss';

export const Message = ({ status, author, content, date }) => {
    const { toggle, toggleView } = useToggle();

    const display = toggle ? 'block' : 'none';
    return (
        <div className={styles.message} onClick={toggleView}>
            <div className={styles.mssg_header}>
                <StatusIcon status={status} />
                <span>{formatDate(date)}</span>
            </div>
            <div className={styles.contents} style={{ display }}>
                <strong>{author}</strong>: {JSON.stringify(content)}
            </div>
        </div>
    );
};
