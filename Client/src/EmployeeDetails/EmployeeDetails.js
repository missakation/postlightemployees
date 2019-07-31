import React, { useState, useEffect } from "react";

//MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";

import { navigate } from "@reach/router";
import { employeeService } from "../_services";

import defaultPic from "../assets/default.png";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  root: {
    flexGrow: 1,
    marginLeft: theme.spacing(3)
  },
  textField: {
    width: 400,
    marginRight: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(3),
    width: 120
  },
  sectionpic: {
    margin: theme.spacing(3)
  },
  employeepic: {
    height: 200,
    width: 400,
    marginTop: theme.spacing(2),
    objectFit: "contain"
  },
  removeLink: {
    marginTop: theme.spacing(1),
    color: "Firebrick"
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

  const [imageUrl, setImageUrl] = useState(defaultPic); //PUT DETAULT URL FOR FUTURE CASE
  const [imageFile, setImageFile] = useState(null);
  const isEditMode = props.employeeId != undefined || props.employeeId != null;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [open, setOpen] = React.useState(false);
  const [spacing, setSpacing] = React.useState(2);

  const handleSubmit = event => {
    event.preventDefault();

    var obj = {
      name: values.name,
      jobtitle: values.jobtitle,
      department: values.department,
      city: values.city,
      address: values.address
    };

    if (validateObj && imageUrl != defaultPic) {
      var apiRun = isEditMode
        ? employeeService.update(props.employeeId, obj, imageFile)
        : employeeService.create(obj, imageFile);
      apiRun
        .then(res => {
          setOpen(true);
          navigate("/employees");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert("Missing Fields");
    }
  };

  const validateObj = obj => {
    return (
      obj.name.trim() != "" &&
      obj.jobtitle.trim() != "" &&
      obj.department.trim() != "" &&
      obj.city.trim() != "" &&
      obj.address.trim() != ""
    );
  };

  const onChangeImage = e => {
    let files = e.target.files;

    if (files.length > 0) {
      setImageFile(files[0]);

      let arr = e.target.files[0].name.split(".");
      let FileExtension = arr[arr.length - 1].toLowerCase();
      let isExtensionValid =
        FileExtension == "png" ||
        FileExtension == "jpg" ||
        FileExtension == "jpeg";
      if (isExtensionValid) {
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = e => {
          setImageUrl(e.target.result);
        };
      }
    }
  };

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  function removePic() {
    setImageUrl(defaultPic);
  }

  useEffect(() => {
    var employeeId = props.employeeId;
    if (employeeId != null && employeeId != undefined) {
      employeeService
        .getById(employeeId)
        .then(res => {
          setValues(res.data.data);
          setImageUrl(res.data.data.mediaUrlFull);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="page">
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container className={classes.root} spacing={2}>
          <Grid item md={6} xs={12}>
            <h4>Customer Details</h4>
            <div className="frm-employee">
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

              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                ContentProps={{
                  "aria-describedby": "message-id"
                }}
                message={
                  <span id="message-id">Employee Saved Successfully</span>
                }
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div>
              <h4>Profile Image</h4>
              <input type="file" name="file" onChange={e => onChangeImage(e)} />
              {imageUrl != defaultPic && (
                <div className={classes.removeLink}>
                  <a onClick={removePic}>Remove Picture</a>
                </div>
              )}
              <div>
                <img className={classes.employeepic} src={imageUrl}></img>
              </div>
            </div>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
