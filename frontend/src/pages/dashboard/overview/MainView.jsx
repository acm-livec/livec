import useSuggestion from '@hooks/useSuggestion';
import StatusIcon from '@components/Table/StatusIcon';
import { Table, TableHeader, TableBody, TableSectionBody } from '@components/Table';
import { UserContext } from '@context/UserProvider';
import { useEffect, useState, useContext } from 'react';
import styles from './MainView.module.scss';
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
        status: <StatusIcon status={item.status}/>,
        discipline: toTitleCase(item.discipline)
    }));
};

const sectionHeaders = [
    { text: 'No.', key: 'num', width: '5%' },
    { text: 'Title', key: 'title', width: '30%' }
];

const formatSections = (sections) =>
    sections.map((item, index) => ({ id: item.id, num: index + 1, title: item.title }));





export default function MainView() {
    const { suggestions } = useSuggestion();
    const { user } = useContext(UserContext);
    const [sections, setSections] = useState([]);
    let text;

    if(user.isCommunityMember) {
        text = "My Suggestions"
    } else {
        text = toTitleCase(user.role) + " of " + toTitleCase(user.discipline)
    }

    
    useEffect(() => {
        if (user.role === 'associate-editor') {
            getCurriculum(user.discipline).then(res => setSections(res));
        }
    }, [user]);

    return (
        <section className={styles.main}>
            <div className={styles['suggestion-table']}>
                <h2 className='monts'>{text}</h2>

                <div className={styles['table-container']}>
                    <Table>
                        <TableHeader headers={headers} />
                        <TableBody headers={headers} data={formatSuggestions(suggestions)} />
                    </Table>
                </div>
            </div>

            {user.role === 'associate-editor' && (
                <div className={styles['suggestion-table']}>
                    <h2 className='monts'>Assigned Sections</h2>
                    <div className={styles['table-container']}>
                        <Table>
                            <TableHeader headers={sectionHeaders} />
                            <TableSectionBody headers={sectionHeaders} data={formatSections(sections)} />
                        </Table>
                    </div>
                </div>
            )}
        </section>
    );
}
