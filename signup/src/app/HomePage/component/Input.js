import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";

export default function InputBox({newData}) {
  const [inputData, setInputData] = useState("");

  const date = new Date();
  const seconds = date.getSeconds();

  const getData = (event) => {
    setInputData(event.target.value);
  };

  const addData = async () => {
    if (inputData !== "") {
      try {
        const response = await axios.post(
          "https://dummyjson.com/todos/add",
          {
            todo: inputData,
            completed: false,
            userId: seconds,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Data added successfully:", response.data);
        setInputData("");
        newData(response.data);
      } catch (error) {
        console.error("Error adding data:", error);
      }
    } else {
      alert("Please enter a new task");
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={getData}
          className="inputField"
          id="outlined-basic"
          label="New Task"
          variant="outlined"
          value={inputData}
        />
      </Box>

      <Stack direction="row" spacing={2}>
        <Button
          onClick={addData}
          className="addButton"
          variant="contained"
          color="success"
        >
          Add
        </Button>
      </Stack>
    </>
  );
}
