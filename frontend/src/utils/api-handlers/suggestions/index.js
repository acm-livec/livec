export * from './get-suggestion'
export * from './post-accept'
export * from './post-approval'
export * from './post-change'
export * from './post-documenation'
export * from './post-finalize'
export * from './post-rejection'
export * from './post-suggestion'

// export const postReviewers = async (id, notes, message, reviewers) => {
//     try {
//         logger.info("started post reviewers")
//         await API.post(`/suggestion/${id}/assign-reviewers`, { notes, message, reviewers })

//     } catch (error) {
//         log.error(error)
//     }
// }