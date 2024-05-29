//"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const TodoList = ({ list }) => {
  return (
    <>
      {list.map((item) => (
        <div className="list2" key={item.id}>
          {item.todo}
          <div className="button">
            <Stack direction="row" spacing={2}>
              <Button variant="outlined">Update</Button>
              <Button variant="outlined" color="error">
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
