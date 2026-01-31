# Folder Structure

src/
├── assets/         # Static files
├── components/     # Truly global/reusable components
│   ├── ui/         # Base UI primitives (buttons, inputs)
│   └── common/     # Shared business components (Spinners, Modals)
├── features/       # Sliced by domain
│   └── dashboard/
│       ├── api/
│       ├── components/
│       └── hooks/
├── hooks/          # Global hooks (useAuth, useTheme)
├── layouts/        # Global page wrappers
├── providers/      # AppProviders, ThemeProvider
├── routes/         # Routing configuration
├── services/       # Global API/Axios instances
├── store/          # State management (Redux/Zustand)
└── utils/          # Pure helper functions