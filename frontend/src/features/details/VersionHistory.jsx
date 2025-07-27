import { useEffect, useState } from 'react';
import { FlexColumn } from '@components/layouts/flex';
import { getVersion } from '@utils/api-handlers/curriculums/get-version';

export default function VersionHistory({ meta }) {
    if (!meta) return null;
    const { year_version, section_version, previous_versions = [], curriculum } = meta;
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        if (previous_versions.length > 0 && curriculum) {
            Promise.all(previous_versions.map((id) => getVersion(curriculum, id)))
                .then((res) => setVersions(res.filter(Boolean)))
                .catch(() => setVersions([]));
        }
    }, [previous_versions, curriculum]);

    const renderContent = (content = []) =>
        content
            .map((block) =>
                Array.isArray(block.children)
                    ? block.children.map((ch) => ch.text || '').join('')
                    : ''
            )
            .join(' ');

    return (
        <FlexColumn gap="0.5rem">
            <h2>Version History</h2>
            <p>
                <strong>Current Version:</strong>{' '}
                {section_version || 'N/A'} {year_version ? `(${year_version})` : ''}
            </p>
            {versions.length > 0 ? (
                <ul>
                    {versions.map((ver) => (
                        <li key={ver.id}>
                            <p>
                                <strong>{ver.section_version}</strong>{' '}
                                {ver.meta.year_version ? `(${ver.meta.year_version})` : ''}
                            </p>
                            <p>{renderContent(ver.content)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No previous versions available.</p>
            )}
        </FlexColumn>
    );
}
