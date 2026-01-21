import { SessionProvider } from './context/SessionContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <SessionProvider>
      <AppRoutes />
    </SessionProvider>
  );
}

export default App