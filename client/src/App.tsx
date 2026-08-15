/* Phosphor Terminal style: single-screen command stream with dark theme, phosphor green signal, and purple interrupt accents. */
import { Route, Switch, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Store from "./pages/Store";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/store" component={Store} />
      <Route component={Home} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router hook={useHashLocation}>
        <AppRoutes />
      </Router>
    </ErrorBoundary>
  );
}
