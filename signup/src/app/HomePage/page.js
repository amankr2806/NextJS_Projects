"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputBox from "./component/Input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./page.css";

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
      <Stack spacing={2} direction="row">
        <Button onClick={handleOnSignOut} type="button" variant="outlined">
          Sign Out
        </Button>
      </Stack>
      <div className="wrapper">
        <InputBox />
      </div>
    </>
  );
};

export default HomePage;
