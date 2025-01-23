import { Box } from "@mui/material";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box className="h-screen flex justify-center items-center">{children}</Box>
  );
}
