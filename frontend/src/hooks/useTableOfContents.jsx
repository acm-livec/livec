import React, { useState, useEffect } from 'react'
import { Disciplines } from '@utils/constants'
import { flattenSections } from '@utils/format';


/**
 * 
 * @param {string} curriculum 
 * @returns 
 */

export default function useTableOfContents(curriculum) {
    const [tableOfContents, setTableOfContents] = useState([])
    const [flatTableOfContents, setFlatTableOfContents] = useState([])

    /** @type {[Section, Function]} */
    const [currentPage, setCurrentPage] = useState()


    useEffect(() => {
        fetch('/cs_toc.json')
            .then((res) => res.json())
            .then((res) => {
                setTableOfContents(res);

                const flat = flattenSections(res);

                if (flat.length > 0) {
                    // Modify the first item
                    flat[0] = {
                        ...flat[0],
                        isFirst: true, // or title/icon/style overrides
                    };

                    // Modify the last item
                    flat[flat.length - 1] = {
                        ...flat[flat.length - 1],
                        isLast: true,
                    };
                }

                setFlatTableOfContents(flat);
            })
            .catch(console.error);
    }, [curriculum]);



    useEffect(() => {
        if (tableOfContents.length > 0) {
            const { index } = flatTableOfContents[0]
            console.log(index)
            setCurrentPage(flatTableOfContents[0])
        }
    }, [tableOfContents])



    const nextPage = () => {
        if (!(currentPage?.isLast || false)) {
            const currIndx = currentPage.index
            setCurrentPage(flatTableOfContents[currIndx + 1])
        }
    }

    const previousPage = () => {
        if (!(currentPage?.isFirst || false)) {
            const currIndx = currentPage.index
            setCurrentPage(flatTableOfContents[currIndx - 1])
        }
    }


    return { tableOfContents, nextPage, previousPage, currentPage, setCurrentPage }

}
