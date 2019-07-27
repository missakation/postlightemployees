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
        margin: theme.spacing(1)
    },
    sectionpic: {
        margin: theme.spacing(1)
    }

}));
export default function Employees() {


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
            name: "test",
            jobtitle: "test"
        }

        axios.post("http://localhost:3000/api/employees", obj, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzkzNjk5MGY5NTYxNTlhOGZiYTdlNiIsImlhdCI6MTU2NDAzMDYxNywiZXhwIjoxNTY1MzI2NjE3fQ.jxURqxT_UKGaDH1k92WY74Pa5UvYFUFpYIaUUuAZLuY'
            }
        }).then(res => {
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
        <div>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    id="employee-name"
                    label="Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="normal"
                />
                <TextField
                    id="employee-jobtitle"
                    label="Job Title"
                    className={classes.textField}
                    value={values.jobTitle}
                    onChange={handleChange('jobtitle')}
                    margin="normal"
                />
                <TextField
                    id="employee-department"
                    label="Department"
                    className={classes.textField}
                    value={values.department}
                    onChange={handleChange('department')}
                    margin="normal"
                />
                <TextField
                    id="employee-city"
                    label="City"
                    className={classes.textField}
                    value={values.city}
                    onChange={handleChange('city')}
                    margin="normal"
                />
                <TextField
                    id="employee-address"
                    label="Address"
                    className={classes.textField}
                    value={values.address}
                    onChange={handleChange('address')}
                    margin="normal"
                />

                <div className={classes.sectionpic}>
                    <h5>
                        Profile Image
                </h5>

                    <input type="file" name="file" onChange={(e) => onChangeImage(e)} />
                </div>

                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Primary
                </Button>



            </form>
        </div>
    )
}