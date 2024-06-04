import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function AddDrawer({ addUser, editUser, updateUser }) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (editUser) {
      setOpen(true);
      formik.setValues({
        name: editUser.name,
        username: editUser.username,
        email: editUser.email,
      });
    }
  }, [editUser]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    if (!newOpen) formik.resetForm();
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmSubmit = () => {
    formik.submitForm();
    setDialogOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, "minimum length should be 2").required("First name is required"),
      username: Yup.string().min(2, "minimum length should be 2").required("Last name is required"),
      email: Yup.string().email('Invalid email address').required("Please enter your email"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editUser) {
          const res = await axios.put(`http://jsonplaceholder.typicode.com/users/${editUser.id}`, {
            name: values.name,
            username: values.username,
            email: values.email,
          });
          const updatedUser = res.data;
          updateUser({
            id: updatedUser.id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
          });
        } else {
          const res = await axios.post('http://jsonplaceholder.typicode.com/users', {
            name: values.name,
            username: values.username,
            email: values.email,
            userid: 1,
          });
          const newUser = res.data;
          addUser({
            id: newUser.id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setOpen(false); 
      resetForm(); 
    },
  });

  const DrawerList = (
    <Box sx={{ width: 250, padding: 2 }} role="presentation">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDialogOpen();
        }}
      >
        <TextField
          label="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          margin="normal"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          label="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          margin="normal"
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          label="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          margin="normal"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Add
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to submit the form?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
