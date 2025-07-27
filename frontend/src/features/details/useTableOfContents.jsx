import { useState, useEffect } from 'react';
import { Disciplines } from '@utils/constants';
import { getCurriculum } from '@utils/api-handlers/curriculums/get-curriculum';

/**
 *
 * @param {string} curriculum
 * @returns
 */

export default function useTableOfContents(curriculum) {
    const [tableOfContents, setTableOfContents] = useState([]);

    /** @type {[Section, Function]} */
    const [currentPage, setCurrentPage] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getCurriculum(curriculum)
            .then((res) => {
                if (Array.isArray(res) && res.length > 0) {
                    // Modify the first item
                    res[0] = {
                        ...res[0],
                        isFirst: true, // or title/icon/style overrides
                    };

                    // Modify the last item
                    res[res.length - 1] = {
                        ...res[res.length - 1],
                        isLast: true,
                    };

                    setTableOfContents(res);
                } else {
                    setTableOfContents([]);
                }
            })
            .catch(() => setTableOfContents([]))
            .finally(() => setLoading(false));
    }, [curriculum]);

    useEffect(() => {
        if (tableOfContents.length > 0) {
            setCurrentPage(tableOfContents[0]);
        }
    }, [tableOfContents]);

    useEffect(() => {
    }, [currentPage]);

    const nextPage = () => {
        if (!(currentPage?.isLast || false)) {
            const currIndx = currentPage.meta.index;
            setCurrentPage(tableOfContents[currIndx + 1]);
        }
    };

    const previousPage = () => {
        if (!(currentPage?.isFirst || false)) {
            const currIndx = currentPage.meta.index;
            setCurrentPage(tableOfContents[currIndx - 1]);
        }
    };

    return {
        tableOfContents,
        nextPage,
        previousPage,
        currentPage,
        setCurrentPage,
        loading,
    };
}
