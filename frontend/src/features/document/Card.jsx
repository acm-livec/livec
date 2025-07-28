import { formatDate } from '@utils/format';
import styles from './Card.module.scss';
import icon from '/profile.svg';
import { FlexRow, FlexColumn } from '@components/layouts/flex';

export default function Card({ doc, setDocText }) {
    const { authorName, authorRole, date, content } = doc;
    const displayName = authorName || doc.author;

    return (
        <FlexRow
            onClick={() => setDocText(content)}
            className={styles.card}
            align="center"
        >
            <img src={icon} width={50} height={50} />
            <FlexColumn>
                <p>{displayName}</p>
                {authorRole && <p><i>{authorRole}</i></p>}
                <p>Added on {formatDate(date)}</p>
            </FlexColumn>
        </FlexRow>
    );
}
