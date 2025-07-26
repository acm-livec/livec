import { useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import * as Icons from '@components/Icons';
import { Layout, Sidebar, MainPanel } from '@components/layouts/Layout';

import { UserContext } from '@context/UserProvider';

import { Roles } from '@documentation/constants/roles';

export default function DashboardPage() {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        navigate('/auth');
        return null;
    }

    return (
        <Layout>
            <Sidebar>
                {user.hasRole(Roles.ASSOCIATE_EDITOR) && (
                    <AssociateEditorSidebarItems />
                )}
                {user.hasRole(Roles.REVIEWER) && <ReviewerSidebarItems />}
                {user.hasRole(Roles.COMMUNITY_MEMBER) && (
                    <CommunityMemberSidebarItems />
                )}
                {user.hasRole(Roles.EDITOR_IN_CHIEF) && (
                    <EditorInChiefSidebarItems />
                )}
            </Sidebar>

            <MainPanel>
                <Outlet />
            </MainPanel>
        </Layout>
    );
}

const CommunityMemberSidebarItems = () => {
    return (
        <>
            <Sidebar.Item
                text="Dashboard"
                icon={<Icons.House />}
                route={'overview'}
            />
            <Sidebar.Item
                text="Profile"
                icon={<Icons.Profile />}
                route="profile"
            />
        </>
    );
};

const AssociateEditorSidebarItems = () => {
    return (
        <>
            <Sidebar.Item
                text={'Dashboard'}
                icon={<Icons.House />}
                route={'overview'}
            />
            <Sidebar.Item
                text={'Board'}
                icon={<Icons.Board />}
                route={'board'}
            />
            {/* <Sidebar.Item
                text={'Histogram'}
                icon={<Icons.History />}
                route={' '}
            /> */}
            <Sidebar.Item
                text={'Profile'}
                icon={<Icons.Profile />}
                route={'profile'}
            />
        </>
    );
};

const ReviewerSidebarItems = () => {
    return (
        <>
            <Sidebar.Item
                text="Dashboard"
                icon={<Icons.House />}
                route={'overview'}
            />
            <Sidebar.Item
                text="Profile"
                icon={<Icons.Profile />}
                route="profile"
            />
        </>
    );
};

const EditorInChiefSidebarItems = () => {
    return (
        <>
            <Sidebar.Item
                text="Dashboard"
                icon={<Icons.House />}
                route={'overview'}
            />
            <Sidebar.Item
                text="Profile"
                icon={<Icons.Profile />}
                route="profile"
            />
        </>
    );
};
