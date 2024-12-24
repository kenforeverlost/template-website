import { Stack } from "@mui/material";

interface ContentProps {
  children?: React.ReactNode;
}

export default function Content(props: ContentProps) {
  const { children } = props;

  return <Stack sx={{ padding: 5, width: "100%" }}>{children}</Stack>;
}
