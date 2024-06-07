'use client'
import React from "react";
import Header from "./components/Header";
import DisplayCounter from "./components/displayCounter";
import Button from "./components/Button";
import { Provider } from "react-redux";
import counterStore from "./store";

export default function Home() {
  return (
    <Provider store={counterStore}>
    <Header></Header>
    <DisplayCounter></DisplayCounter>
    <Button></Button>
    </Provider>
  );
}
