import { Grid, MainContent, SideContent, Header, Footer, GridPanel } from '@components/containers/Grid';
import { BackButton, Button } from '@components/buttons';
import { toTitleCase, formatDate } from '@utils/format';

import styles from '../SuggestionView.module.scss';
import useTabs from '@hooks/useTabs';
import StatusIcon from '@components/Table/StatusIcon';
import Page from '@pages/details/Page';
import { Triage } from '@utils/constants';
import { TriageOptionView } from './triage-view';




export default function FinalizedView({suggestion}) {

    const text = suggestion.section.markdown_heading + suggestion.section.markdown_body

    const main = useTabs({
        suggestionView: <SuggestionContent suggestion={suggestion} />,
        sectionView: <SectionView text={text} />,
    }, <SuggestionContent suggestion={suggestion} />)


    return (
        <Grid columns={5} rows={10} >

            <Header rowSpan={1} colSpan={3}>
                <BackButton />
                <div className={styles.header__buttons}>
                    <Button isActive={main.isActive('suggestionView')} variant='round' onClick={() => main.setView('suggestionView')} text='Suggestion' />
                    <Button isActive={main.isActive('sectionView')} variant='round' onClick={() => main.setView('sectionView')} text='Section' />
                </div>
            </Header>



            <MainContent rowSpan={8} colSpan={3}>
                {main.CurrentView}
            </MainContent>



            <SideContent rowSpan={8} colSpan={2}>
                {suggestion.documentation.map((item, index) => (
                    <div key={index*27}>
                        <h2>{toTitleCase(item.action || "")}</h2>
                        <p>{item.date}</p>
                    </div>
                ))}

            </SideContent>



        </Grid>
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
            <Page text={text} />
        </div>
    )
}
