import { formatDate } from '@utils/format';
import styles from './Card.module.scss';
import icon from '/profile.svg';
import { FlexRow, FlexColumn } from '@components/layouts/flex';

export default function Card({ doc, setDocText }) {
    const { author, date, content } = doc;

    return (
        <FlexRow
            onClick={() => setDocText(content)}
            className={styles.card}
            align="center"
        >
            <img src={icon} width={50} height={50} />
            <FlexColumn>
                <p>{author}</p>
                <p>Added on {formatDate(date)}</p>
            </FlexColumn>
        </FlexRow>
    );
}
