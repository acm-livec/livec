import useToggle from '@hooks/useToggle';
import { formatDate, toTitleCase } from '@utils/format';
import StatusIcon from '@components/Table/StatusIcon';
import styles from './UpdateCard.module.scss';

/**
 * Display a public or internal update as a clickable card.
 * Expands to show details similar to Message.jsx with Card styling.
 *
 * @param {{ update: Object }} props
 */
export default function UpdateCard({ update }) {
    const { toggle, toggleView } = useToggle();
    const display = toggle ? 'block' : 'none';

    const { status, author, message, date, action, performed_by } = update;
    const header = status ? (
        <StatusIcon status={status} />
    ) : (
        <span>{toTitleCase(action)}</span>
    );

    const bodyText = message
        ? (
              <>
                  {author && <strong>{author}</strong>} {message}
              </>
          )
        : (
              <>
                  {performed_by && <strong>{performed_by}</strong>} {toTitleCase(action)}
              </>
          );

    return (
        <div className={styles.card} onClick={toggleView}>
            <div className={styles.header}>
                {header}
                <span className={styles.date}>{formatDate(date)}</span>
            </div>
            <div className={styles.body} style={{ display }}>
                {bodyText}
            </div>
        </div>
    );
}
