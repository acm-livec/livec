import { FlexColumn } from '@components/layouts/flex';

export default function VersionHistory({ meta }) {
    if (!meta) return null;
    const { year_version, section_version, previous_versions = [] } = meta;

    return (
        <FlexColumn gap="0.5rem">
            <h2>Version History</h2>
            <p>
                <strong>Current Version:</strong>{' '}
                {section_version || 'N/A'} {year_version ? `(${year_version})` : ''}
            </p>
            {previous_versions.length > 0 ? (
                <ul>
                    {previous_versions.map((ver) => (
                        <li key={ver}>{ver}</li>
                    ))}
                </ul>
            ) : (
                <p>No previous versions available.</p>
            )}
        </FlexColumn>
    );
}
