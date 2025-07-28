// ─── External ────────────────────────────────────────────────────────────
import { useState } from 'react';

// ─── Layout Components ───────────────────────────────────────────────────
import { Grid, Header, MainContent, SubGrid, SideContent, GridPanel } from '@components/layouts/grid/Grid';
import { FlexColumn, FlexRow, Container } from '@components/layouts/flex';

// ─── UI Components ───────────────────────────────────────────────────────
import { BackButton, Button } from '@components/buttons';
import Modal, { DefaultView, ConfirmationView } from '@components/popups/Modal';
// import { SectionEditor, DocumentationEditor } from '@components/tiptap/editor';
import Card from '@features/document/Card';
import Documentation from '@features/document/Documentation';
import Page from '@features/details/Page';
import { Form, RadioAsCheckbox, TextArea } from '@components/input';
import ReviewerCard from '@features/associate-editor/ReviewerCard';
// ─── Feature Components ──────────────────────────────────────────────────
import Suggestion from '@features/suggestion/Suggestion';
import ActionButtons from '@features/editor-in-chief/ActionButtons';
import { ActionView } from '@features/editor-in-chief/ActionView';

// ─── Hooks ───────────────────────────────────────────────────────────────
import useTabs from '@hooks/useTabs';
import useToggle from '@hooks/useToggle';
import useView from '@hooks/useView';
import useAssociateEditor from '@features/associate-editor/useAssociateEditor';
import useVariant from '@hooks/useVariant';
import useEditorInChief from '@features/editor-in-chief/useEditorInChief';

// ─── Constants / Styles / Context ────────────────────────────────────────
import { Roles } from '@docs/constants/roles';
import styles from './SuggestionView.module.scss';

/**
 * View that contains suggestion info, documentation, and section info.
 *
 *
 *
 * @param {{suggestion: Suggestion, user: User}} props
 * @returns
 */
export default function FullView({ suggestion, user }) {
    const { setView, CurrentView, keys } = useTabs(
        {
            sectionView: (
                <SectionView suggestion={suggestion} text={suggestion.section} id={suggestion.id} role={user.role} rev={suggestion?.revisedSection} />
            ),
        },
        <SuggestionContent suggestion={suggestion} role={user.role} />
    );

    return (
        <Grid columns={5} rows={'0.1fr 1fr 1fr'} full>
            <Header rowSpan={1} colSpan={5}>
                <BackButton />
                <div className={styles.header__buttons}>
                    <Button isActive={keys['default']} variant="round" onClick={() => setView('default')} text="Suggestion" />
                    <Button isActive={keys['sectionView']} variant="round" onClick={() => setView('sectionView')} text="Section" />
                </div>
            </Header>

            <MainContent rowSpan={1} colSpan={5}>
                {CurrentView}
                <hr className="border-gray-200" />
            </MainContent>

            <SubGrid columns={'1fr 3fr'} rows={1} rowSpan={1} colSpan={5}>
                <DocumentationPanel suggestion={suggestion} documentation={suggestion.documentation} user={user} />
            </SubGrid>
        </Grid>
    );
}

const DocumentationPanel = ({ suggestion, documentation, user }) => {
    const [docText, setDocText] = useState();
    const { toggle, toggleView } = useToggle();
    const { document } = useAssociateEditor();
    const hideAe = suggestion.system.status === Status.System.AWAITING_EIC_INPUT && user.role === Roles.ASSOCIATE_EDITOR;
    const hideEic = user.role === Roles.EDITOR_IN_CHIEF && suggestion.system.status === Status.System.REFINEMENT_CYCLE;

    return (
        <>
            <FlexColumn className="border-r-gray-300" align="stretch" style={{ paddingRight: '2rem', paddingBottom: '0' }}>
                <h2 className="doc_heading">Documentation</h2>

                <div className="document-cards">
                    {documentation.map((item) => (
                        <Card key={item.refId} doc={item} setDocText={setDocText} />
                    ))}
                </div>

                <div style={{ marginTop: 'auto' }}>
                    <Button hideOn={hideAe || hideEic} onClick={toggleView} text="Add Documentation" variant="gray" />
                </div>
            </FlexColumn>

            <GridPanel style={{ padding: '2.5%', paddingBottom: '0' }}>
                {!toggle ? (
                    <div className="doc-text">
                        <Documentation html={docText} />
                    </div>
                ) : (
                    <PlateEditor
                        content={[]}
                        LOCAL_STORAGE_KEY={suggestion.id + user.id}
                        action={() => document(suggestion.id, suggestion.id + user.id)}
                    />
                )}
            </GridPanel>
        </>
    );
};

import useReviewer from '@features/reviewer/useReviewer';

