
import { useContext, useState, useEffect } from 'react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import remarkMath from 'remark-math';

const pdfjsVersion = '5.3.93';
export default function PdfView() {

    const pageNavigationPluginInstance = pageNavigationPlugin();

    const [open, setOpen] = useState(false)


    const { jumpToPage } = pageNavigationPluginInstance;

    const zoomPluginInstance = zoomPlugin({
        defaultScale: 0.85,
    });

    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
    const { zoomTo } = zoomPluginInstance;


    const onDocumentLoad = () => {
        zoomTo(0.85)
    }





    return (

        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`} >
            <ZoomInButton />
            <Viewer
                fileUrl="/CS2023.pdf"
                plugins={[pageNavigationPluginInstance, zoomPluginInstance]}
                onDocumentLoad={onDocumentLoad}
            />
            <ZoomInButton />

        </Worker>
    )
}
