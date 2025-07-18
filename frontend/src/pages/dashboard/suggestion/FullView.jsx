// ─── External ────────────────────────────────────────────────────────────
import { useState } from 'react';

// ─── Layout Components ───────────────────────────────────────────────────
import { Grid, Header, MainContent, SubGrid, SideContent, GridPanel } from '@components/layouts/grid/Grid';
import { FlexColumn, FlexRow, Container } from '@components/layouts/flex';

// ─── UI Components ───────────────────────────────────────────────────────
import { BackButton, Button } from '@components/buttons';
import Modal, { DefaultView, ConfirmationView } from '@components/popups/Modal';
import { SectionEditor, DocumentationEditor } from '@components/tiptap/editor';
import Card from '@features/document/Card';
import Documentation from '@features/document/Documentation';
import Page from '@pages/details/Page';

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

// ─── Constants / Styles / Context ────────────────────────────────────────
import { Roles } from '@documentation/constants/roles'; 
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

    const { setView, CurrentView, keys } = useTabs({
        sectionView: <SectionView
            text={suggestion.section}
            id={suggestion.id}
            role={user.role}
            rev={suggestion?.revisedSection}
        />,
    }, <SuggestionContent suggestion={suggestion} role={user.role} />)


    return (
        <Grid columns={5} rows={'0.1fr 1fr 1fr'} full>

            <Header rowSpan={1} colSpan={5}>
                <BackButton />
                <div className={styles.header__buttons}>
                    <Button isActive={keys['default']} variant='round' onClick={() => setView('default')} text='Suggestion' />
                    <Button isActive={keys['sectionView']} variant='round' onClick={() => setView('sectionView')} text='Section' />
                </div>
            </Header>


            <MainContent rowSpan={1} colSpan={5}>
                {CurrentView}
                <hr className='border-gray-200' />
            </MainContent>


            <SubGrid columns={'1fr 3fr'} rows={1} rowSpan={1} colSpan={5}>
                <DocumentationPanel documentation={suggestion.documentation}/>
            </SubGrid>

        </Grid>
    )
}


const DocumentationPanel = ({documentation}) => {
    const [docText, setDocText] = useState("")
    const { toggle, toggleView } = useToggle()
    return (
        <>
            <FlexColumn className='border-r-gray-300' align='stretch' style={{ paddingRight: '2rem', paddingBottom: '0' }}>
                <h2 className='doc_heading'>Documentation</h2>

                <div className='document-cards'>
                    {documentation.map(item => (
                        <Card key={item.refId} doc={item} setDocText={setDocText} />
                    ))}
                </div>

                <div style={{ marginTop: 'auto' }} >
                    <Button onClick={toggleView} text='Add Documentation' variant='gray' />
                </div>
            </FlexColumn>



            <GridPanel style={{ padding: '2.5%', paddingBottom: '0' }}>
                {!toggle ? <div className='doc-text'><Documentation html={docText} /></div> : <DocumentationEditor refId={suggestion.id} />}
            </GridPanel>
        </>
    )
}




const SuggestionContent = ({ suggestion, role }) => {

    const { id } = suggestion
    const { finalize } = useAssociateEditor()
    const { currentVariant, setVariant, isActive } = useVariant();

    return (
        <SubGrid rows={1} columns={5} rowSpan={1} colSpan={5}>

            <GridPanel rowSpan={1} colSpan={3}>
                <Suggestion suggestion={suggestion} />
                {role === Roles.ASSOCIATE_EDITOR && <Button style={{ marginTop: '1rem' }} text='Finalize' modal={<FinalizeModal />} onClick={() => finalize(id)} />}
                {role === Roles.EDITOR_IN_CHIEF && <ActionButtons setView={setVariant} isActive={isActive} />}

            </GridPanel>

            <SideContent rowSpan={1} colSpan={2}>
                {/* <h1>Latest Update</h1> */}
                {role === Roles.EDITOR_IN_CHIEF && <ActionView suggestion={suggestion} option={currentVariant} />}

            </SideContent>

        </SubGrid>
    )
}



const SectionView = ({ text, id, role, rev }) => {
    const { currentView, setView } = useView('current');
    return (
        <SubGrid columns={3} rows={10} style={{ padding: 0 }}>

            <FlexRow colSpan={2} rowSpan={1} gap='1rem'>
                <Button text='Current' onClick={() => setView('current')} />
                <Button text='Editor' onClick={() => setView('editor')} />
            </FlexRow>

            <Container colSpan={2} rowSpan={9}>
                {currentView === 'current' && <Page page={text} />}
                {role === Roles.ASSOCIATE_EDITOR && currentView === 'editor' && <SectionEditor sectionId={id} page={text} />}
                {role === Roles.EDITOR_IN_CHIEF && currentView === 'editor' && <Page page={rev} />}
            </Container>

            <Container colSpan={1} rowSpan={9}>

            </Container>

        </SubGrid>
    )
}







const FinalizeModal = () => {
    return (
        <Modal>
            <DefaultView message='Are you sure you want to finalize this suggestion?'>

            </DefaultView>
            <ConfirmationView message={"Success"} />
        </Modal>
    )
}