import AdminHeader from '@/components/Layout/Header/adminHeader';
import AdminNavbar from '@/components/Layout/Navbar/admin/AdminNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <AdminHeader />
      {children}
      <AdminNavbar />
    </div>
  );
}
