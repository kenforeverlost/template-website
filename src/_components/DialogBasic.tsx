import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  useMediaQuery
} from "@mui/material/";

import { useTheme } from "@mui/material/styles";

interface DialogBasicProps {
  children?: React.ReactNode;
  title: string;
  cancelText?: string;
  confirmText?: string;
  isOpen: false;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function DialogBasic(props: DialogBasicProps) {
  const {
    children,
    title,
    cancelText,
    confirmText,
    isOpen,
    handleConfirm,
    handleCancel
  } = props;

  const [open, setOpen] = React.useState<boolean>(isOpen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-basic-title"
      >
        <DialogTitle id="dialog-basic-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            {cancelText ? `Cancel` : cancelText}
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            {confirmText ? `Confirm` : confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
