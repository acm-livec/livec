import './CurriculumDetailsPage.scss';
// 

import { useContext, useState, useEffect } from 'react';
import Page from './Page.jsx';
import Breadcrumbs from '@components/BreadCrumbs';
import TableOfContents from './TableOfContents.jsx';
import SuggestionBox from '@components/SuggestionBox';
import { flattenSections } from '@utils/format';


const pdfjsVersion = "3.11.174";

export default function CurriculumDetailsPage({ selectedCurriculum }) {

    const [tableOfContents, setTableOfContents] = useState([])
    const [currentPage, setCurrentPage] = useState({})



    useEffect(() => {
        fetch('/cs_toc.json')
            .then((res) => res.json())
            .then(setTableOfContents)
            .catch(console.error)
    }, [])

    useEffect(() => {
        if (tableOfContents.length > 0) {
            setCurrentPage(tableOfContents[0])
        }
    }, [tableOfContents])

    if (tableOfContents.length === 0) return <p>Loading...</p>


    const nextPage = () => {
        const flat = flattenSections(tableOfContents)
        const currIndx = flat.findIndex(page => page.id === currentPage.id)
        setCurrentPage(flat[currIndx + 1])
    }





    return (
        <div className="details-page">


            <aside className="toc-sidebar">
                <div className='breadcrumbs'>
                    <Breadcrumbs />
                </div>

                <h1 className="curricula-heading">
                    {selectedCurriculum || sessionStorage.getItem('curriculum')}
                    <hr />
                </h1>


                <TableOfContents jumpToPage={setCurrentPage}tableOfContents={tableOfContents} />

            </aside>

            <div className="flex col pdf-container">

                <a href="/CS2023.pdf" download className="download-button">
                    Download the  {selectedCurriculum || sessionStorage.getItem('curriculum')} Curriculum
                </a>
                
                <Page page={currentPage} >
                    <button onClick={nextPage}>Next</button>
                    <hr style={{ color: 'black', width: '100%' }} />
                    <SuggestionBox sectionId={currentPage?.id} />
                </Page>
            </div>
        </div>
    );
}



const SideBar = ({ children }) => {
    return (
        <aside>
            {children}
        </aside>
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