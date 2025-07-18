

function suggestionFactory(suggestion) {
    return {
        startReview(startedBy, notes) {
            suggestion.status.system = 'ACTIVE';
            suggestion.history.push({
                action: 'START_REVIEW',
                performed_by: startedBy,
                notes,
                date: new Date().toISOString()
            });
            return suggestion;
        },

        reject(reason, by) {
            suggestion.status.system = 'CLOSED';
            suggestion.history.push({
                action: 'REJECTED',
                reason,
                performed_by: by,
                date: new Date().toISOString()
            });
            return suggestion;
        }
    };
}