import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Residents from './pages/Residents';
import ResidentDetail from './pages/ResidentDetail';
import MediaProjects from './pages/MediaProjects';
import MediaProjectDetail from './pages/MediaProjectDetail';
import NewsDetail from './pages/NewsDetail';
import News from './pages/News.jsx';
import Contacts from './pages/Contacts';
import AdminPanel from './pages/admin/AdminPanel';
import AdminNews from './pages/admin/AdminNews';
import AdminResidents from './pages/admin/AdminResidents';
import AdminMedia from './pages/admin/AdminMedia';
import AdminResidentPosts from './pages/admin/AdminResidentPosts';
import AdminMediaPosts from './pages/admin/AdminMediaPosts';
import { AdminAuthProvider } from '@/lib/AdminAuthContext';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/residents" element={<Residents />} />
        <Route path="/residents/:id" element={<ResidentDetail />} />
        <Route path="/media" element={<MediaProjects />} />
        <Route path="/media/:id" element={<MediaProjectDetail />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/news" element={<AdminProtectedRoute><AdminNews /></AdminProtectedRoute>} />
        <Route path="/admin/residents" element={<AdminProtectedRoute><AdminResidents /></AdminProtectedRoute>} />
        <Route path="/admin/media" element={<AdminProtectedRoute><AdminMedia /></AdminProtectedRoute>} />
        <Route path="/admin/residents/:id/posts" element={<AdminProtectedRoute><AdminResidentPosts /></AdminProtectedRoute>} />
        <Route path="/admin/media/:id/posts" element={<AdminProtectedRoute><AdminMediaPosts /></AdminProtectedRoute>} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AdminAuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AppRoutes />
        </Router>
        <Toaster />
        <SonnerToaster position="bottom-right" />
      </QueryClientProvider>
    </AdminAuthProvider>
  );
}

export default App;
