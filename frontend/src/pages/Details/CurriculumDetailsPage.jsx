import './CurriculumDetailsPage.scss';

import { useState, useEffect } from 'react';
import Page from '@features/details/Page.jsx';
import PdfView from '@features/details/PdfView.jsx';
import Breadcrumbs from '@components/BreadCrumbs';
import SuggestionBox from '@components/SuggestionBox';
import useTableOfContents from '@features/details/useTableOfContents';
import { FlexColumn, FlexRow } from '@components/layouts/flex';
import { Button } from '@components/buttons';
import TableOfContents from '@features/details/TableOfContents';
import { PublicForum } from '@features/details/Forum';
import { toTitleCase } from '@utils/format';
import CurriculumDetailsSkeleton from './CurriculumDetailsSkeleton.jsx';
import VersionHistory from '@features/details/VersionHistory.jsx';

export default function CurriculumDetailsPage({
    selectedCurriculum = sessionStorage.getItem('curriculum'),
}) {
    const {
        currentPage,
        nextPage,
        tableOfContents,
        previousPage,
        setCurrentPage,
        loading,
    } = useTableOfContents(selectedCurriculum);

    const [showPdf, setShowPdf] = useState(false);
    const [tab, setTab] = useState('content');

    useEffect(() => {
        setTab('content');
    }, [currentPage]);

    if (loading) return <CurriculumDetailsSkeleton />;

    if (tableOfContents.length <= 0 || !currentPage)
        return (
            <CurriculumDetailsSkeleton message="This curriculum is currently not implemented..." />
        );

    return (
        <div className="details-page">
            <SideBar>
                <div className="breadcrumbs">
                    <Breadcrumbs />
                </div>

                <h1 className="curricula-heading">
                    {toTitleCase(selectedCurriculum) || 'None'}
                    <hr />
                </h1>

                <TableOfContents
                    jumpToPage={setCurrentPage}
                    tableOfContents={tableOfContents}
                />
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
                        <div className="flex flex-col gap-3.5 px-[2.5%] pt-20 pb-0 sticky top-0 bg-inherit z-10">
                            <h1 className="text-sky-600">
                                |{' '}
                                {currentPage?.meta.parent_heading ||
                                    currentPage?.title}
                            </h1>
                            <FlexRow gap="0.5rem" className="tab-buttons">
                                <Button
                                    variant="round"
                                    isActive={tab === 'content'}
                                    onClick={() => setTab('content')}
                                    text="Section"
                                />
                                <Button
                                    variant="round"
                                    isActive={tab === 'history'}
                                    onClick={() => setTab('history')}
                                    text="Versions"
                                />
                            </FlexRow>
                            <hr style={{ color: 'black', width: '100%' }} />
                        </div>
                        <FlexColumn padding={'2.5%'} gap="1.5rem">
                            {tab === 'content' ? (
                                <Page page={currentPage} />
                            ) : (
                                <VersionHistory meta={currentPage?.meta} />
                            )}
                            <FlexRow
                                justify="space-between"
                                style={{ width: '100%' }}
                            >
                                <Button
                                    style={{ marginRight: 'auto' }}
                                    size="fit-content"
                                    disableOn={currentPage?.isFirst || false}
                                    onClick={previousPage}
                                    text="<"
                                />
                                <Button
                                    style={{ marginLeft: 'auto' }}
                                    size="fit-content"
                                    disableOn={currentPage?.isLast || false}
                                    onClick={nextPage}
                                    text=">"
                                />
                            </FlexRow>
                            <hr style={{ color: 'black', width: '100%' }} />
                            <SuggestionBox sectionId={currentPage?.id} />
                            <hr />

                            {currentPage?.public_feedback && (
                                <>
                                    <h2>
                                        See what others have commented on this
                                        section
                                    </h2>
                                    <PublicForum
                                        fb={currentPage?.public_feedback}
                                    />
                                </>
                            )}
                        </FlexColumn>
                    </>
                )}
            </PageContent>
        </div>
    );
}

const SideBar = ({ children }) => {
    return <aside className="toc-sidebar">{children}</aside>;
};

const PageContent = ({ children }) => {
    return (
        <FlexColumn gap="1rem" className="pdf-container gap-1">
            {children}
        </FlexColumn>
    );
};
