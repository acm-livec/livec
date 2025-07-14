import { Grid, MainContent, SideContent, Header, Footer, GridPanel } from '@components/containers/Grid';
import { BackButton, Button } from '@components/buttons';
import {  Status, Actions } from '@utils/constants';
import { toTitleCase, formatDate } from '@utils/format';

import styles from '../SuggestionView.module.scss';
import useTabs from '@hooks/useTabs';
import StatusIcon from '@components/Table/StatusIcon';
import Page from '@pages/details/Page';
import useSuggestion from '@hooks/useSuggestion';
import useVariant from '@hooks/useVariant';
import Modal, { DefaultView, ConfirmationView } from '@components/popups/Modal';

export default function EditorInChiefView({ suggestion, user }) {

    const { currentVariant, setVariant, isActive } = useVariant()

    const text = suggestion?.revisedSection

 const {setView, CurrentView, keys} = useTabs({
        sectionView: <SectionView text={suggestion.section} id={suggestion.id}/>,
        documentationView: <DocumentationView docs={suggestion.documentation} ref={suggestion.id}/>
    }, <SuggestionContent suggestion={suggestion} />)


    return (
        <Grid columns={5} rows={10} full>

            <Header rowSpan={1} colSpan={5}>
                <BackButton />
                <div className={styles.header__buttons}>
                    <Button isActive={keys['default']} variant='round' onClick={() => setView('default')} text='Suggestion' />
                    <Button isActive={keys['sectionView']} variant='round' onClick={() => setView('sectionView')} text='Section' />
                    <Button isActive={keys['documentationView']} variant='round' onClick={() => setView('documentationView')} text='Documentation' />

                </div>
            </Header>



            <MainContent rowSpan={8} colSpan={3}>
                {CurrentView}
            </MainContent>



            <SideContent rowSpan={8} colSpan={2}>
                <DecisionView suggestion={suggestion} option={currentVariant}/>
                {/* {suggestion.documentation.map((item, index) => (
                    <div key={index*27}>
                        <h2>{toTitleCase(item.action)}</h2>
                        <p>{item.date}</p>
                    </div>
                ))} */}

            </SideContent>


            <Footer colSpan={3} rowSpan={1}>
                <TriageButtons setView={setVariant} isActive={isActive} />
            </Footer>


        </Grid>
    )
}

import { SectionEditor, DocumentationEditor } from '@components/tiptap/editor';
import { Form, SubmitButton } from '@components/form';
import { TextArea, Dropdown } from '@components/form/input';



const TriageButtons = ({ setView, isActive }) => {
    return (
        <>
            <Button 
            variant={'confirm'} 
            text={'Approve'} 
            onClick={() => setView(Actions.APPROVED_BY_EDITOR_IN_CHIEF)} 
            isActive={isActive(Actions.APPROVED_BY_EDITOR_IN_CHIEF)} 
            />
            <Button variant={'danger'} text={'Reject'} onClick={() => setView(Actions.REJECTED_BY_EDITOR_IN_CHIEF)} isActive={isActive(Actions.REJECTED_BY_EDITOR_IN_CHIEF)} />
            <Button variant={'info'} text={'Change Request'} onClick={() => setView(Actions.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF)} isActive={isActive(Actions.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF)} />
        </>
    )
}


const DecisionView = ({ suggestion = { id: '' }, option}) => {

    const {approveSuggestion, reject, sendChangeRequest} = useSuggestion()
    
    const action = {
        [Actions.APPROVED_BY_EDITOR_IN_CHIEF]: (formData) => approveSuggestion(suggestion.id, formData),
        [Actions.REJECTED_BY_EDITOR_IN_CHIEF]: (formData) => reject(suggestion.id, formData),
        [Actions.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF]: (formData) => sendChangeRequest(suggestion.id, formData) 
    }

    const labels = {
        [Actions.APPROVED_BY_EDITOR_IN_CHIEF]: 'Notes',
        [Actions.REJECTED_BY_EDITOR_IN_CHIEF]: 'Reason for Rejection',
        [Actions.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF]: 'Message to Reviewer'
    }

    const heading = {
        [Actions.APPROVED_BY_EDITOR_IN_CHIEF]: 'Approve This Suggestion',
        [Actions.REJECTED_BY_EDITOR_IN_CHIEF]: 'Reject This Suggestion',
        [Actions.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF]: 'Send Change Request to Associate Editor'
    }

        if (option === "default") return <></>


    return (
        <>
            <h2>{heading[option]}</h2>

            <Form resetOn={[option, suggestion]}>
                <TextArea field={{ forPrivate: '' }} label={labels[option]} />
                <TextArea field={{ forPublic: '' }} label='Message to submitter' />
                <SubmitButton onSubmit={action[option]} >
                    {option === Actions.APPROVED_BY_EDITOR_IN_CHIEF && <StartReviewModal />}
                    {option === Actions.REJECTED_BY_EDITOR_IN_CHIEF && <RejectReviewModal />}
                    {option === Actions.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF && <DeferReviewModal />}
                </SubmitButton>
            </Form>
        </>
    )
}



