import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
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
        name: '',
        jobTitle: '',
        department: '',
        city: '',
        address: ''
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = event => {

        event.preventDefault();

        var obj = {
            username: "test",
            password: "test"
        }

        axios.post("http://localhost:3000/login", obj).then(res => {
            console.log("done");
        }).catch(error => {
            console.log(error);
        })
    }

    const onChangeImage = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            const formData = {
                file: e.target.result
            };
        }
    }

    return (
        <div className="login-form">

            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    id="username"
                    label="Username"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="normal"
                />
                <TextField
                    id="password"
                    label="Password"
                    className={classes.textField}
                    value={values.jobTitle}
                    onChange={handleChange('jobtitle')}
                    margin="normal"
                />

                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Log in
                </Button>

            </form>
        </div>
    )
}