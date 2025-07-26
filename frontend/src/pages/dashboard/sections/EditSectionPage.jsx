import { useParams } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { getSection } from '@utils/api-handlers/curriculums/get-section';
import { updateSection as saveSection } from '@utils/api-handlers/curriculums/update-section';
import PlateEditor from '@features/details/PlateEditor';
import { Button } from '@components/buttons';
import { UserContext } from '@context/UserProvider';

export default function EditSectionPage() {
    const { user } = useContext(UserContext);
    const { sectionId } = useParams();
    const [section, setSection] = useState();

    useEffect(() => {
        if (!user?.discipline) return;
        getSection(user.discipline, sectionId).then(setSection);
    }, [user, sectionId]);

    const handleSave = async () => {
        const stored = JSON.parse(localStorage.getItem(sectionId));
        const content = stored || section.content;
        await saveSection(user.discipline, sectionId, { ...section, content });
    };

    if (!section) return <p>Loading...</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Edit Section: {section.title}</h2>
            <PlateEditor
                content={section.content}
                LOCAL_STORAGE_KEY={sectionId}
            />
            <Button
                style={{ marginTop: '1rem' }}
                variant="confirm"
                text="Save Changes"
                onClick={handleSave}
            />
        </div>
    );
}
