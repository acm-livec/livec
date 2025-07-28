import styles from './SuggestionBox.module.scss';
import { useNavigate } from 'react-router';
import useSuggestion from '@hooks/useSuggestion';
import { UserContext } from '@context/UserProvider';
import { useContext, useEffect } from 'react';

import { Form, TextField, Dropdown, TextArea } from './input';

export default function SuggestionBox({ sectionId }) {
    const { user } = useContext(UserContext);
    const { submit, response, setResponse } = useSuggestion();

    useEffect(() => {
        setResponse(null);
    }, [sectionId]);

    const close = () => {
        setResponse(null);
    };

    return (
        <div className={styles['suggestion-box']}>
            {!user && <Placeholder />}
            {response && response.success === true && <Success onClose={close} response={response} />}
            {response && response.success === false && <Failure />}
            {user && !response && <Default sectionId={sectionId} submit={submit} />}
        </div>
    );
}

const Default = ({ sectionId, submit }) => {
    const discipline = sessionStorage.getItem('curriculum') || 'none';
    const options = [
        {
            label: 'New Knowledge Area',
            value: 'new-knowledge-area',
        },
        {
            label: 'New Knowledge Unit',
            value: 'new-knowledge-unit',
        },
        {
            label: 'Update Existing Knowledge Unit',
            value: 'update-existing-knowledge-unit',
        },
        {
            label: 'Update Existing Knowledge Area',
            value: 'update-existing-knowledge-area',
        },
        {
            label: 'Add Suggested Learning Outcomes',
            value: 'add-learning-outcomes',
        },
        {
            label: 'Revise Learning Outcomes',
            value: 'revise-learning-outcomes',
        },
        {
            label: 'Suggest Industry Alignment',
            value: 'suggest-industry-alignment',
        },
        {
            label: 'Include Interdisciplinary Topics',
            value: 'include-interdisciplinary-topics',
        },
        {
            label: 'Propose Teaching Methodologies',
            value: 'propose-teaching-methodologies',
        },
        {
            label: 'Suggest Emerging Technologies or Trends',
            value: 'suggest-emerging-trends',
        },
        {
            label: 'Propose Assessment Techniques',
            value: 'propose-assessment-techniques',
        },
        {
            label: 'Request Clarification or Guidance',
            value: 'request-clarification',
        },
        {
            label: 'General Feedback or Comment',
            value: 'general-feedback',
        },
    ];

    return (
        <>
            <h2>Have a thought or suggestion for this section? Fill out the form below.</h2>
            <Form resetOn={[sectionId]} onSubmit={(formData) => submit({ sectionId, discipline, ...formData })}>
                <Dropdown keyName="type" values={options} label="Type of suggestion" required />
                <TextField keyName="title" label="Enter a brief title explaining your suggestions" required maxLength={100} />
                <TextArea keyName="text" label="Enter your suggestion down below" required maxLength={500} />
            </Form>
        </>
    );
};

const Placeholder = () => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/auth')} className="clickable">
            <h2>Login in or Register to leave a suggestion for this section</h2>
        </div>
    );
};

const Success = ({ response, onClose }) => (
    <div>
        <h2>✅ Success</h2>
        <p>{response?.message}</p>
        <button onClick={onClose}>Close</button>
    </div>
);

const Failure = ({ message }) => (
    <div>
        <h2>❌ Error</h2>
        <p>{message.message || 'Something went wrong.'}</p>
    </div>
);
