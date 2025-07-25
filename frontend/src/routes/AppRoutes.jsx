import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '@pages/home/HomePage';
import AuthPage from '@pages/auth/AuthPage';
import CurriculumPage from '@pages/curriculums/CurriculumPage';
import CurriculumDetailsPage from '@pages/details/CurriculumDetailsPage';
import DashboardPage from '@pages/dashboard/DashboardPage';

import ProfileView from '../pages/dashboard/profile/ProfileView';
import SuggestionView from '@pages/dashboard/suggestion/SuggestionView';
import MainView from '../pages/dashboard/overview/MainView';
import EditSectionPage from '@pages/dashboard/sections/EditSectionPage';


export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/auth" element={<AuthPage />} />
			<Route path="/curriculums" element={<CurriculumPage />} />
			<Route path="/curriculums/:slug/details" element={<CurriculumDetailsPage />} />


			{/* Dashboard entry */}
                        <Route path="/dashboard/:userId" element={<DashboardPage />}>
                                <Route index element={<Navigate to="overview" replace />} />
                                <Route path="overview" element={<MainView />} />
                                <Route path="profile" element={<ProfileView />} />
                                <Route path="suggestion/:suggestionId" element={<SuggestionView />} />
                                <Route path="section/:sectionId" element={<EditSectionPage />} />
                        </Route>
		</Routes>
	);
}
