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
import { Switch } from '@components/ui/switch';
import { Label } from '@components/ui/label';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

export default function CurriculumDetailsPage({ selectedCurriculum = sessionStorage.getItem('curriculum') }) {
    const { currentPage, nextPage, tableOfContents, previousPage, setCurrentPage, loading } = useTableOfContents(selectedCurriculum);

    const [showPdf, setShowPdf] = useState(false);
    const [tab, setTab] = useState('content');
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { jumpToPage } = pageNavigationPluginInstance;

    const jumpToPdf = (page) => {
        console.log('jumping to:', page);
        jumpToPage(page);
    };

    useEffect(() => {
        setTab('content');
    }, [currentPage]);

    if (loading) return <CurriculumDetailsSkeleton />;

    if (tableOfContents.length <= 0 || !currentPage) return <CurriculumDetailsSkeleton message="This curriculum is currently not implemented..." />;

    return (
        <div className="details-page">
            <SideBar>
                <div className="breadcrumbs">
                    <Breadcrumbs />
                </div>

                <div className="flex justify-between items-center">
                    <h1 className="curricula-heading">{toTitleCase(selectedCurriculum) || 'None'}</h1>
                    <div className="flex items-center gap-2.5">
                        <Switch id="toggle-view" onCheckedChange={() => setShowPdf((prev) => !prev)} />
                        <Label htmlFor="toggle-view">PDF View</Label>
                    </div>
                </div>
                <hr />

                <TableOfContents jumpToPage={setCurrentPage} tableOfContents={tableOfContents} showPdf={showPdf} jumpToPdf={jumpToPdf} />
            </SideBar>

            <PageContent>
                {showPdf ? (
                    <PdfView navPlugin={pageNavigationPluginInstance} selectedCurriculum={selectedCurriculum} />
                ) : (
                    <>
                        <div className="flex flex-col gap-3.5 px-[2.5%] pt-20 pb-0 sticky top-0 bg-inherit z-10">
                            <FlexRow gap="0.5rem" className="tab-buttons justify-between">
                                <h1 className="text-sky-600">| {currentPage?.meta.parent_heading || currentPage?.title}</h1>
                                <div className="flex">
                                    <Button size="fit-content" isActive={tab === 'content'} onClick={() => setTab('content')} text="Section" />
                                    <Button size="fit-content" isActive={tab === 'history'} onClick={() => setTab('history')} text="Versions" />
                                </div>
                            </FlexRow>
                            <hr style={{ color: 'black', width: '100%' }} />
                        </div>
                        <FlexColumn padding={'2.5%'} gap="1.5rem">
                            {tab === 'content' ? <Page page={currentPage} /> : <VersionHistory meta={currentPage?.meta} />}
                            <FlexRow justify="space-between" style={{ width: '100%' }}>
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
                                <section className="flex flex-col gap-5 pb-[50vh]">
                                    <h2>See what others have commented on this section</h2>
                                    <PublicForum fb={currentPage?.public_feedback} />
                                </section>
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
