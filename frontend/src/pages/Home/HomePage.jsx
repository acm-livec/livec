import { useState, useContext } from 'react';
import { API } from '@api/client';
import { Button } from '@components/buttons';
import { UserContext } from '@context/UserProvider';
export default function HomePage() {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const handleReset = async () => {
        if (!window.confirm('⚠️ Are you sure you want to reset the database?')) {
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
        <section>
            <Button
                hideOn={!user || user.role !== 'admin'}
                onClick={handleReset}
                disableOn={loading}
                text={loading ? 'Resetting…' : 'Reset Database'}
            />
        </section>
    );
}
