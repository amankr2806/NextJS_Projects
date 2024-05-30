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
      try {
        const res = await axios.get(url);
        const data = res.data;
        const list = data.todos;
        setTask(list);
      } catch (error) {
        console.error("Error adding data:", error);
      }
    };
    getTask();
  }, []);

  const addTaskList = (newList) => {
    setTask((task) => [newList, ...task])
  } 

  return (
    <>
      <center>
        <h2>ToDo App</h2>
        <p>NOTE:- New task added cannot be Updated or deleted</p>
      </center>
      <div className="addTask">
        <InputBox newData={addTaskList} />
      </div>
      <TodoList list={task} setTask={setTask} />
      <div className="list1">
        <SignOutButton />
      </div>
    </>
  );
};

export default HomePage;
