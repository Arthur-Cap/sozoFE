import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import AppRoutes from './routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='lg:h-full'>
        <AppRoutes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
