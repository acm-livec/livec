
import { useState, useContext, useEffect } from 'react';
import Modal, { DefaultView, ConfirmationView } from '@components/popups/Modal';
import useSuggestion from '@hooks/useSuggestion'
import StatusIcon from '@components/Table/StatusIcon';
import { UserContext } from '@context/UserProvider';
import { Status } from '@utils/constants';
import { Form, SubmitButton } from '@components/form';
import { TextArea, Dropdown } from '@components/form/input';
import { getReviewers } from '@utils/api-handlers/users/get-reviewers';
import { Triage } from '@utils/constants';


export const TriageOptionView = ({ suggestion = { id: '' }, option}) => {
    const { startReview, reject, assignReviewers } = useSuggestion()
    const [reviewers, setReviewers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);


    const action = {
        [Triage.START_REVIEW]: (formData) => startReview(suggestion.id, formData),
        [Triage.DESK_REJECT]: (formData) => reject(suggestion.id, formData),
        [Triage.DEFER_TO_REVIEWER]: (formData) => assignReviewers(suggestion?.id, formData)
    }

    const labels = {
        [Triage.START_REVIEW]: 'Initial Notes',
        [Triage.DESK_REJECT]: 'Reason for Rejection',
        [Triage.DEFER_TO_REVIEWER]: 'Message to Reviewer'
    }

    const heading = {
        [Triage.START_REVIEW]: 'Start Review Process',
        [Triage.DESK_REJECT]: 'Reject This Suggestion',
        [Triage.DEFER_TO_REVIEWER]: 'Defer Suggestion to Reviewer'
    }




    useEffect(() => {
        if (!user?.id) return;
        getReviewers(user.id)
            .then(res => setReviewers(res))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user.id, option]);




    if (loading) {
        return <p style={{ color: 'black' }}>Loading...</p>;
    }

    if (option === "default") return <Info />


    return (
        <>
            <h2>{heading[option]}</h2>

            <Form resetOn={[option, suggestion]}>
                <TextArea field={{ forPrivate: '' }} label={labels[option]} />
                <TextArea field={{ forPublic: '' }} label='Message to submitter' />

                {option === Triage.DEFER_TO_REVIEWER &&
                    <Dropdown
                        field={{ reviewer: '' }}
                        values={reviewers.map(item => ({ value: item.id, label: item.name }))}
                        label={'Select a reviewer to defer this suggestion to'}
                    />
                }

                <SubmitButton onSubmit={action[option]} >
                    {option === Triage.START_REVIEW && <StartReviewModal />}
                    {option === Triage.DESK_REJECT && <RejectReviewModal />}
                    {option === Triage.DEFER_TO_REVIEWER && <DeferReviewModal />}
                </SubmitButton>

            </Form>
        </>
    )
}

import styles from '../SuggestionView.module.scss';


const StartReviewModal = () => {
    return (
        <>
            <Modal>
                <DefaultView message={"Are you sure you want to begin reviewing this suggestion?"}>
                    <p style={{ fontSize: '0.95rem' }}>Doing so will update the submitter’s public status from </p>
                    <div><StatusIcon status={Status.Public.ASSIGNED} /> → <StatusIcon status={Status.Public.UNDER_REVIEW} rand={true} /></div>
                </DefaultView>
                <ConfirmationView message="The review process has started. The submitter’s status has been updated." />

            </Modal>
        </>
    )
}

const RejectReviewModal = () => {
    return (
        <>
            <Modal>
                <DefaultView message={"Are you sure you want to reject this suggestion?"}>
                     <p style={{ fontSize: '0.95rem' }}>This will change the submitter’s status from</p>
                    <div><StatusIcon status={'assigned'} /> → <StatusIcon status={'rejected'} /></div>
                </DefaultView>
                <ConfirmationView message="The suggestion has been rejected and the submitter has been notified." />

            </Modal>
        </>
    )
}

const DeferReviewModal = () => {
    return (
        <>
            <Modal>
                <DefaultView message={"Are you sure you want to defer this suggestion to a reviewer?"}>
                    <p>This will change the submitter’s status from</p>
                    <div><StatusIcon status={'assigned'} /> → <StatusIcon status={Status.Public.PENDING_EXTERNAL_REVIEW} rand={true}/></div>
                </DefaultView>
                <ConfirmationView message="The suggestion has been deferred to a reviewer." />

            </Modal>
        </>
    )
}




const Info = () => {
    return (
        <div className={styles.sidebar__content}>
            <div>
                <h2>Start Review</h2>
                <hr />
                <p>
                    This option is for when the Associate Editor initially reviews the
                    suggestion and decides it should move forward in the process. When
                    you click “Start Review,” a form will appear with two text areas:
                </p>
                <ul>
                    <li>
                        <strong>Initial Notes:</strong> Document any preliminary context,
                        concerns, or details that will help yourself and others when
                        reviewing the suggestion.
                    </li>
                    <li>
                        <strong>Message to Submitter:</strong> Write an acknowledgment or
                        update that will be sent to the original submitter.
                    </li>
                </ul>
            </div>

            <div>
                <h2>Desk Reject</h2>
                <hr />

                <p>
                    Use this option if the suggestion is not suitable for further review and
                    should be rejected without external review. A form will appear with the
                    following fields:
                </p>
                <ul>
                    <li>
                        <strong>Reason:</strong> Briefly explain why the suggestion is being
                        rejected.
                    </li>
                    <li>
                        <strong>Message to Submitter:</strong> Provide a clear, respectful explanation
                        that will be sent to the submitter.
                    </li>
                </ul>
            </div>

            <div>
                <h2>Defer to Reviewer</h2>
                <hr />

                <p>
                    Choose this option to assign the suggestion to a reviewer for further evaluation.
                    A form will appear with the following fields:
                </p>
                <ul>
                    <li>
                        <strong>Initial Notes to Reviewer:</strong> Add any context or instructions for the reviewer.
                    </li>
                    <li>
                        <strong>Message to Submitter:</strong> Write a message that will be sent to the submitter to
                        inform them their suggestion is under review.
                    </li>
                    <li>
                        <strong>Select Reviewer:</strong> Choose a reviewer from the dropdown list.
                    </li>
                </ul>
            </div>
        </div>
    )
}
