import { FlexRow, FlexColumn } from '@components/layouts/flex';
import { Button } from '@components/buttons';
import styles from './ReviewerCard.module.scss';
import icon from '/profile.svg';
import clsx from 'clsx';
import { useNavigate } from 'react-router';
export default function ReviewerCard({ reviewer, status = '', disabled = false, onInvite }) {
    const navigate = useNavigate();
    const handleClick = () => {
        if (!disabled && onInvite) {
            onInvite();
            navigate(0);
        }
    };

    return (
        <FlexRow className={clsx(styles.card, disabled && styles.disabled)} align="center" justify="space-between">
            <FlexRow gap="1rem">
                <img src={icon} width={40} height={40} />
                <FlexColumn className={styles.info}>
                    <p>{reviewer.name}</p>
                    {status && <span className={styles.status}>{status}</span>}
                </FlexColumn>
            </FlexRow>
            {!disabled && <Button variant="gray" size="fit" text="Invite" onClick={handleClick} />}
        </FlexRow>
    );
}
