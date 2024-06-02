import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleOnSignOut = () => {
    localStorage.removeItem("LoggedIn");
    router.push("/");
  };

  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button className="signout" onClick={handleOnSignOut} type="button" variant="contained">
          Sign Out
        </Button>
      </Stack>
    </div>
  );
}
