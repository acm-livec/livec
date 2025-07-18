import './CurriculumDetailsPage.scss';
// 

import { useContext, useState, useEffect } from 'react';
import Page from './Page.jsx';
import Breadcrumbs from '@components/BreadCrumbs';
import TableOfContents from './TableOfContents.jsx';
import SuggestionBox from '@components/SuggestionBox';
import useTableOfContents from '@hooks/useTableOfContents';
import { Disciplines } from '@utils/constants';
import { FlexRow } from '@components/layouts/flex';
import { Button } from '@components/buttons';


export default function CurriculumDetailsPage({ selectedCurriculum = sessionStorage.getItem('curriculum')}) {
    const {
        currentPage, nextPage, tableOfContents, 
        previousPage, 
        setCurrentPage
    } = useTableOfContents(Disciplines.COMPUTER_SCIENCE)


    if(tableOfContents.length <= 0 || !currentPage) return null


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

                <Page page={currentPage} >
                    <FlexRow justify='space-between'>
                        <Button style={{marginRight: 'auto'}} variant='fit' disableOn={currentPage?.isFirst || false} onClick={previousPage} text='<'/>
                        <Button style={{marginLeft: 'auto'}} variant='fit' disableOn={currentPage?.isLast || false} onClick={nextPage} text='>'/>
                    </FlexRow>
                    <hr style={{ color: 'black', width: '100%' }} />
                    <SuggestionBox sectionId={currentPage?.id} />
                </Page>

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







// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
// import '@react-pdf-viewer/zoom/lib/styles/index.css';
// import { UserContext } from '@context/UserProvider';
// import ReactMarkdown from 'react-markdown';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
// import { zoomPlugin } from '@react-pdf-viewer/zoom';
// import remarkMath from 'remark-math';

// const { zoomTo } = zoomPluginInstance;

// const pageNavigationPluginInstance = pageNavigationPlugin();

// const [open, setOpen] = useState(false)


// const { jumpToPage } = pageNavigationPluginInstance;

// const zoomPluginInstance = zoomPlugin({
//     defaultScale: 0.85,
// });

// const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;


// const onDocumentLoad = () => {
//     zoomTo(0.85)
// }



{/* <a href="/CS2023.pdf" download className="download-button">
                        Download the  {selectedCurriculum || sessionStorage.getItem('curriculum')} Curriculum
                    </a> */}
{/* {user && <button onClick={() => setOpen(!open)}>Suggest</button>} */ }
{/* <SuggestionBox open={open} /> */ }


{/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`} >
                  <ZoomInButton/>
                    <Viewer
                        fileUrl="/CS2023.pdf"
                        plugins={[pageNavigationPluginInstance, zoomPluginInstance]}
                    onDocumentLoad={onDocumentLoad}
                    />
                                        <ZoomInButton/>

                </Worker> */}