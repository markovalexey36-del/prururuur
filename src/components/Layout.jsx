import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="noise-overlay min-h-screen bg-obsidian font-tight">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}