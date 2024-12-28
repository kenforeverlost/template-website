import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

interface CustomFormControlProps {
  children?: React.ReactNode;
  label: string;
  type: string;
  inputValue: string;
  inputError: boolean;
  inputErrorMessage: string;
  placeholder: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomFormControl(props: CustomFormControlProps) {
  const {
    label,
    type,
    inputValue,
    inputError,
    inputErrorMessage,
    placeholder,
    handleOnChange
  } = props;
  return (
    <FormControl>
      <FormLabel htmlFor={type}>{label}</FormLabel>
      <TextField
        autoComplete={type}
        name={type}
        required
        fullWidth
        id={type}
        placeholder={placeholder}
        error={inputError}
        helperText={inputErrorMessage}
        color={inputError ? "error" : "primary"}
        value={inputValue}
        onChange={handleOnChange}
      />
    </FormControl>
  );
}
