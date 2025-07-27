import './style.css';

import { useState } from 'react';
import { API } from '@api/client';
import './style.css';

export default function HomePage() {
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (
            !window.confirm('⚠️ Are you sure you want to reset the database?')
        ) {
            return;
        }
        setLoading(true);
        try {
            await API.post('/admin/reset');
            alert('✅ Database reset successfully.');
        } catch (error) {
            console.error('Reset failed:', error);
            alert('❌ Failed to reset database.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="home">
            <button
                className="reset-button"
                onClick={handleReset}
                disabled={loading}
            >
                {loading ? 'Resetting…' : 'Reset Database'}
            </button>
        </section>
    );
}
