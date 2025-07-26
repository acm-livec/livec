import { useState } from 'react';

/**
 * Hook to self-nominate a reviewer by user ID.
 * Usage: const [status, selfNominate] = useSelfNominateReviewer(userId);
 */
export default function useSelfNominateReviewer(userId) {
    const [status, setStatus] = useState(null);
    async function selfNominate() {
        setStatus('pending');
        try {
            const res = await fetch(`/api/reviewer/${userId}/self-nominate`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error(await res.text());
            setStatus('done');
        } catch (err) {
            setStatus('error');
        }
    }
    return [status, selfNominate];
}
