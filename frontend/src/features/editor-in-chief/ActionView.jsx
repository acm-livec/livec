import StatusIcon from '@components/Table/StatusIcon'
import { Status } from '@utils/constants';
import useEditorInChief, {EditorInChief} from './useEditorInChief';
import { Form, TextArea } from '@components/input';






export const ActionView = ({ suggestion = { id: '' }, option }) => {
    const { approveSuggestion, sendChangeRequest, reject } = useEditorInChief()

    const variant = {
        [EditorInChief.APPROVED_BY_EDITOR_IN_CHIEF]: {
            heading: 'Approve This Change',
            topLabel: 'Message to Associate Editor',
            action: (formData) => approveSuggestion(suggestion.id, formData)
        },
        [EditorInChief.REJECTED_BY_EDITOR_IN_CHIEF]: {
            heading: 'Reject This Change',
            topLabel: 'Reason for Rejection',
            action: (formData) => reject(suggestion.id, formData)
        },
        [EditorInChief.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF]: {
            heading: 'Send a Change Request',
            topLabel: 'Message to Associate Editor',
            action: (formData) => sendChangeRequest(suggestion.id, formData)
        },
    }


    if (option === "default") return <Info />


    return (
        <>
            <h2>{variant[option]?.heading}</h2>

            <Form
                resetOn={[option, suggestion]}
                onSubmit={variant[option]?.action}
                showConfirmation={{
                    defaultInfo: <ConfirmBoxInfo action={option} />,
                    successInfo: <SuccessBoxInfo action={option}/>
                }}
            >
                <TextArea keyName='forPrivate' label={variant[option]?.topLabel} />
                <TextArea keyName='forPublic' label='Message to submitter' />

            </Form>
        </>
    )
}





const ConfirmBoxInfo = ({ action }) => {
    const variant = {
        [EditorInChief.APPROVED_BY_EDITOR_IN_CHIEF]: {
            message: 'Are you sure you want to approve this change?',
            status: {
                from: Status.Public.UNDER_HIGHER_REVIEW,
                to: Status.Public.UNDER_CONSIDERATION,
            }
        },
        [EditorInChief.REJECTED_BY_EDITOR_IN_CHIEF]: {
            message: 'Are you sure you want to reject this change?',
            status: {
                from: Status.Public.UNDER_HIGHER_REVIEW,
                to: Status.Public.REJECTED,
            }
        },
        [EditorInChief.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF]: {
            message: 'Are you sure you want to begin reviewing this suggestion?',
            status: {
                from: Status.Public.ASSIGNED,
                to: Status.Public.PENDING_EXTERNAL_REVIEW,
            }
        },

    }
    return (
        <>
            <p>{variant[action]?.message}</p>
            <p style={{ fontSize: '0.95rem' }}>This will change the submitter’s status from</p>
            <div><StatusIcon status={variant[action]?.status.from} /> → <StatusIcon status={variant[action]?.status.to} /></div>
        </>
    )
}






const SuccessBoxInfo = ({ action }) => {
    const variant = {
        [EditorInChief.APPROVED_BY_EDITOR_IN_CHIEF]: 'Change has been successfully approved!',
        [EditorInChief.REJECTED_BY_EDITOR_IN_CHIEF]: 'Change has been successfully rejected!',
        [EditorInChief.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF]: 'Change request has been successfully sent to Associate Editor!',

    }
    return (
        <>
            <p>{variant[action]}</p>
        </>
    )
}





const Info = () => {
    return (
        <div className='sidebar__content'>
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



