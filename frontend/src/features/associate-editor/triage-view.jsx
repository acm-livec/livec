import StatusIcon from '@components/Table/StatusIcon'
import useAssociateEditor, { AssociateEditor } from '@features/associate-editor/useAssociateEditor';
import { Status } from '@utils/constants';
import { Actions } from '@utils/constants';
import { Form, TextArea, Dropdown } from '@components/input';






export const TriageOptionView = ({ suggestion = { id: '' }, option }) => {
    const { accept, reject, defer, reviewers } = useAssociateEditor()

    const variant = {
        [AssociateEditor.START_REVIEW]: {
            heading: 'Start Review Process',
            topLabel: 'Initial Notes',
            action: (formData) => accept(suggestion.id, formData)
        },
        [AssociateEditor.DESK_REJECT]: {
            heading: 'Reject This Suggestion',
            topLabel: 'Reason for Rejection',
            action: (formData) => reject(suggestion.id, formData)
        },
        [AssociateEditor.DEFER_TO_REVIEWER]: {
            heading: 'Defer Suggestion to Reviewer',
            topLabel: 'Message to Reviewer',
            action: (formData) => defer(suggestion.id, formData)
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
                    successInfo: ''
                }}
            >
                <TextArea keyName='forPrivate' label={variant[option]?.topLabel} />
                <TextArea keyName='forPublic' label='Message to submitter' />

                {option === Actions.DEFER_TO_REVIEWER &&
                    <Dropdown
                        keyName='reviewer'
                        values={reviewers.map(item => ({ value: item.id, label: item.name + `  (${item.id})` }))}
                        label={'Select a reviewer to defer this suggestion to'}
                    />
                }
            </Form>
        </>
    )
}





const ConfirmBoxInfo = ({ action }) => {
    const variant = {
        [Actions.START_REVIEW]: {
            message: 'Are you sure you want to begin reviewing this suggestion?',
            status: {
                from: Status.Public.ASSIGNED,
                to: Status.Public.UNDER_REVIEW,
            }
        },
        [Actions.DESK_REJECT]: {
            message: 'Are you sure you want to reject this suggestion?',
            status: {
                from: Status.Public.ASSIGNED,
                to: Status.Public.REJECTED,
            }
        },
        [Actions.DEFER_TO_REVIEWER]: {
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






const SuccessBoxInfo = () => {
    return (
        <>
            <p>Are you sure you want to reject this suggestion?</p>
            <p style={{ fontSize: '0.95rem' }}>This will change the submitter’s status from</p>
            <div><StatusIcon status={'assigned'} /> → <StatusIcon status={'rejected'} /></div>
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



{/* <Form resetOn={[option, suggestion]}>
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

            </Form> */}
