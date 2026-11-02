import { AppRouter } from './routes';
import { AppProviders } from './providers';

export function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
