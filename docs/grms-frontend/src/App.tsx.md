# grms-frontend/src/App.tsx

> **Source File:** [grms-frontend/src/App.tsx](https://github.com/test-company-prowiz/Easy-Repo/blob/master/grms-frontend/src/App.tsx)
> **Repository:** `Easy-Repo`
> **Branch:** `master`

# grms-frontend/src/App.tsx

### Overview
This file defines the root component of the React application, `App`. Its primary purpose is to establish client-side routing using `react-router-dom` and configure global state management for data fetching via `@tanstack/react-query`.

### Architecture & Role
`App.tsx` serves as the entry point and top-level orchestrator for the frontend application's user interface. Architecturally, it resides in the presentation layer, specifically as the main application shell that dictates how different views are rendered based on the URL and manages global data fetching capabilities.

### Key Components
*   **`App` function**: The main React functional component that encapsulates the application's structure.
*   **`QueryClient`**: An instance from `@tanstack/react-query` responsible for managing server state, including data caching and invalidation.
*   **`QueryClientProvider`**: A context provider that makes the `QueryClient` instance available to all descendant components.
*   **`BrowserRouter as Router`**: The top-level component from `react-router-dom` that enables client-side routing.
*   **`Routes`**: A component that groups individual `Route` definitions.
*   **`Route`**: Defines a mapping between a URL path and the component to render.
*   **`ProtectedRoutes`**: A custom component designed to wrap other routes, enforcing authentication or authorization checks before rendering its children.
*   **`Login`**: Component for user authentication.
*   **`Home`**: The application's landing page component.
*   **`DashBoard`**: A component representing a user dashboard, accessible only through `ProtectedRoutes`.

### Execution Flow / Behavior
Upon application startup, the `App` component initializes a `QueryClient` instance. This client is then provided globally via `QueryClientProvider`. Concurrently, `BrowserRouter` is set up to manage URL changes without full page reloads.

The `Routes` component evaluates the current URL path against defined `Route` elements:
*   A request to `/` renders the `Home` component.
*   A request to `/login` renders the `Login` component.
*   A request to `/dashboard` is first handled by the `ProtectedRoutes` component. If `ProtectedRoutes` determines access is permitted (e.g., user is authenticated), it then renders the `DashBoard` component. Otherwise, `ProtectedRoutes` is expected to redirect or block access.

### Dependencies
*   **`react-router-dom`**: External library for declarative client-side routing.
*   **`@tanstack/react-query`**: External library for server state management (data fetching, caching, synchronization).
*   **`./components/AuthComponents/Login`**: Internal component for user login.
*   **`./components/HomeComponents/Home`**: Internal component for the application's home page.
*   **`./components/DashBoard`**: Internal component for the user dashboard.
*   **`./ProtectedRoutes/ProtectedRoutes`**: Internal component for enforcing route protection.

### Design Notes
*   Centralized routing configuration in `App.tsx` provides a clear overview of the application's navigation structure.
*   The use of `QueryClientProvider` at the root ensures that data fetching and caching capabilities are available throughout the entire application, promoting consistent data management.
*   The `ProtectedRoutes` component abstracts authentication logic away from individual route definitions, enhancing modularity and reusability for protected areas of the application.
*   The nested `Route` structure within `ProtectedRoutes` is a standard pattern for implementing layout and access control wrappers.

### Diagram
```mermaid
graph TD
App --> QueryClientProvider
App --> BrowserRouter
BrowserRouter --> Routes
Routes --> HomeRoute[Route path="/"]
Routes --> LoginRoute[Route path="/login"]
Routes --> ProtectedRoutesWrapper[Route element=ProtectedRoutes]
HomeRoute --> HomeComponent[Home Component]
LoginRoute --> LoginComponent[Login Component]
ProtectedRoutesWrapper --> DashboardRoute[Route path="/dashboard"]
DashboardRoute --> DashboardComponent[DashBoard Component]
```