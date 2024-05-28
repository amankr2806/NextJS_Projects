import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleOnSignOut = (event) => {
    localStorage.removeItem("LoggedIn");
    router.push("/");
  };

  return (
    <>
      <Stack spacing={2} direction="row">
        <Button onClick={handleOnSignOut} type="button" variant="outlined">
          Sign Out
        </Button>
      </Stack>
    </>
  );
}
