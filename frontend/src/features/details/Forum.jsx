import styles from './Page.module.scss';
import { FlexColumn } from '@components/layouts/flex';

import { formatDate } from '@utils/format';
export const PublicForum = ({ fb = [] }) => {
    return (
        <FlexColumn className={styles['public-forum']} gap={'1rem'}>
            {fb.map((item) => (
                <ForumItem key={item.id} {...item} />
            ))}
        </FlexColumn>
    );
};

const ForumItem = ({ title, timeCreated, text }) => (
    <div className={styles['forum-item']}>
        <h3>{title}</h3>
        <small>{formatDate(timeCreated)}</small>
        <p className={styles['body-text']}>{text}</p>
    </div>
);
