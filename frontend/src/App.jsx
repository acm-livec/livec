<<<<<<< HEAD
import React from 'react';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import RegisterPage from './pages/Auth/RegisterPage';
import HomePage from './pages/HomePage';
import CommunityMemberRegisterPage from "./pages/cm/CommunityMemberRegisterPage";
import EditorRegisterPage from './pages/editor/EditorRegisterPage';
import CurriculumPage from './pages/curriculum/CurriculumPage.jsx';

import ProposedChangeFormPage from './pages/pc/ProposedChangeFormPage.jsx';

import RecommendationPage from './pages/RecommendationPage';
// import CurriculumDetailsPage from './pages/Details/CurriculumDetailsPage';
// import AuthPage from './pages/AuthPage';
import AERecommendationPage from './pages/AERecommendationPage';

import { useState } from 'react';
import NotifyPage from './pages/NotifyPage';
import ReviewerQueuePage from './pages/ReviewerQueuePage';
import ReviewerDashboard from './pages/ReviewerDashboard';
import ProposalHistory from './pages/ProposalHistory';
import SubmitReviewPage from './pages/SubmitReviewPage';
import AEQueuePage from './pages/AEQueuePage';
import AEFinalRecommendationPage from './pages/AEFinalRecommendationPage';
import AEHistoryPage from './pages/AEHistoryPage';
import UpdateCurriculumPage from './pages/UpdateCurriculumPage';
import AERevisionResponsePage from './pages/AERevisionResponsePage';

import EICDecisionPage from './pages/EICDecisionPage';
import EICDecisionDetailPage from './pages/EICDecisionDetailPage';
import EICSingleDecisionPage from './pages/EICSingleDecisionPage';
import EICCurriculumReviewPage from './pages/EICCurriculumReviewPage';
import EICBoardReviewPage from './pages/EICBoardReviewPage';
import EICFinalizePage from './pages/EICFinalizePage';
import EICHistoryPage from './pages/EICHistoryPage';
import EICApproveVersionPage from './pages/EICApproveVersionPage.jsx';

import ApprovedCurriculaPage from './pages/as/ApprovedCurriculaPage';
import AEDeskRejectPage from './pages/AEDeskRejectPage';
import NotifyCurriculumChangePage from './pages/as/NotifyCurriculumChangePage';

import LogicalModelPage from './pages/data/LogicalModelPage';
import DataDictionaryPage from './pages/data/DataDictionaryPage';

function App() {
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cm/register" element={<CommunityMemberRegisterPage />} />
        <Route path="/editor/register" element={<EditorRegisterPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/pc/submit" element={<ProposedChangeFormPage />} />

        <Route path="/proposal/:proposalId/recommendation" element={<RecommendationPage />} />
        <Route path="/" element={<h1>LiveC is Running</h1>} />
        {/* <Route path='/auth' element={<AuthPage />} /> */}
        {/* <Route path='/curriculum/:slug' element={<CurriculumDetailsPage selectedCurriculum={selectedCurriculum} />} /> */}
        <Route path="/proposal/:proposalId/recommend" element={<AERecommendationPage />} />
        <Route path="/notify" element={<NotifyPage />} />
        <Route path="/reviewer/queue" element={<ReviewerQueuePage />} />
        <Route path="/reviewer/dashboard" element={<ReviewerDashboard />} />
        <Route path="/proposal/:proposalId/history" element={<ProposalHistory />} />
        <Route path="/review/:proposalId/:reviewerId/submit" element={<SubmitReviewPage />} />
        <Route path="/ae/queue" element={<AEQueuePage />} />
        <Route path="/proposal/:proposalId/final-recommendation/:aeId" element={<AEFinalRecommendationPage />} />
        
        <Route path="/ae/finalize/:proposalId" element={<AEFinalRecommendationPage />} />
        <Route path="/ae/:aeId/history" element={<AEHistoryPage aeId="ae123" />} />
        
        <Route path="/curriculum/update/:segmentId" element={<UpdateCurriculumPage />} />
        
        <Route path="/proposal/:proposalId/respond-revision" element={<AERevisionResponsePage />} />
        <Route path="/proposal/:proposalId/desk-reject" element={<AEDeskRejectPage aeId="ae123" />} />
        
        <Route path="/eic/decisions" element={<EICDecisionPage />} />
        <Route path="/eic/decision/:proposalId" element={<EICDecisionDetailPage />} />
        <Route path="/eic/decision/:id" element={<EICSingleDecisionPage />} />
        <Route path="/eic/curriculum-review" element={<EICCurriculumReviewPage />} />
        <Route path="/eic/board/review" element={<EICBoardReviewPage />} />
        <Route path="/eic/finalize" element={<EICFinalizePage />} />
        <Route path="/eic/history" element={<EICHistoryPage />} />
        <Route path="/eic/approve-version" element={<EICApproveVersionPage />} />
        
        <Route path="/as/approved-curricula" element={<ApprovedCurriculaPage />} />
        <Route path="/as/approved" element={<ApprovedCurriculaPage />} />
        <Route path="/as/notify-change" element={<NotifyCurriculumChangePage />} />

        
        <Route path="/data-model" element={<LogicalModelPage />} />
        <Route path="/data/dictionary" element={<DataDictionaryPage />} />
        <Route path="/data-model/dictionary" element={<DataDictionaryPage />} />

      </Routes>
    </Router>
  );
}

export default App;
=======
import './App.scss'
// import '@styles/index.scss'

import UserProvider from '@context/UserProvider';
import AppRoutes from './routes/AppRoutes';

import Header from '@components/Header';

export default function App() {
	return (
		<>
			<UserProvider>
				<Header />
				<main>
					<AppRoutes />
				</main>
			</UserProvider>
		</>
	)
}


>>>>>>> d9e87d89328cfce6dc78c60f4a89365fb677ca03
