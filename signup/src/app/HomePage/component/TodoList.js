//"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios"; 
import TextField from "@mui/material/TextField";

const TodoList = ({ list, setTask }) => {

  const deleteData = async (id) => {
    try{
      const res = await axios.delete(`https://dummyjson.com/todos/${id}`);
      const deletedTask = res.data;
      if (deletedTask.isDeleted) {
        setTask((list) => list.filter((task) => task.id !== id));
      } else {
        console.error(`Failed to delete task with id ${id}`);
      }
    } catch (error){
      console.log("Error deleting data:", error);
    }

  };

  return (
    <>
      {list.map((item) => (
        <div className="list2" key={item.id}>
          {<TextField
          className="inputField"
          id="outlined-basic"
          label="Added Task"
          variant="outlined"
          value={item.todo}
        />}
          <div className="button">
            <Stack direction="row" spacing={2}>
              <Button  variant="outlined">Update</Button>
              <Button onClick={() => deleteData(item.id)} variant="outlined" color="error">
                Delete
              </Button>
            </Stack>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
