import './App.scss';
// import '@styles/index.scss'

import UserProvider from '@context/UserProvider';
import AppRoutes from './routes/AppRoutes';

import Header from '@components/Header';

export default function App() {
    return (
        <>
            <UserProvider>
                <Header />
                <main className="prose prose-base w-full max-w-full">
                    {/* <main > */}
                    <AppRoutes />
                </main>
            </UserProvider>
        </>
    );
}
