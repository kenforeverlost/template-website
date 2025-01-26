import { Alert, AlertProps, styled } from "@mui/material";

const CustomMuiCard = (props: AlertProps) => {
  return (
    <Alert {...props} sx={{ wordWrap: "break-word" }}>
      {props.children}
    </Alert>
  );
};

export default CustomMuiCard;
