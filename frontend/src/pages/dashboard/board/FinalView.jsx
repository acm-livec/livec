import {
    Grid,
    Header,
    MainContent,
    SubGrid,
    SideContent,
    GridPanel,
} from '@components/layouts/grid/Grid';
import Suggestion from '@features/suggestion/Suggestion';
import useTabs from '@hooks/useTabs';
import { BackButton, Button } from '@components/buttons';
import styles from '../suggestion/SuggestionView.module.scss';
import { FlexColumn, FlexRow, Container } from '@components/layouts/flex';
import Page from '@features/details/Page';
import { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';

export default function FinalView({ suggestion, user }) {
    console.log('su', suggestion);

    const { setView, CurrentView, keys } = useTabs(
        {
            sectionView: (
                <SectionView
                    suggestion={suggestion}
                    text={suggestion.section}
                    id={suggestion.id}
                    user={user}
                    rev={suggestion?.revisedSection}
                />
            ),
        },
        <SuggestionContent suggestion={suggestion} user={user} />
    );

    return (
        <Grid columns={5} rows={'0.1fr 1fr 1fr'} full>
            <Header rowSpan={1} colSpan={5}>
                <BackButton />
                <div className={styles.header__buttons}>
                    <Button
                        isActive={keys['default']}
                        variant="round"
                        onClick={() => setView('default')}
                        text="Suggestion"
                    />
                    <Button
                        isActive={keys['sectionView']}
                        variant="round"
                        onClick={() => setView('sectionView')}
                        text="Section"
                    />
                </div>
            </Header>

            <MainContent rowSpan={1} colSpan={5}>
                {CurrentView}
                <hr className="border-gray-200" />
            </MainContent>

            <SubGrid columns={'1fr 3fr'} rows={1} rowSpan={1} colSpan={5}>
                <DocumentationPanel
                    suggestion={suggestion}
                    documentation={suggestion.documentation}
                    user={user}
                />
            </SubGrid>
        </Grid>
    );
}

import Card from '@features/document/Card';
const DocumentationPanel = ({ suggestion, documentation, user }) => {
    const [docText, setDocText] = useState();

    return (
        <>
            <FlexColumn
                className="border-r-gray-300"
                align="stretch"
                style={{ paddingRight: '2rem', paddingBottom: '0' }}
            >
                <h2 className="doc_heading">Documentation</h2>

                <div className="document-cards">
                    {documentation.map((item) => (
                        <Card
                            key={item.refId}
                            doc={item}
                            setDocText={setDocText}
                        />
                    ))}
                </div>
            </FlexColumn>

            <GridPanel style={{ padding: '2.5%', paddingBottom: '0' }}>
                <div className="doc-text">
                    <Documentation html={docText} />
                </div>
            </GridPanel>
        </>
    );
};

const SuggestionContent = ({ suggestion, user }) => {
    const handleVotes = (votes) => {
        console.log(votes);
        const counts = votes.reduce(
            (acc, vote) => {
                const key = vote.final_decision;
                if (acc[key] !== undefined) {
                    acc[key]++;
                }
                return acc;
            },
            { pending: 0, include: 0, exclude: 0 }
        );

        return counts;
        // setStatusCounts(counts);
    };
    const socket = io('http://localhost:3000');
    const [current, setCurrent] = useState(suggestion);
    const [votes, setVotes] = useState(handleVotes(suggestion?.finalDecisions));
    const options = [
        { label: 'Include', value: 'include' },
        { label: 'Exclude', value: 'exclude' },
    ];

    useEffect(() => {
        socket.on('update', (newVotes) => {
            setCurrent(newVotes);
            setVotes(handleVotes(newVotes?.finalDecisions));
        });

        return () => {
            socket.off('update');
        };
    }, []);

    const handleVote = (id, formData) => {
        socket.emit('vote', { id, userId: user.id, formData });
    };
    return (
        <SubGrid rows={1} columns={5} rowSpan={1} colSpan={5}>
            <GridPanel rowSpan={1} colSpan={3}>
                <Suggestion suggestion={suggestion} />
            </GridPanel>

            <SideContent rowSpan={1} colSpan={2}>
                <h3>Exclude: {votes.exclude}</h3>
                <h3>Include: {votes.include}</h3>
                <h3>Undecided: {votes.pending}</h3>
                {!current?.voted && (
                    <Form
                        //  showConfirmation={{
                        //      defaultInfo: <RecModal />,
                        //      successInfo: <></>,
                        //  }}
                        onSubmit={(formData) =>
                            handleVote(current.id, formData)
                        }
                    >
                        <RadioAsCheckbox keyName="decision" options={options} />
                        <TextArea keyName="notes" label="Notes" />
                    </Form>
                )}
                {current?.status?.for_member === Status.Public.ACCEPTED &&
                    user.isEditorInChief && (
                        <ImplementationForm suggestion={current} />
                    )}
            </SideContent>
        </SubGrid>
    );
};

import DiffViewer from '@features/reviewer/DiffViewer';
import { Status } from '@documentation/constants/status';
import useView from '@hooks/useView';
import { Form, RadioAsCheckbox, TextArea } from '@components/input';
import useReviewer from '@features/reviewer/useReviewer';
import Documentation from '@features/document/Documentation';
import { postImplementation } from '@utils/api-handlers/suggestions';
import { UserContext } from '@context/UserProvider';
const SectionView = ({ suggestion, rev }) => {
    const { currentView, setView } = useView('current');
    return (
        <SubGrid columns={3} rows={10} style={{ padding: 0 }}>
            <FlexRow colSpan={2} rowSpan={1} gap="1rem">
                <Button text="Current" onClick={() => setView('current')} />
                <Button
                    text={'Revised Section'}
                    onClick={() => setView('revised')}
                />
            </FlexRow>

            <Container colSpan={2} rowSpan={9}>
                {currentView === 'current' && (
                    <Page page={suggestion.section} />
                )}

                {currentView === 'revised' && (
                    <DiffViewer
                        original={suggestion.section.content}
                        revised={rev || []}
                    />
                )}
            </Container>

            <Container colSpan={1} rowSpan={9}></Container>
        </SubGrid>
    );
};

const ImplementationForm = ({ suggestion }) => {
    const { user } = useContext(UserContext);
    const [done, setDone] = useState(false);

    if (done) return <p>Update sent.</p>;

    return (
        <Form
            onSubmit={async (data) => {
                await postImplementation(
                    suggestion.id,
                    user.id,
                    data.forPrivate,
                    data.forPublic
                );
                setDone(true);
            }}
        >
            <TextArea keyName="forPrivate" label="Message to submitter" />
            <TextArea keyName="forPublic" label="Public update" />
        </Form>
    );
};
