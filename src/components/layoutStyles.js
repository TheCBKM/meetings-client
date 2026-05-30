import { makeStyles } from "@material-ui/core";

export const useLayoutStyles = makeStyles((theme) => ({
  pageContainer: {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
  },
  cardRoot: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    padding: theme.spacing(1.5, 2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.background.paper,
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
  },
}));
