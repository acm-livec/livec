// src/controllers/suggestion/index.js

import { postSuggestion } from './post-suggestion.js';
import { postRejection } from './post-reject.js';
import { postStartReview } from './post-start.js';
import { postAssignReviewers } from './post-reviewers.js';
import { getSuggestion } from './get-suggestion.js';
import { postDocumentation } from './post-documentation.js'
import { postAssociateEditorFinalization } from './post-finalized.js'
import { postEditorInChiefApproval } from './post-approval.js'
import { postChangeRequest } from './post-change.js'
import { postDeferral } from './post-deferral.js'
import { postRecommednation } from './post-recommendation.js'
import { postDiscussion } from './post-discussion.js'
import { postImplementation } from './post-implementation.js'

export {
    postSuggestion,
    postRejection,
    getSuggestion,
    postStartReview,
    postAssignReviewers,
    postDocumentation,
    postAssociateEditorFinalization,
    postEditorInChiefApproval,
    postChangeRequest,
    postDeferral,
    postRecommednation,
    postDiscussion,
    postImplementation
};
