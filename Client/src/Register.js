import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { authenticationService } from "./_services";
import { navigate } from "@reach/router";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop:50,
    paddingBottom:50,
    paddingLeft:30,
    paddingRight:30,
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'lightgrey'
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
    margin: theme.spacing(1),
    marginTop: 16
  },
  sectionpic: {
    margin: theme.spacing(1)
  }
}));

export default function Register() {

  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    password: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    authenticationService.register(values.name, values.password)
      .then(res => {
        authenticationService.setUser(res);
        navigate("/employees");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const openLoginPage = () => {
    navigate("/login");
  }

  return (
    <div className="login-form">
      <form className={classes.container} onSubmit={handleSubmit}>
      <h2>Postlight</h2>
        <TextField
          id="username"
          label="Username"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          type="password"
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Register
        </Button>

        <a onClick={openLoginPage}>Already have an account?</a>

      </form>
    </div>
  );
}