const StartReviewModal = () => {
    return (
        <>
            <Modal>
                <DefaultView message={"Are you sure you want to begin reviewing this suggestion?"}>
                    <p style={{ fontSize: '0.95rem' }}>Doing so will update the submitter’s public status from </p>
                    <div><StatusIcon status={Status.Public.ASSIGNED} /> → <StatusIcon status={Status.Public.UNDER_REVIEW} rand={true} /></div>
                </DefaultView>
                <ConfirmationView message="The review process has started. The submitter’s status has been updated." />

            </Modal>
        </>
    )
}

const RejectReviewModal = () => {
    return (
        <>
            <Modal>
                <DefaultView message={"Are you sure you want to reject this suggestion?"}>
                     <p style={{ fontSize: '0.95rem' }}>This will change the submitter’s status from</p>
                    <div><StatusIcon status={'assigned'} /> → <StatusIcon status={'rejected'} /></div>
                </DefaultView>
                <ConfirmationView message="The suggestion has been rejected and the submitter has been notified." />

            </Modal>
        </>
    )
}

const DeferReviewModal = () => {
    return (
        <>
            <Modal>
                <DefaultView message={"Are you sure you want to defer this suggestion to a reviewer?"}>
                    <p>This will change the submitter’s status from</p>
                    <div><StatusIcon status={'assigned'} /> → <StatusIcon status={Status.Public.PENDING_EXTERNAL_REVIEW} rand={true}/></div>
                </DefaultView>
                <ConfirmationView message="The suggestion has been deferred to a reviewer." />

            </Modal>
        </>
    )
}




const SuggestionContent = ({ suggestion }) => {

    const { id, title, status, timeCreated, discipline } = suggestion

    return (
        <>
            <div className={styles['main-content__header']}>
                <div>

                    <h1 className={styles.header__title}> {title || "Untitled"} </h1>
                    <div className='flex'>
                        <p className={styles.header__date}>Submitted on {formatDate(timeCreated)}</p>
                    </div>

                    <hr className={styles.header__divider} />
                </div>


                <div className={styles.header__meta}>
                    <h3 className={styles['meta-item']}><strong>Reference ID:</strong> {id}</h3>
                    <h3 className={styles['meta-item']}><strong>Discipline: </strong>{toTitleCase(discipline)}</h3>
                    <h3 className={styles['meta-item']}><strong>Current Status: </strong>{<StatusIcon status={status} />}</h3>
                    <h3 className={styles['meta-item']}><strong>Associated Section: </strong>{suggestion.section.title}</h3>
                </div>
            </div>


            {/* The text content containing the suggestion */}

            <div className={styles.text}>
                <p>{suggestion.suggestion}</p>
            </div>

        </>
    )
}


const SectionView = ({ text }) => {

    return (

        <div style={{ padding: '0rem' }}>
            <Page page={text} />
        </div>
    )
}



import { Message } from '../community-member/CommunityMemberView';
import useToggle from '@hooks/useToggle';

const DocumentationView = ({ docs, ref }) => {
    const { toggle, toggleView } = useToggle()

    return (

        <Grid columns={2} rows={1} rowSpan={9} colSpan={5}>
            <GridPanel colSpan={1}>
                {docs.map(item => (
                    <Message key={item.refId} status={item.status || null} author={item.author} content={item.text} date={item.date} />
                ))}
                <Button variant='round' text='Add Note' onClick={toggleView} />

            </GridPanel>
            <GridPanel colSpan={1}>
                {toggle &&
                    <>
                        <DocumentationEditor  ref={ref}/>
                    </>
                }
            </GridPanel>
        </Grid>

    )
}

