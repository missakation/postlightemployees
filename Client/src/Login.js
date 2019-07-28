import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
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
    margin: theme.spacing(1),
    marginTop: 16
  },
  sectionpic: {
    margin: theme.spacing(1)
  }
}));

export default function Login() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "missak",
    password: "missak"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    var obj = {
      email: values.name,
      password: values.password
    };

    axios
      .post("http://localhost:3000/signin", obj)
      .then(res => {
        navigate("/employees");
        localStorage.setItem("postlight-token", res.data.token);

        console.log("done");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="login-form">
      <form className={classes.container} onSubmit={handleSubmit}>
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
          Log in
        </Button>
      </form>
    </div>
  );
}
