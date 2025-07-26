import { BackButton } from '@components/buttons';
import { toTitleCase, formatDate } from '@utils/format';
import {
    Grid,
    Header,
    SideContent,
    MainContent,
} from '@components/layouts/grid/Grid';

import Suggestion from '@features/suggestion/Suggestion';
import { Message } from '@features/community-member/Message';

/**
 * View that contains suggestion info, documentation, and section info.
 *
 *
 *
 * @param {{suggestion: Suggestion, user: User}} props
 * @returns
 */
export default function DefaultView({ suggestion, user }) {
    const { publicUpdates, history } = suggestion;

    return (
        <Grid layout="'H H' 'M S'" columns="1.5fr 1fr" rows="1fr 10fr">
            <Header>
                <BackButton />
            </Header>

            <MainContent>
                <Suggestion suggestion={suggestion} />
            </MainContent>

            <SideContent>
                {user.isCommunityMember ? (
                    <PublicView updates={publicUpdates} />
                ) : (
                    <InteralView history={history} />
                )}
            </SideContent>
        </Grid>
    );
}

const PublicView = ({ updates }) => {
    return (
        <>
            <h2>Updates</h2>
            <div>
                {updates.map((item) => (
                    <Message
                        key={item.refId}
                        status={item.status}
                        author={item.author}
                        content={item.message}
                        date={item.date}
                    />
                ))}
            </div>
        </>
    );
};

const InteralView = ({ history }) => {
    return (
        <>
            <h2>Updates</h2>
            <div>
                {history.map((item) => (
                    <div key={item.performed_by + item.action}>
                        <p>{toTitleCase(item.action)}</p>
                        <p>{formatDate(item.date)}</p>
                    </div>
                ))}
            </div>
        </>
    );
};
