"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Header from "./component/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  
  useEffect(() => {
    const auth = localStorage.getItem("LoggedIn");

    if (!auth) {
      router.push("/");
    }
  }, [router]);
  

  const handleOnSignOut = (event) => {
    localStorage.removeItem("LoggedIn");
    router.push("/");
  };
  return (
    <>
      <Header />
      <Stack spacing={2} direction="row">
        <Button onClick={handleOnSignOut} type="button" variant="outlined">
          Sign Out
        </Button>
      </Stack>
    </>
  );
};

export default HomePage;
