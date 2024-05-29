"use client";
import * as React from "react";
import InputBox from "./component/Input";
import SignOutButton from "./component/SignoutButton";
import TodoList from "./component/TodoList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./page.css";
import axios from "axios";
const HomePage = () => {
  const router = useRouter();

  const [task, setTask] = useState([]);
  
  const url = "https://dummyjson.com/todos";

  useEffect(() => {
    const auth = localStorage.getItem("LoggedIn");
    if (!auth) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const getTask = async () => {
      const res = await axios.get(url);
      const data = res.data;
      const list = data.todos;
      setTask(list);
    };
    getTask();
  }, []);

  return (
    <>
      <center><h2>ToDo App</h2></center>
      <div className="addTask">
        <InputBox />
      </div>
      <TodoList list = {task} />
      <div className="list1">
      <SignOutButton />
      </div>
    </>
  );
};

export default HomePage;
