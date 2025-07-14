import { useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import * as Icons from '@components/Icons';
import { Layout, Sidebar, MainPanel } from '@components/containers/Layout';

import { UserContext } from '@context/UserProvider';

import { Roles } from '@utils/constants'



export default function DashboardPage() {
	const { user, loading } = useContext(UserContext);
	const navigate = useNavigate();

	if (loading) return <div>Loading...</div>

	if (!user) {
		navigate('/auth');
		return null;
	}

	return (
		<Layout>
			
			<Sidebar>
				{user.role === Roles.ASSOCIATE_EDITOR && <AssociateEditorSidebarItems />}
				{user.role === Roles.REVIEWER && <ReviewerSidebarItems />}
				{user.role === Roles.COMMUNITY_MEMBER && <CommunityMemberSidebarItems />}
				{user.role === Roles.EDITOR_IN_CHIEF && <EditorInChiefSidebarItems />}
			</Sidebar>

			<MainPanel>
				<Outlet />
			</MainPanel>

		</Layout>
	)
}




const CommunityMemberSidebarItems = () => {
	return (
		<>
			<Sidebar.Item text="Dashboard" icon={<Icons.House />} route={"overview"} />
			<Sidebar.Item text="Profile" icon={<Icons.Profile />} route="profile" />
		</>
	)
}



const AssociateEditorSidebarItems = () => {
	return (
		<>
			<Sidebar.Item text={"Dashboard"} icon={<Icons.House />} route={'overview'} />
			<Sidebar.Item text={"My Reviewers"} icon={<Icons.Reviewer />} route={'reviewers'} />
			<Sidebar.Item text={"Histogram"} icon={<Icons.History />} route={' '} />
			<Sidebar.Item text={"Profile"} icon={<Icons.Profile />} route={'profile'} />
		</>
	)
}



const ReviewerSidebarItems = () => {
	return (
		<>
			<Sidebar.Item text="Dashboard" icon={<Icons.House />} route={"overview"} />
			<Sidebar.Item text="Profile" icon={<Icons.Profile />} route="profile" />
		</>
	)
}



const EditorInChiefSidebarItems = () => {
		return (
		<>
			<Sidebar.Item text="Dashboard" icon={<Icons.House />} route={"overview"} />
			<Sidebar.Item text="Profile" icon={<Icons.Profile />} route="profile" />
		</>
	)
}
