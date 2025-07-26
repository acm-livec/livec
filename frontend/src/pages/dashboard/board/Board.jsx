import useSuggestion from '@hooks/useSuggestion';
import StatusIcon from '@components/Table/StatusIcon';
import {
    Table,
    TableHeader,
    TableBody,
    TableSectionBody,
} from '@components/Table';
import { UserContext } from '@context/UserProvider';
import { useEffect, useState, useContext } from 'react';
import styles from '../overview/MainView.module.scss';
import { toTitleCase } from '@utils/format';
import { getCurriculum } from '@utils/api-handlers/curriculums/get-curriculum';

const headers = [
    { text: 'No.', key: 'num', width: '5%' },
    { text: 'Date Submitted', key: 'date', width: '10%' },
    { text: 'Title', key: 'title', width: '20%' },
    { text: 'Status', key: 'status', width: '15%' },
    { text: 'Discipline', key: 'discipline', width: '10%' },
];

const formatSuggestions = (suggestions) => {
    return suggestions.map((item, index) => ({
        id: item.id,
        num: index + 1,
        date: new Date(item.timeCreated).toLocaleDateString(),
        title: item.title,
        status: <StatusIcon status={item.status} />,
        discipline: toTitleCase(item.discipline),
    }));
};

export default function Board() {
    const { finalSuggestions } = useSuggestion();

    return (
        <section className={styles.main}>
            <div className={styles['suggestion-table']}>
                <h2 className="monts">Ready for board discussion</h2>

                <div className={styles['table-container']}>
                    <Table>
                        <TableHeader headers={headers} />
                        <TableBody
                            headers={headers}
                            data={formatSuggestions(finalSuggestions)}
                        />
                    </Table>
                </div>
            </div>
        </section>
    );
}
