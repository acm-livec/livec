import StatusIcon from '@components/Table/StatusIcon';
import { Status } from '@utils/constants';
import useEditorInChief, { EditorInChief } from './useEditorInChief';
import { Form, TextArea } from '@components/input';

export const ActionView = ({ suggestion = { id: '' }, option }) => {
    const { approveSuggestion, sendChangeRequest, reject } = useEditorInChief();

    const variant = {
        [EditorInChief.APPROVE_CHANGE]: {
            heading: 'Approve This Change',
            topLabel: 'Message to Associate Editor',
            action: (formData) => approveSuggestion(suggestion.id, formData),
        },
        [EditorInChief.REJECT_CHANGE]: {
            heading: 'Reject This Change',
            topLabel: 'Reason for Rejection',
            action: (formData) => reject(suggestion.id, formData),
        },
        [EditorInChief.SEND_CHANGE_REQUEST]: {
            heading: 'Send a Change Request',
            topLabel: 'Message to Associate Editor',
            action: (formData) => sendChangeRequest(suggestion.id, formData),
        },
    };

    if (option === 'default') return <Info />;

    return (
        <>
            <h2>{variant[option]?.heading}</h2>

            <Form
                resetOn={[option, suggestion]}
                onSubmit={variant[option]?.action}
                showConfirmation={{
                    defaultInfo: <ConfirmBoxInfo action={option} />,
                    successInfo: <SuccessBoxInfo action={option} />,
                }}
            >
                <TextArea
                    keyName="forPrivate"
                    label={variant[option]?.topLabel}
                />
                <TextArea keyName="forPublic" label="Message to submitter" />
            </Form>
        </>
    );
};

const ConfirmBoxInfo = ({ action }) => {
    const variant = {
        [EditorInChief.APPROVE_CHANGE]: {
            message: 'Are you sure you want to approve this change?',
            status: {
                from: Status.Public.UNDER_REVIEW,
                to: Status.Public.UNDER_CONSIDERATION,
            },
        },
        [EditorInChief.REJECT_CHANGE]: {
            message: 'Are you sure you want to reject this change?',
            status: {
                from: Status.Public.UNDER_REVIEW,
                to: Status.Public.REJECTED,
            },
        },
        [EditorInChief.SEND_CHANGE_REQUEST]: {
            message: 'Are you sure you want to request changes from the associate editor?',
            status: {
                from: Status.Public.UNDER_REVIEW,
                to: Status.Public.UNDER_REVIEW,
            },
        },
    };
    return (
        <>
            <p>{variant[action]?.message}</p>
            <p style={{ fontSize: '0.95rem' }}>
                This will change the submitter’s status from
            </p>
            <div>
                <StatusIcon status={variant[action]?.status.from} /> →{' '}
                <StatusIcon status={variant[action]?.status.to} />
            </div>
        </>
    );
};

const SuccessBoxInfo = ({ action }) => {
    const variant = {
        [EditorInChief.APPROVE_CHANGE]:
            'Change has been successfully approved!',
        [EditorInChief.REJECT_CHANGE]:
            'Change has been successfully rejected!',
        [EditorInChief.SEND_CHANGE_REQUEST]:
            'Change request has been successfully sent to Associate Editor!',
    };
    return (
        <>
            <p>{variant[action]}</p>
        </>
    );
};

const Info = () => {
    return (
        <div className="sidebar__content">
            <div>
                <h2>Approve Change</h2>
                <hr />
                <p>
                    Select <strong>Approve</strong> when you agree with the
                    Associate Editor's recommendation and the proposed content
                    should move forward to board discussion. The form includes:
                </p>
                <ul>
                    <li>
                        <strong>Message to Associate Editor:</strong> Private
                        notes or context regarding the approval.
                    </li>
                    <li>
                        <strong>Message to Submitter:</strong> A public update
                        letting the original author know the change is advancing.
                    </li>
                </ul>
            </div>

            <div>
                <h2>Reject Change</h2>
                <hr />

                <p>
                    Use <strong>Reject</strong> if the suggested change should
                    not be adopted. You'll be able to provide the reason for
                    rejection and communicate it to the submitter.
                </p>
                <ul>
                    <li>
                        <strong>Reason for Rejection:</strong> Explanation sent
                        to the Associate Editor.
                    </li>
                    <li>
                        <strong>Message to Submitter:</strong> Public notice of
                        the rejection.
                    </li>
                </ul>
            </div>

            <div>
                <h2>Send Change Request</h2>
                <hr />

                <p>
                    Choose this when additional revisions are required from the
                    Associate Editor before a final decision. The form allows:
                </p>
                <ul>
                    <li>
                        <strong>Message to Associate Editor:</strong> Outline
                        what needs to be addressed or clarified.
                    </li>
                    <li>
                        <strong>Message to Submitter:</strong> Optional note
                        informing the submitter that their suggestion is still
                        under review.
                    </li>
                </ul>
            </div>
        </div>
    );
};
