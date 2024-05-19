import { Posts } from './Posts';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Really simple process when using react-query
// 1. install via npm install @tanstack/react-query
// 2. import it into the main entry point of any project
// 3. we then set up the client (we can configure when need but we'll leave the defaults for this simple project)
// 4. we pass it as a prop, which then makes react-query and it's hooks available to all the children
// 5. the children are anything that is wrapped by our provider, which we can then call as we wish

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <h1>Blog w/ React Query and JSONPlaceholder</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
