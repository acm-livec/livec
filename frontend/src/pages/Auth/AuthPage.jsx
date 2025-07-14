import AuthForm from './AuthForm'
import styles from './AuthPage.module.scss'

/**
 * Page containing the form where users can either
 * login or register. 
*/
import { FlexColumn } from '@components/containers/Flex'
export default function AuthPage() {
    return (
        <section className={styles.container}>
            <FlexColumn padding='5%' className={styles.sidebar}>
                <p>Community Member</p>
                <ul>
                    <li>Email: johndoe@email.com</li>
                    <li>Password: password</li>
                </ul>
                <p>Associate Editor</p>
                <ul>
                    <li>Email: johnsmith@email.com</li>
                    <li>Password: password</li>
                </ul>
                <p>Reviewer</p>
                <ul>
                    <li>Email: janedoe@email.com</li>
                    <li>Password: password</li>
                </ul>
                <p>Editor In Chief</p>
                <ul>
                    <li>Email: jonhpork@email.com</li>
                    <li>Password: password</li>
                </ul>

            </FlexColumn>
            <div className={styles['form-area']}>
                <AuthForm/>
            </div>
        </section>
    )
}
