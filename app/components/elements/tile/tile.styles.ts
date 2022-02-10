import theme from "styles/default";

export const TileStyles: any = {
  display: "flex",
  minHeight: "400px",
  maxWidth: "600px",
  borderColor: theme.palette.primary[600],
  backgroundColor: "white",
  borderRadius: "12px",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    borderColor: theme.palette.primary[400],
  },
};
