import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { AppRoutes } from './routes/routes';

export default function App() {
  const { themeStyle } = useTheme();

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between transition-colors 
         duration-500 bg-(--bg) text-(--text) bg-grid" style={themeStyle}>
      <Header />
      <main className="flex-1 flex flex-col">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}