import React, { useState, useEffect } from "react";

//MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';

import { navigate } from "@reach/router";
import { employeeService } from '../_services'
import axios from "axios";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  sectionpic: {
    margin: theme.spacing(1)
  }
}));

export default function Employees(props) {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: "",
    jobtitle: "",
    department: "",
    city: "",
    address: ""
  });

  const isEditMode = props.employeeId != undefined || props.employeeId != null;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const [open, setOpen] = React.useState(false);

  const handleSubmit = event => {

    event.preventDefault();

    var obj = {
      name: values.name,
      jobtitle: values.jobtitle,
      department: values.department,
      city: values.city,
      address: values.address
    };

    if (isEditMode) {
      employeeService.update(props.employeeId, obj)
        .then(res => {
          setOpen(true);
          navigate("/employees");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      employeeService.create(obj)
        .then(res => {
          setOpen(true);
          navigate("/employees");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const onChangeImage = e => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = e => {
      const formData = {
        file: e.target.result
      };
    };
  };

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  useEffect(() => {
    var employeeId = props.employeeId;
    if (employeeId != null && employeeId != undefined) {

      employeeService.getById(employeeId)
        .then(res => {
          setValues(res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="page">
      <h5>Customer Details</h5>
      <div className="frm-employee">
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="employee-name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <TextField
            id="employee-jobtitle"
            label="Job Title"
            className={classes.textField}
            value={values.jobtitle}
            onChange={handleChange("jobtitle")}
            margin="normal"
          />
          <TextField
            id="employee-department"
            label="Department"
            className={classes.textField}
            value={values.department}
            onChange={handleChange("department")}
            margin="normal"
          />
          <TextField
            id="employee-city"
            label="City"
            className={classes.textField}
            value={values.city}
            onChange={handleChange("city")}
            margin="normal"
          />
          <TextField
            id="employee-address"
            label="Address"
            className={classes.textField}
            value={values.address}
            onChange={handleChange("address")}
            margin="normal"
          />

          <div className={classes.sectionpic}>
            <h5>Profile Image</h5>
            <input type="file" name="file" onChange={e => onChangeImage(e)} />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Save
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Employee Saved Successfully</span>}
          />
        </form>
      </div>
    </div>
  );
}
