import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LivePractice } from './components/LivePractice';
import { ProgressPage } from './components/ProgressPage';
import { PlacementTest } from './components/PlacementTest';
import { PhraseNotebook } from './components/PhraseNotebook';
import { HomePage } from './components/HomePage';
import { PlansPage } from './components/PlansPage';
import { IELTSPage } from './components/IELTSPage';
import { AboutPage } from './components/AboutPage';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import { SupportPage } from './components/SupportPage';
import { RoleBasedAdminDashboard } from './components/RoleBasedAdminDashboard';
import { UserProgressTracking } from './components/UserProgressTracking';
import { UserSubscriptionManagement } from './components/UserSubscriptionManagement';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<'super-admin' | 'admin' | 'accountant' | 'support'>('super-admin');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
  <BrowserRouter>
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/live" element={<LivePractice />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/placement" element={<PlacementTest />} />
          <Route path="/my-dictionary" element={<PhraseNotebook />} />
          <Route path="/ielts" element={<IELTSPage />} />
          
          {/* Protected admin routes */}
          <Route path="/admin" element={isAdmin ? <RoleBasedAdminDashboard userRole={userRole} setUserRole={setUserRole} /> : <Navigate to="/" />} />
          <Route path="/user-progress" element={isAdmin ? <UserProgressTracking /> : <Navigate to="/" />} />
          <Route path="/subscription-management" element={isAdmin ? <UserSubscriptionManagement /> : <Navigate to="/" />} />
        </Routes>
      </main>
      
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  </BrowserRouter>
</LanguageProvider>
    // <LanguageProvider>
    //   <div className="min-h-screen bg-background">
    //     <Header 
    //       currentPage={currentPage} 
    //       onNavigate={handleNavigate}
    //       isLoggedIn={isLoggedIn}
    //       setIsLoggedIn={setIsLoggedIn}
    //       isAdmin={isAdmin}
    //       setIsAdmin={setIsAdmin}
    //     />
        
    //     <main>
    //       {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
    //       {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
    //       {currentPage === 'blog' && <BlogPage onNavigate={handleNavigate} />}
    //       {currentPage === 'contact' && <ContactPage />}
    //       {currentPage === 'support' && <SupportPage onNavigate={handleNavigate} />}
    //       {currentPage === 'plans' && <PlansPage />}
    //       {currentPage === 'live' && <LivePractice />}
    //       {currentPage === 'progress' && <ProgressPage />}
    //       {currentPage === 'placement' && <PlacementTest />}
    //       {currentPage === 'my-dictionary' && <PhraseNotebook />}
    //       {currentPage === 'ielts' && <IELTSPage onNavigate={handleNavigate} />}
    //       {currentPage === 'admin' && isAdmin && (
    //         <RoleBasedAdminDashboard 
    //           onNavigate={handleNavigate} 
    //           userRole={userRole}
    //           setUserRole={setUserRole}
    //         />
    //       )}
    //       {currentPage === 'user-progress' && isAdmin && (
    //         <UserProgressTracking onNavigate={handleNavigate} />
    //       )}
    //       {currentPage === 'subscription-management' && isAdmin && (
    //         <UserSubscriptionManagement onNavigate={handleNavigate} />
    //       )}
    //     </main>
        
    //     <Footer 
    //       onNavigate={handleNavigate} 
    //       currentPage={currentPage}
    //       isLoggedIn={isLoggedIn}
    //     />
    //   </div>
    // </LanguageProvider>
  );
}