const SuggestionContent = ({ suggestion, role }) => {
    const { id } = suggestion;
    const { finalize } = useAssociateEditor();
    const { recommend } = useReviewer();
    const { startDiscussion } = useEditorInChief();
    const { currentVariant, setVariant, isActive } = useVariant();

    const options = [
        { label: 'Include', value: 'include' },
        { label: 'Exclude', value: 'exclude' },
    ];

    const hideAe = suggestion.system.status === Status.System.AWAITING_EIC_INPUT;
    const hideEic =
        suggestion.system.status === Status.System.REFINEMENT_CYCLE || suggestion.system.status === Status.System.AWAITING_BOARD_DISCUSSION;
    return (
        <SubGrid rows={1} columns={5} rowSpan={1} colSpan={5}>
            <FlexColumn rowSpan={1} colSpan={3} gap="1rem">
                <Suggestion suggestion={suggestion} />
                {role === Roles.ASSOCIATE_EDITOR && (
                    <Button
                        disableOn={hideAe || suggestion.system.status === Status.System.TEMPORARILY_PAUSED}
                        className="mt-5"
                        text={hideAe ? 'Finalized' : 'Finalize'}
                        modal={<FinalizeModal />}
                        onClick={() => finalize(id)}
                    />
                )}
                {role === Roles.EDITOR_IN_CHIEF && !hideEic ? (
                    <ActionButtons setView={setVariant} isActive={isActive} />
                ) : (
                    <Button
                        hideOn={role === Roles.ASSOCIATE_EDITOR || role === Roles.REVIEWER}
                        style={{ marginTop: '1rem' }}
                        variant="confirm"
                        text="Start Discussion"
                        onClick={() => startDiscussion(suggestion.id)}
                        modal={<StartDiscussionModal />}
                    />
                )}
                {role === Roles.REVIEWER &&
                    suggestion.system.status === Status.System.TEMPORARILY_PAUSED &&
                    suggestion.status !== Status.Private.Reviewer.RECOMMENDATION_SUBMITTED && (
                        <Form
                            showConfirmation={{
                                defaultInfo: <RecModal />,
                                successInfo: <p>Recommendation submitted!</p>,
                            }}
                            onSubmit={(formData) => recommend(suggestion.id, formData)}
                        >
                            <RadioAsCheckbox className="flex flex-col justify-between" keyName="decision" options={options} />
                            <TextArea keyName="notes" label="Final Notes" />
                        </Form>
                    )}
            </FlexColumn>

            <SideContent rowSpan={1} colSpan={2}>
                {/* <h1>Latest Update</h1> */}
                {role === Roles.EDITOR_IN_CHIEF && !hideEic && <ActionView suggestion={suggestion} option={currentVariant} />}
                {role === Roles.ASSOCIATE_EDITOR && <Revs suggestion={suggestion} />}
            </SideContent>
        </SubGrid>
    );
};


const Revs = ({ suggestion }) => {
    const { reviewers, assign } = useAssociateEditor();

    if (suggestion.system.status === Status.System.AWAITING_EIC_INPUT) return null;

    const assignedMap = {};
    (suggestion.assignedReviewers || []).forEach((r) => {
        assignedMap[r.id] = r.recommendation;
    });

    const handleInvite = (id) => assign(suggestion.id, { reviewers: [id] });

    return (
        <>
            <h2>Assign Reviewers</h2>
            <div className="reviewer-cards">
                {reviewers.map((rev) => {
                    const rec = assignedMap[rev.id];
                    let status = '';
                    let decision = '';
                    let disabled = false;

                    if (rec) {
                        if (rec === 'pending') {
                            status = 'Reviewing';
                        } else {
                            status = 'Reviewed';
                            decision = rec;
                        }
                        disabled = true;
                    }

                    return (
                        <ReviewerCard
                            key={rev.id}
                            reviewer={rev}
                            status={status}
                            decision={decision}
                            disabled={disabled}
                            onInvite={() => handleInvite(rev.id)}
                        />
                    );
                })}
            </div>
        </>
    );
};

import PlateEditor from '@features/details/PlateEditor';
import DiffViewer from '@features/reviewer/DiffViewer';
import { Status } from '@docs/constants/status';

const SectionView = ({ suggestion, text, id, role, rev }) => {
    const { currentView, setView } = useView('current');
    const isAe = role === Roles.ASSOCIATE_EDITOR;
    return (
        <SubGrid columns={3} rows={10} style={{ padding: 0 }}>
            <FlexRow colSpan={2} rowSpan={1} gap="1rem">
                <Button text="Current" onClick={() => setView('current')} />
                <Button text={isAe ? 'Editor' : 'Revised Section'} onClick={() => setView('editor')} />
            </FlexRow>

            <Container colSpan={2} rowSpan={9}>
                {currentView === 'current' && <Page page={suggestion.section} />}
                {role === Roles.ASSOCIATE_EDITOR && currentView === 'editor' && (
                    <PlateEditor content={suggestion.section.content} LOCAL_STORAGE_KEY={suggestion.id} />
                )}
                {role === Roles.REVIEWER && currentView === 'editor' && (
                    <DiffViewer original={suggestion.section.content} revised={rev?.content || []} />
                )}
                {role === Roles.EDITOR_IN_CHIEF && currentView === 'editor' && <Page page={suggestion.revisedSection} />}
            </Container>

            <Container colSpan={1} rowSpan={9}></Container>
        </SubGrid>
    );
};

const FinalizeModal = () => {
    return (
        <Modal>
            <DefaultView message="Are you sure you want to finalize this suggestion?"></DefaultView>
            <ConfirmationView message={'Suggestion was successfully finalized!'} />
        </Modal>
    );
};
const RecModal = () => {
    return (
        <>Are you sure you want to submit this recommendation?</>
    );
};

const StartDiscussionModal = () => (
    <Modal>
        <DefaultView message="Start board discussion for this suggestion?" />
        <ConfirmationView message={'Discussion successfully started!'} />
    </Modal>
);
