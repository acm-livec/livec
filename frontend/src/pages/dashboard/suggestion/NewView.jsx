import { Grid, MainContent, SideContent, Header, Footer, GridPanel } from '@components/layouts/grid/Grid';
import { BackButton, Button } from '@components/buttons';

import styles from './SuggestionView.module.scss';
import useVariant from '@hooks/useVariant';
import useTabs from '@hooks/useTabs';
import Page from '@pages/details/Page';
import { TriageOptionView } from '@features/associate-editor/triage-view';
import Suggestion from '@features/suggestion/Suggestion';
import ActionButtons from '@features/associate-editor/ActionButtons';





export default function NewView({ suggestion }) {
    const { currentVariant, setVariant, isActive } = useVariant()

    const {setView, CurrentView, keys} = useTabs({
        sectionView: <SectionView text={suggestion.section} />,
    }, <Suggestion suggestion={suggestion}   />)


    return (
        <Grid columns={5} rows={10} >

            <Header rowSpan={1} colSpan={3}>
                <BackButton />
                <div className={styles.header__buttons}>
                    <Button isActive={keys['default']} variant='round' onClick={() => setView('default')} text='Suggestion' />
                    <Button isActive={keys['sectionView']} variant='round' onClick={() => setView('sectionView')} text='Section' />
                </div>
            </Header>



            <MainContent rowSpan={8} colSpan={3}>
                {CurrentView}
            </MainContent>



            <SideContent rowSpan={10} colSpan={2}>
                <TriageOptionView suggestion={suggestion} option={currentVariant} />
            </SideContent>



            <Footer colSpan={3} rowSpan={1}>
                <ActionButtons setView={setVariant} isActive={isActive} />
            </Footer>

        </Grid>
    )
}





const SectionView = ({ text }) => {

    return (
        <div style={{ padding: '0rem' }}>
            <Page page={text} />
        </div>
    )
}
