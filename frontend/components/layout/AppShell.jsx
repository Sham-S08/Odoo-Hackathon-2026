import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppShell({ title, children }) {
  return (
    <div className="flex min-h-screen bg-[#FAFAFE]">
      <Sidebar />
      <div className="flex flex-1 flex-col min-h-screen">
        <Navbar title={title} />
        <main className="flex-1 px-6 py-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}