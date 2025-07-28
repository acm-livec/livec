import { FlexRow, FlexColumn } from '@components/layouts/flex';
import { Button } from '@components/buttons';
import styles from './ReviewerCard.module.scss';
import icon from '/profile.svg';
import clsx from 'clsx';

export default function ReviewerCard({ reviewer, status = '', disabled = false, onInvite }) {
    const handleClick = () => {
        if (!disabled && onInvite) onInvite();
    };

    return (
        <FlexRow
            className={clsx(styles.card, disabled && styles.disabled)}
            align="center"
        >
            <img src={icon} width={40} height={40} />
            <FlexColumn className={styles.info}>
                <p>{reviewer.name}</p>
                {status && <span className={styles.status}>{status}</span>}
            </FlexColumn>
            {!disabled && (
                <Button
                    variant="gray"
                    size="fit"
                    text="Invite"
                    onClick={handleClick}
                />
            )}
        </FlexRow>
    );
}
