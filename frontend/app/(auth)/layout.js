export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50/50">
      {children}
    </div>
  );
}