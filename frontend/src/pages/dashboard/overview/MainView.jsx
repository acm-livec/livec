import useSuggestion from '@hooks/useSuggestion'
import StatusIcon from '@components/Table/StatusIcon';
import { Table, TableHeader, TableBody } from '@components/Table';
import { UserContext } from '@context/UserProvider';
import { useContext } from 'react';
import styles from './MainView.module.scss'
import { toTitleCase } from '@utils/format';


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





export default function MainView() {
    const { suggestions } = useSuggestion()
    const {user} = useContext(UserContext)
    let text;

    if(user.isCommunityMember) {
        text = "My Suggestions"
    } else {
        text = toTitleCase(user.role) + " of " + toTitleCase(user.discipline)
    }

    
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
        </section>
    )
}
