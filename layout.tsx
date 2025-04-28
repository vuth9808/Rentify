import NavBar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
           
            <main>{children}</main>
          
        </div>
    );
}