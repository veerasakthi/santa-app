import { Snackbar, Alert, AlertColor } from "@mui/material";

const SnackBarCommon = ({
  open,
  status,
  message,
}: {
  open: boolean;
  status: AlertColor | undefined;
  message: string;
}) => {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert severity={status} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackBarCommon;
