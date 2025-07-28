import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { Disciplines } from '@docs/constants/disciplines';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PdfView({ navPlugin, selectedCurriculum }) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const pdf = {
        [Disciplines.COMPUTER_SCIENCE]: '/CS2023.pdf',
        [Disciplines.CYBERSECURITY]: '/csec2017.pdf',
    };

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdf[selectedCurriculum]} plugins={[defaultLayoutPluginInstance, navPlugin]} />
        </Worker>
    );
}
