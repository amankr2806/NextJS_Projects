"use client";
import * as React from "react";
import InputBox from "./component/Input";
import SignOutButton from "./component/SignoutButton";
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

  return (
    <center>
      <h2>ToDo App</h2>
      
      <div className="wrapper">
        <InputBox />
      </div>
      <SignOutButton />
    </center>
  );
};

export default HomePage;
