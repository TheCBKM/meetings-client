import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffae00",
      light: "#ffc233",
      dark: "#e69d00",
      contrastText: "#fff7e0",
    },
    secondary: {
      main: "#ff0555",
      light: "#ff3d7a",
      dark: "#e0044c",
      contrastText: "#fff7e0",
    },
    success: {
      main: "#059669",
      contrastText: "#fff7e0",
    },
    error: {
      main: "#DC2626",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#fff7e0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#3d2e0a",
      secondary: "#6b5a2e",
    },
    divider: "rgba(255, 174, 0, 0.25)",
  },
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#fff7e0",
        },
      },
    },
    MuiAppBar: {
      root: {
        background: "linear-gradient(135deg, #ffae00 0%, #ff8c00 55%, #ff0555 100%)",
        boxShadow: "0 2px 12px rgba(255, 5, 85, 0.2)",
      },
    },
    MuiCard: {
      root: {
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(255, 174, 0, 0.12)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: "0 6px 16px rgba(255, 5, 85, 0.15)",
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: 8,
        padding: "8px 16px",
      },
      containedPrimary: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "0 2px 10px rgba(255, 174, 0, 0.45)",
        },
      },
      containedSecondary: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "0 2px 10px rgba(255, 5, 85, 0.35)",
        },
      },
    },
    MuiTab: {
      root: {
        minHeight: 48,
        fontWeight: 500,
      },
    },
    MuiTabs: {
      indicator: {
        height: 3,
        borderRadius: "3px 3px 0 0",
        backgroundColor: "#fff7e0",
      },
    },
    MuiFab: {
      root: {
        boxShadow: "0 4px 16px rgba(255, 5, 85, 0.45)",
      },
    },
    MuiTextField: {
      root: {
        marginBottom: 8,
      },
    },
    MuiAccordion: {
      root: {
        borderRadius: 12,
        borderLeft: "4px solid #ffae00",
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
          margin: 0,
        },
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: "0 16px",
        minHeight: 56,
      },
    },
    MuiBottomNavigation: {
      root: {
        height: 64,
        backgroundColor: "#fff7e0",
        borderTop: "2px solid rgba(255, 174, 0, 0.35)",
        boxShadow: "0 -2px 12px rgba(255, 174, 0, 0.15)",
      },
    },
    MuiBottomNavigationAction: {
      root: {
        minWidth: 80,
        color: "#6b5a2e",
        "&.Mui-selected": {
          color: "#ff0555",
        },
      },
    },
  },
});

export default theme;
