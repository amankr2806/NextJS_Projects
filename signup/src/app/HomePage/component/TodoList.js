//"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import TextField from "@mui/material/TextField";

const TodoList = ({ list, setTask }) => {
  const [editId, setEditId] = React.useState(null);
  const [editTodo, setEditTodo] = React.useState("");

  const deleteData = async (id) => {
    try {
      const res = await axios.delete(`https://dummyjson.com/todos/${id}`);
      const deletedTask = res.data;
      if (deletedTask.isDeleted) {
        setTask((list) => list.filter((task) => task.id !== id));
      } else {
        console.error(`Failed to delete task with id ${id}`);
      }
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  const updateData = async (id) => {
    try {
      const response = await axios.put(
        `https://dummyjson.com/todos/${id}`,
        { todo: editTodo },
        { headers: { "Content-Type": "application/json" } }
      );
      const updatedTask = response.data;
      setTask((list) =>
        list.map((task) => (task.id === id ? updatedTask : task))
      );
      setEditId(null);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const startEditing = (id, currentTodo) => {
    setEditId(id);
    setEditTodo(currentTodo);
  };
  return (
    <>
      {list.map((item) => (
        <div className="list2" key={item.id}>
          {editId === item.id ? (
            <TextField
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              variant="outlined"
              size="small"
            />
          ) : (
            item.todo
          )}
          <div className="button">
            <Stack direction="row" spacing={2}>
              {editId === item.id ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateData(item.id)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => startEditing(item.id, item.todo)}
                >
                  Update
                </Button>
              )}
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteData(item.id)}
              >
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
