import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ConfirmationDialog = ({ open, title, message, onConfirm, onDismiss }) => {
  return (
    <Dialog open={open} onClose={onDismiss}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button color="primary" variant="contained" onClick={onConfirm}>
          Delete
        </Button>
        <Button onClick={onDismiss}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

const ConfirmationDialogContext = React.createContext({});

const ConfirmationDialogProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogConfig, setDialogConfig] = React.useState({});

  const openDialog = ({ title, message, actionCallback }) => {
    console.log('openDialog -> setDialogOpen', setDialogOpen)
    console.log('openDialog -> dialogOpen', dialogOpen)
    setDialogOpen(true);
    setDialogConfig({ title, message, actionCallback });
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setDialogConfig({});
  };

  const onConfirm = () => {
    resetDialog();
    //@ts-ignore
    dialogConfig.actionCallback(true);
  };

  const onDismiss = () => {
    resetDialog();
    //@ts-ignore
    dialogConfig.actionCallback(false);
  };

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      <ConfirmationDialog
        open={dialogOpen}
        //@ts-ignore
        title={dialogConfig?.title}
        //@ts-ignore
        message={dialogConfig?.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

const useConfirmationDialog = () => {
  //@ts-ignore
  const { openDialog } = React.useContext(ConfirmationDialogContext);

  const getConfirmation = ({ ...options }) =>
    new Promise((res) => {
      openDialog({ actionCallback: res, ...options });
    });

  return { getConfirmation };
};

export default ConfirmationDialog;
export { ConfirmationDialogProvider, useConfirmationDialog };
