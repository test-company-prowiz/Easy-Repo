# grms-frontend/src/components/Drawers/GetCalendar.tsx

> **Source File:** [grms-frontend/src/components/Drawers/GetCalendar.tsx](https://github.com/test-company-prowiz/Easy-Repo/blob/master/grms-frontend/src/components/Drawers/GetCalendar.tsx)
> **Repository:** `Easy-Repo`
> **Branch:** `master`

# grms-frontend/src/components/Drawers/GetCalendar.tsx

### Overview
This file defines a React functional component, `GetRepoCommitGraphDrawer`, which renders a modal drawer. Its primary function is to display a commit calendar for a selected repository, utilizing the `ContinuousCalendar` component within the drawer body.

### Architecture & Role
This file functions as a presentation layer component within the `grms-frontend` application. Located in the `components/Drawers` directory, it provides a reusable UI element for displaying overlaid content. It interacts with the global `UserStore` to manage its visibility and access the context of the currently selected repository.

### Key Components
- `GetRepoCommitGraphDrawer`: The main React component responsible for rendering the `Drawer` UI.
- `useUserStore`: A custom hook for accessing and modifying global state related to the drawer's visibility (`graphDrawerOpen`, `setGraphDrawerOpen`) and the active repository ID (`treeRepoId`).
- `useDisclosure`: A NextUI hook to manage the open/close state of UI components, although the drawer's visibility is primarily driven by `graphDrawerOpen`.
- `Drawer`, `DrawerContent`, `DrawerHeader`, `DrawerBody`, `DrawerFooter`, `Button`: NextUI components used to construct the drawer's structure and controls.
- `ContinuousCalendar`: An imported custom component that is rendered inside the drawer to display the commit calendar.

### Execution Flow / Behavior
1. The `GetRepoCommitGraphDrawer` component initializes by subscribing to the `graphDrawerOpen` and `treeRepoId` states from `useUserStore`.
2. The `Drawer` component's `isOpen` prop is directly bound to the `graphDrawerOpen` state.
3. When `graphDrawerOpen` is true, the drawer becomes visible on the left side of the screen, styled with a `5xl` size.
4. The `onOpenChange` prop of the `Drawer` triggers `handleOpenChange`. If the drawer is being closed by the user, `setGraphDrawerOpen(false)` is dispatched to update the global `UserStore` state.
5. The `DrawerBody` renders the `ContinuousCalendar` component.
6. The `DrawerFooter` contains "Close" and "Action" buttons. The "Close" button invokes the `onClose` function provided by the `DrawerContent` render prop, which facilitates closing the drawer.

### Dependencies
- **`react`**: Core library for UI development.
- **`@nextui-org/react`**: Provides UI components (e.g., `Drawer`, `Button`) and hooks (`useDisclosure`) for building the drawer.
- **`../../store/UserStore`**: Internal Zustand store for global state management, controlling the drawer's visibility and current repository context.
- **`../../utility/axiosUtils`**: Imported but currently commented out (`useAxios`), indicating that data fetching logic is not active within this component for commit graph data.
- **`../Calendar/Calendar`**: Internal component providing the `ContinuousCalendar` displayed within the drawer.

### Design Notes
- The drawer's visibility is managed via a global state store (`UserStore`), enabling other parts of the application to control its display without direct prop drilling.
- Data fetching for commit graph details (`useAxios` with `useEffect`) is present but entirely commented out. This suggests that the data might be fetched by the `ContinuousCalendar` component itself, or the feature is currently incomplete/deferred in this specific file.
- The `placement` state and `handleOpen` function are declared but not fully integrated into the drawer's current open/close mechanism, which is directly driven by `graphDrawerOpen`. This might be a remnant of previous design iterations or a placeholder for future enhancements.

### Diagram
None significant.