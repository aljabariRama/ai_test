import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context & Layout
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages & Components
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import { SupportPage } from './components/SupportPage';
import { PlansPage } from './components/PlansPage';
import { ProgressPage } from './components/ProgressPage';
import { PlacementTest } from './components/PlacementTest';
import { PhraseNotebook } from './components/PhraseNotebook';
import { IELTSPage } from './components/IELTSPage';

// ✅ Live Practice Import (Updated Path)
// افترضنا أنك وضعت ملف LivePractice.tsx داخل مجلد components/live
import { LivePractice } from './components/LivePractice';

// Admin Components
import { RoleBasedAdminDashboard } from './components/RoleBasedAdminDashboard';
import { UserProgressTracking } from './components/UserProgressTracking';
import { UserSubscriptionManagement } from './components/UserSubscriptionManagement';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<'super-admin' | 'admin' | 'accountant' | 'support'>('super-admin');

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          
          <Header 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn} 
            isAdmin={isAdmin} 
            setIsAdmin={setIsAdmin} 
          />
          
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/ielts" element={<IELTSPage />} />

              {/* Student/User Routes */}
              <Route path="/live" element={<LivePractice />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/placement" element={<PlacementTest />} />
              <Route path="/my-dictionary" element={<PhraseNotebook />} />
              
              {/* Admin Protected Routes */}
              <Route 
                path="/admin" 
                element={isAdmin ? <RoleBasedAdminDashboard userRole={userRole} setUserRole={setUserRole} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/user-progress" 
                element={isAdmin ? <UserProgressTracking /> : <Navigate to="/" />} 
              />
              <Route 
                path="/subscription-management" 
                element={isAdmin ? <UserSubscriptionManagement /> : <Navigate to="/" />} 
              />

              {/* Catch-all route (Optional: 404) */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          <Footer isLoggedIn={isLoggedIn} />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}