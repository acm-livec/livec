import './CurriculumDetailsPage.scss';

import { useState } from 'react';
import Page from '@features/details/Page.jsx';
import PdfView from '@features/details/PdfView.jsx';
import Breadcrumbs from '@components/BreadCrumbs';
import SuggestionBox from '@components/SuggestionBox';
import useTableOfContents from '@features/details/useTableOfContents';
import { Disciplines } from '@utils/constants';
import { FlexRow } from '@components/layouts/flex';
import { Button } from '@components/buttons';
import TableOfContents from '@features/details/TableOfContents';
import { PublicForum } from '@features/details/Forum';
export default function CurriculumDetailsPage({ selectedCurriculum = sessionStorage.getItem('curriculum') }) {
    const {
        currentPage, nextPage, tableOfContents,
        previousPage,
        setCurrentPage,
    } = useTableOfContents(Disciplines.COMPUTER_SCIENCE)

    const [showPdf, setShowPdf] = useState(false);


    if (tableOfContents.length <= 0 || !currentPage) return null


    return (
        <div className="details-page">


            <SideBar>
                <div className='breadcrumbs'>
                    <Breadcrumbs />
                </div>

                <h1 className="curricula-heading">
                    {selectedCurriculum || sessionStorage.getItem('curriculum')}
                    <hr />
                </h1>

                <TableOfContents jumpToPage={setCurrentPage} tableOfContents={tableOfContents} />
            </SideBar>


            <PageContent>
                {/*
                    <a href="/CS2023.pdf" download className="download-button">
                        Download the  {selectedCurriculum || sessionStorage.getItem('curriculum')} Curriculum
                    </a> */}

                {/* <FlexRow justify='end'>
                    <Button
                        variant='normal'
                        onClick={() => setShowPdf(prev => !prev)}
                        text={showPdf ? 'Show HTML View' : 'Show PDF View'}
                    />
                </FlexRow> */}

                {showPdf ? (
                    <PdfView />
                ) : (
                    <>
                        <Page page={currentPage} />
                        <FlexRow justify='space-between' style={{ width: '100%' }}>
                            <Button
                                style={{ marginRight: 'auto' }}
                                size='fit-content'
                                disableOn={currentPage?.isFirst || false}
                                onClick={previousPage}
                                text='<' />
                            <Button
                                style={{ marginLeft: 'auto' }}
                                size='fit-content'
                                disableOn={currentPage?.isLast || false}
                                onClick={nextPage}
                                text='>' />
                        </FlexRow>
                        <hr style={{ color: 'black', width: '100%' }} />
                        <SuggestionBox sectionId={currentPage?.id} />
                        <hr />

                        {currentPage?.public_feedback &&
                            <>
                                <h1>
                                    See what other have commented
                                </h1>
                                <PublicForum fb={currentPage?.public_feedback} />
                            </>
                        }
                    </>
                )}
            </PageContent>

        </div>
    );
}



const SideBar = ({ children }) => {
    return (
        <aside className="toc-sidebar">
            {children}
        </aside>
    )
}


const PageContent = ({ children }) => {
    return (
        <div className="flex col pdf-container">
            {children}
        </div>
    )
}




