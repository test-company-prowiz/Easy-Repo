# Easy-Repo — Repository Overview

### High-Level Purpose
The Easy-Repo system provides a web-based platform for managing GitHub repositories. Its primary objective is to offer a user interface for repository interactions, insights, and organization through features like a command-line interface, commit calendars, lines of code statistics, and custom collections.

### Architectural Structure
The repository employs a client-server architecture:
*   **`Github-Repository-Management/`**: Hosts the backend application, implemented in Java with Spring Boot.
*   **`grms-frontend/`**: Contains the single-page application (SPA) frontend, built with React and TypeScript.
    *   `src/components/`: Groups modular UI components by feature (e.g., `AuthComponents`, `CLI`, `CollectionsComponents`, `Drawers`, `Calendar`, `Navbar`).
    *   `src/ProtectedRoutes/`: Manages client-side route protection logic.
    *   `src/store/`: Centralizes global state management using Zustand.
    *   `src/utility/`: Contains custom hooks and utility functions for common tasks, such as Axios requests.

### Core Components
*   **`GithubRepositoryManagementApplication`**: The Spring Boot backend context, responsible for handling API requests and business logic.
*   **`App` (Frontend)**: The root React component, orchestrating client-side routing, global data fetching via `@tanstack/react-query`, and the top-level application layout.
*   **`Login`**: Frontend component managing user authentication, primarily through GitHub OAuth.
*   **`ProtectedRoutes`**: A frontend route guard enforcing authentication checks for restricted UI sections.
*   **`CLIMain`**: The central frontend component facilitating command-line interaction with the backend, dynamically rendering drawers or redirecting based on command output.
*   **`CollectionsMain` & `CollectionsPopUp`**: Frontend components for displaying and creating user-defined repository collections.
*   **Drawer Components (e.g., `GetTreeDrawer`, `GetRepoCommitGraphDrawer`, `GetLinesOfCodeDrawer`)**: Reusable UI components displaying repository-specific data (file trees, commit graphs, LOC statistics) in an overlaid drawer format.
*   **`ContinuousCalendar`**: A frontend component for visualizing commit activity across a scrollable, year-long calendar.
*   **`UserStore` (Zustand)**: A global state management store used across the frontend for sharing UI state and context (e.g., drawer visibility, selected repository ID).

### Interaction & Data Flow
1.  A client browser requests `index.html`, which bootstraps the React application via `main.tsx`.
2.  The `App` component initializes client-side routing (`react-router-dom`) and global data fetching context (`@tanstack/react-query`).
3.  For authentication, the `Login` component redirects the user to the backend's GitHub OAuth authorization endpoint.
4.  Subsequent protected routes are guarded by `ProtectedRoutes`, which checks an `authenticated` flag in `sessionStorage`.
5.  Frontend components (e.g., `CLIMain`, `CollectionsMain`, `GetTreeDrawer`, `GetLinesOfCodeDrawer`) make asynchronous HTTP requests to the Java Spring Boot backend API using `axios` or custom `useAxios` hooks. These requests often include authentication cookies and CSRF tokens.
6.  The backend processes these requests, potentially interacting with external services like the GitHub API for repository data, and returns responses.
7.  The frontend then processes backend responses, updates global state (`UserStore`), and dynamically renders UI elements such as drawers or performs client-side redirects.

### Technology Stack
*   **Frontend**:
    *   **Core**: React, TypeScript, Vite
    *   **UI Framework**: `@nextui-org/react`, Tailwind CSS
    *   **Routing**: `react-router-dom`
    *   **State Management**: Zustand (`useUserStore`)
    *   **Data Fetching**: `@tanstack/react-query`, Axios
    *   **Icons**: `@iconify/react`, `react-icons/bs`
*   **Backend**:
    *   **Language**: Java
    *   **Framework**: Spring Boot
    *   **Testing**: JUnit 5

### Design Observations
*   The frontend uses a modern, component-based approach with React and a utility-first CSS framework (Tailwind CSS) for consistent styling.
*   Global state is managed effectively using Zustand, allowing components to share and react to changes in application state.
*   Authentication relies on client-side `sessionStorage` for route protection; a more robust approach would involve server-side token validation for critical paths.
*   The `CLIMain` component's tight coupling to string parsing from backend responses for UI logic introduces potential fragility and maintenance overhead if API response formats change.
*   Page reloads for actions like collection creation could be optimized for a smoother user experience by directly updating the frontend state.
*   Custom Axios hooks abstract API calls, promoting reusability and separating concerns.

### System Diagram
```mermaid
graph TD
Browser --> FrontendSPA[FrontendSPA]
FrontendSPA --> Router[ReactRouterDOM]
Router --> LoginRoute[LoginRoute]
LoginRoute --> BackendOAuth[BackendGitHubOAuth]
Router --> ProtectedRoutes[ProtectedRoutes]
ProtectedRoutes --> AuthCheck[SessionStorageAuthCheck]
FrontendSPA --> APICalls[AxiosAPICalls]
APICalls --> BackendAPI[BackendAPI]
BackendAPI --> ExternalServices[ExternalServicesE.g.GitHubAPI]
AuthCheck --> FrontendComponents[FrontendComponents]
APICalls --> FrontendComponents
FrontendComponents --> UserStore[UserStoreZustand]
```