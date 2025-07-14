// src/controllers/suggestion/index.js

import { postSuggestion } from './post-suggestion.js';
import { postRejection } from './post-reject.js';
import { postStartReview } from './post-start.js';
import { postReviewers } from './post-reviewers.js';
import { getSuggestion } from './get-suggestion.js';
import { postDocumentation } from './post-documentation.js'
import { postAssociateEditorFinalization } from './post-finalized.js'
import { postEditorInChiefApproval } from './post-approval.js'
import {postChangeRequest} from './post-change.js'

export {
    postSuggestion,
    postRejection,
    getSuggestion,
    postStartReview,
    postReviewers,
    postDocumentation,
    postAssociateEditorFinalization,
    postEditorInChiefApproval,
    postChangeRequest
};
