import useSuggestion from '@hooks/useSuggestion'
import StatusIcon from '@components/Table/StatusIcon';
import { Table, TableHeader, TableBody } from '@components/Table';
import ActionSelect from '@components/Table/ActionSelect';
import { UserContext } from '@context/UserProvider';
import { useContext } from 'react';
import { Roles } from '@utils/constants';
import styles from './MainView.module.scss'
import { toTitleCase } from '@utils/format';
const headers = [
    { text: 'No.', key: 'num', width: '5%' },
    { text: 'Date Submitted', key: 'date', width: '20%' }, 
    { text: 'Title', key: 'title', width: '20%' },
    { text: 'Status', key: 'status', width: '20%' },
    { text: 'Actions', key: 'actions', width: '20%' },
];





const formatSuggestions = (suggestions) => {
    return suggestions.map((item, index) => ({
        num: index + 1,
        date: new Date(item.timeCreated).toLocaleDateString(),
        title: item.title,
        status: <StatusIcon status={item.status}/>,
        actions: <ActionSelect status={item.status} suggestion={item}/>
    }));
};





export default function MainView() {
    const { suggestions } = useSuggestion()
    const {user} = useContext(UserContext)
    let text;

    if(user.role === Roles.COMMUNITY_MEMBER) {
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
