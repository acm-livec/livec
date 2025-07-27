import { FlexColumn } from '@components/layouts/flex';

export default function CurriculumDetailsSkeleton({ message }) {
    const placeholderItems = Array.from({ length: 15 });
    return (
        <div className="details-page">
            <aside className="toc-sidebar space-y-2 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <ul className="table-of-contents space-y-2 mt-4">
                    {placeholderItems.map((_, idx) => (
                        <li key={idx} className="toc-item">
                            <div className="h-3 bg-gray-300 rounded" />
                        </li>
                    ))}
                </ul>
            </aside>
            <FlexColumn className="pdf-container gap-4 items-center justify-center">
                {message && (
                    <h2 className="text-center text-gray-600">{message}</h2>
                )}
                <div className="w-11/12 h-6 bg-gray-300 rounded" />
                <div className="w-11/12 h-96 bg-gray-200 rounded" />
            </FlexColumn>
        </div>
    );
}
