import StatusIcon from '@components/Table/StatusIcon'
import { toTitleCase, formatDate } from '@utils/format'
import styles from './Suggestion.module.scss'


export default function Suggestion({ suggestion }) {

	const { id, title, status, timeCreated, discipline, section, text } = suggestion

	return (
		<div className={styles.suggestion}>
			<div className={styles.suggestion__header}>
				<div>
					<h1 className={styles.header__title}> {title || "Untitled"} </h1>
					<p className={styles.header__date}>Submitted on {formatDate(timeCreated)}</p>
					<hr className={styles.header__divider} />
				</div>


				<div className={styles.header__meta}>
					<h3 className={styles['meta-item']}><strong>Reference ID:</strong> {id}</h3>
					<h3 className={styles['meta-item']}><strong>Discipline: </strong>{toTitleCase(discipline)}</h3>
					<h3 className={styles['meta-item']}><strong>Current Status: </strong>{<StatusIcon status={status} />}</h3>
					<h3 className={styles['meta-item']}><strong>Associated Section: </strong>{section.title}</h3>
				</div>
			</div>


			<div className={styles.suggestion__text}>
				<p>{text}</p>
			</div>
		</div>
	)
}
