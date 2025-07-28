import { BackButton } from '@components/buttons';
import { Grid, Header, SideContent, MainContent } from '@components/layouts/grid/Grid';
import { postImplementation } from '@utils/api-handlers/suggestions';

import Suggestion from '@features/suggestion/Suggestion';
import UpdateCard from '@features/suggestion/UpdateCard';
import { Form, TextArea } from '@components/input';
import { useContext, useState } from 'react';
import { UserContext } from '@context/UserProvider';

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
        <Grid layout="'H H' 'M S'" columns="1.5fr 1fr" rows="1fr 10fr" full>
            <Header>
                <BackButton />
            </Header>

            <MainContent>
                <Suggestion suggestion={suggestion} />
                {user.isEditorInChief() && <ImplementationForm suggestion={suggestion} />}
            </MainContent>

            <SideContent>{user.isCommunityMember ? <PublicView updates={publicUpdates} /> : <InteralView history={history} />}</SideContent>
        </Grid>
    );
}

const PublicView = ({ updates }) => {
    return (
        <>
            <h2>Updates</h2>
            <div>
                {updates.map((item) => (
                    <UpdateCard key={item.refId} update={item} />
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
                    <UpdateCard key={item.performed_by + item.action} update={item} />
                ))}
            </div>
        </>
    );
};

const ImplementationForm = ({ suggestion }) => {
    const { user } = useContext(UserContext);
    const [done, setDone] = useState(false);

    if (done) return <p>Update sent.</p>;

    return (
        <Form
            onSubmit={async (data) => {
                await postImplementation(suggestion.id, user.id, data.forPrivate, data.forPublic);
                setDone(true);
            }}
        >
            <TextArea keyName="forPrivate" label="Message to submitter" />
            <TextArea keyName="forPublic" label="Public update" />
        </Form>
    );
};
