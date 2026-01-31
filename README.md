# Folder Structure

```
src/
├── assets/         # Static files
├── components/     # Truly global/reusable components
│   ├── ui/         # Base UI primitives (buttons, inputs)
│   └── common/     # Shared business components (Spinners, Modals)
|-- pages           # All pages
├── hooks/          # Global hooks (useAuth, useTheme)
├── layouts/        # Global page wrappers: Main Layout, Auth Layout
├── providers/      # AppProviders, ThemeProvider
├── routes/         # Routing configuration
├── services/       # Global API/Axios instances
├── store/          # State management (Redux/Zustand)
└── utils/          # Pure helper functions
```