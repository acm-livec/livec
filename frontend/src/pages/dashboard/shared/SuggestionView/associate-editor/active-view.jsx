import { Grid, MainContent, SideContent, Header, Footer, GridPanel } from '@components/containers/Grid';
import { BackButton, Button } from '@components/buttons';
import { toTitleCase, formatDate } from '@utils/format';
import styles from '../SuggestionView.module.scss';
import useTabs from '@hooks/useTabs';
import StatusIcon from '@components/Table/StatusIcon';
import Page from '@pages/details/Page';



export default function ActiveView({ suggestion }) {


    const {setView, CurrentView, keys} = useTabs({
        sectionView: <SectionView text={suggestion.section} id={suggestion.id}/>,
        documentationView: <DocumentationView docs={suggestion.documentation} ref={suggestion.id}/>
    }, <SuggestionContent suggestion={suggestion} />)


    return (
        <Grid columns={5} rows={19} full>

            <Header rowSpan={1} colSpan={5}>
                <BackButton />
                <div className={styles.header__buttons}>
                    <Button isActive={keys['default']} variant='round' onClick={() => setView('default')} text='Suggestion' />
                    <Button isActive={keys['sectionView']} variant='round' onClick={() => setView('sectionView')} text='Section' />
                    <Button isActive={keys['documentationView']} variant='round' onClick={() => setView('documentationView')} text='Documentation' />
                </div>
            </Header>



            <MainContent rowSpan={9} colSpan={5}>
                {CurrentView}
            </MainContent>



            <GridPanel rowSpan={9} colSpan={5}>
                <hr/>
            </GridPanel>





        </Grid>
    )
}

import Modal, {DefaultView, ConfirmationView} from '@components/popups/Modal';


const FinalizeModal = () => {
    return (
        <Modal>
            <DefaultView message='Are you sure you want to finalize this suggestion?'>

            </DefaultView>
            <ConfirmationView message={"Success"}/>
        </Modal>
    )
}

import useAssociateEditor from '@hooks/useAssociateEditor';

const SuggestionContent = ({ suggestion }) => {

    const { id, title, status, timeCreated, discipline } = suggestion
    const {finalize} = useAssociateEditor()

    return (
        <Grid rows={1} columns={5} rowSpan={1} colSpan={5}>
            <GridPanel rowSpan={1} colSpan={3}>
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

                <div className={styles.text}>
                    <p>{suggestion.suggestion}</p>
                </div>

                <Button text='Finalize' modal={<FinalizeModal/>} onClick={() => finalize(id)}/>


            </GridPanel>


            <SideContent rowSpan={1} colSpan={2}>
                <h1>Content</h1>
            </SideContent>


        </Grid>
    )
}

import { SectionEditor, DocumentationEditor } from '@components/tiptap/editor';


const SectionView = ({ text, id }) => {
    return (
        <Grid columns={1} rows={2} rowSpan={9} colSpan={5}>
            <GridPanel rowSpan={1}>
                <SectionEditor sectionId={id} page={text}/>
            </GridPanel>
            <GridPanel rowSpan={1}>
                <Page page={text} />
            </GridPanel>
        </Grid>
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

