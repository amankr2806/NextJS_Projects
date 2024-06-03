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
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        age: editUser.age,
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
      firstName: "",
      lastName: "",
      age: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(2, "minimum length should be 2").required("First name is required"),
      lastName: Yup.string().min(2, "minimum length should be 2").required("Last name is required"),
      age: Yup.number()
        .required("Age is required")
        .positive("Age must be a positive number")
        .integer("Age must be an integer"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editUser) {
          const res = await axios.put(`http://dummyjson.com/users/${editUser.id}`, {
            firstName: values.firstName,
            lastName: values.lastName,
            age: values.age,
          });
          const updatedUser = res.data;
          updateUser({
            id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            age: updatedUser.age,
          });
        } else {
          const res = await axios.post('http://dummyjson.com/users/add', {
            firstName: values.firstName,
            lastName: values.lastName,
            age: values.age,
          });
          const newUser = res.data;
          addUser({
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            age: newUser.age,
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
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          margin="normal"
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          margin="normal"
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          margin="normal"
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
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
