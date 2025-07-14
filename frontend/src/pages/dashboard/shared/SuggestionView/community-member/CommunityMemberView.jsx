
import styles from '../SuggestionView.module.scss';
import s from './CommunityMemberView.module.scss';
import { BackButton } from '@components/buttons';
import StatusIcon from '@components/Table/StatusIcon';
import { Status } from '@utils/constants';
import { toTitleCase, formatDate } from '@utils/format';
import { Grid, Header, SideContent, MainContent } from '@components/containers/Grid';

import { marked } from 'marked';
import useToggle from '@hooks/useToggle';




export default function CommunityMemberView({ suggestion, user }) {

    const status = suggestion.status
    const updates = suggestion.publicUpdates

    const progress = {
        [Status.Public.SUBMITTED]: 13,
        [Status.Public.ASSIGNED]: 33,
        [Status.Public.REJECTED]: 66,
        [Status.Public.UNDER_REVIEW]: 66,
    }

    return (
        <Grid layout="'H H' 'M S'" columns='1.5fr 1fr' rows='1fr 10fr'>

            <Header>
                <BackButton />
            </Header>


            <MainContent>
                <div className={styles['main-content__header']}>
                    <div>
                        <h1 className={styles.header__title}> {suggestion.title || "Untitled"} </h1>
                        <p className={styles.header__date}>Submitted on {formatDate(suggestion.timeCreated)}</p>
                        <hr className={styles.header__divider} />
                    </div>


                    <div className={styles.header__meta}>
                        <h3 className={styles['meta-item']}><strong>Reference ID:</strong> {suggestion.id}</h3>
                        <h3 className={styles['meta-item']}><strong>Discipline: </strong>{toTitleCase(suggestion.discipline)}</h3>
                        <h3 className={styles['meta-item']}><strong>Current Status: </strong>{<StatusIcon status={status} />}</h3>
                        <h3 className={styles['meta-item']}><strong>Associated Section: </strong>{suggestion.section.title}</h3>
                    </div>
                </div>


                <div className={styles.text}>
                    <p>{suggestion.suggestion}</p>
                </div>
            </MainContent>


            <SideContent>
                <h2>Updates</h2>
                <div className={s.messages}>
                    {updates.map(item => (
                        <Message key={item.refId} status={item.status} author={item.author} content={item.message} date={item.date} />
                    ))}
                </div>
            </SideContent>

        </Grid>
    )
}


export const Message = ({ status, author, content, date }) => {
    const { toggle, toggleView } = useToggle();
    const cleanHtml = marked.parse(content);

    const display = toggle ? 'flex' : 'none'
    return (
        <div className={s.message} onClick={toggleView}>
            <div className={s.header}>
                <StatusIcon status={status} /><h3>| {formatDate(date)}</h3>
            </div>
            <div className={s.contents} style={{ display }}>
                {author}:  <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
            </div>
        </div>
    )
}




function ProgressBar({ progress }) {
    return (
        <div className='progress-container'>
            <div className='progress-actual' style={{ '--progress-num': `"${progress}%"`, width: `${progress}%` }} />
            <div className="progress-labels">
                <span className="progress-label">Submitted</span>
                <span className="progress-label">Assigned</span>
                <span className="progress-label">Under Review</span>
                <span className="progress-label">Under Consideration</span>
            </div>

        </div>
    );
}


