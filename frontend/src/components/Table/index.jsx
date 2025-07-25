import styles from './Table.module.css';
import { useNavigate } from 'react-router';

export const Table = ({ children }) => {
	return (
		<table className={styles.table}>
			{children}
		</table>
	);
};


export const TableHeader = ({ headers = [] }) => {
	return (
		<thead>
			<tr >
				{headers.map((heading, index) => (
					<th
						key={heading.text + index}
						style={heading.width ? { width: heading.width } : {}}
					>
						{heading.text}
					</th>
				))}
			</tr>
		</thead>
	);
};


export const TableBody = ({ data = [], headers = [] }) => {
	return (
		<tbody>
			{data.map((row, rowIndex) => (
				<TableRow key={rowIndex} row={row} headers={headers} />
			))}
		</tbody>
	);
};

export const TableSectionBody = ({ data = [], headers = [] }) => {
        return (
                <tbody>
                        {data.map((row, rowIndex) => (
                                <SectionRow key={rowIndex} row={row} headers={headers} />
                        ))}
                </tbody>
        );
};


import { UserContext } from '@context/UserProvider';
import { useContext } from 'react';


export const TableRow = ({ row, headers }) => {
        const {user} = useContext(UserContext)
        const navigate = useNavigate();
	
	return (
		<tr className={styles['table-row']} onClick={() =>  navigate(`/dashboard/${user.id}/suggestion/${row.id}`)}>
			{headers.map((header, index) => (
				<td key={index}>{row[header.key]}</td>
			))}
		</tr>
        );
};

export const SectionRow = ({ row, headers }) => {
        const { user } = useContext(UserContext);
        const navigate = useNavigate();

        return (
                <tr className={styles['table-row']} onClick={() => navigate(`/dashboard/${user.id}/section/${row.id}`)}>
                        {headers.map((header, index) => (
                                <td key={index}>{row[header.key]}</td>
                        ))}
                </tr>
        );
};
