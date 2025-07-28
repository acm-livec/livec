import useToggle from '@hooks/useToggle';
import { formatDate } from '@utils/format';
import StatusIcon from '@components/Table/StatusIcon';
import styles from './Message.module.scss';

export const Message = ({ status, author, content, date }) => {
    const { toggle, toggleView } = useToggle();

    const display = toggle ? 'block' : 'none';

    const extractText = (node) => {
        if (!node) return '';
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(extractText).join(' ');
        if (node.text) return node.text;
        if (Array.isArray(node.children)) {
            return node.children.map(extractText).join(' ');
        }
        return '';
    };

    const messageText = extractText(content);

    return (
        <div className={styles.message} onClick={toggleView}>
            <div className={styles.mssg_header}>
                <StatusIcon status={status} />
                <span>{formatDate(date)}</span>
            </div>
            <div className={styles.contents} style={{ display }}>
                <strong>{author}</strong>: {messageText}
            </div>
        </div>
    );
};
