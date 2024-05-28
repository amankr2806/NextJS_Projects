import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function InputBox() {
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
        <TextField className="inputField"  id="outlined-basic" label="Thougts" variant="outlined" />
      </Box>

      <Stack direction="row" spacing={2}>
        <Button className="addButton" variant="contained" color="success">
          Add
        </Button>
        {/* <Button variant="outlined" color="error">
          Error
        </Button> */}
      </Stack>
    </>
  );
}
