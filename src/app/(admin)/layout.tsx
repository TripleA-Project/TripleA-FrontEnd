import AdminNavbar from '@/components/Layout/Navbar/admin/AdminNavbar';
import { ToastContainer } from 'react-toastify';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      {children}
      <AdminNavbar />
      <ToastContainer position="bottom-center" newestOnTop={true} />
    </div>
  );
}
