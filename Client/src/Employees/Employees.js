import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

//DIALOG IMPORTS
import { navigate } from "@reach/router";
import { employeeService } from '../_services'

const employeeStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  },
  addicon: {
    fontSize: 30
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

function TablePaginationActions(props) {
  const classes = employeeStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
            <KeyboardArrowLeft />
          )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
            <KeyboardArrowRight />
          )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
}));

function Welcome(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(1);
  const [countEmployees, setCountEmployees] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [employees, setEmployees] = useState([]);
  const [searchCriteria, setSarchCriteria] = useState("");

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, employees.length - page * rowsPerPage);

  useEffect(() => {
    getEmployees();
  }, [searchCriteria, rowsPerPage]);

  function handleChangePage(event, newPage) {
    setPage(newPage);
    getEmployees();
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  }

  function updateCriteria(event) {
    setSarchCriteria(event.target.value);
  }

  function openAddEmployeePage(event) {
    navigate("/employees/create");
  }

  function getEmployees() {

    employeeService.get(page, rowsPerPage, searchCriteria).then(res => {

      if (res.data != null && res.data != undefined) {
        setEmployees(res.data.data);
        setCountEmployees(res.data.pages.count);
      }


    }).catch(error => { });

  }

  function editEmployee(employee) {
    navigate(`/employees/${employee._id}`);
  }

  function deleteEmployee(employee) {

    employeeService.delete(employee._id).then(res => {
      getEmployees();
    }).catch(error => { });

  }

  return (
    <div className="page">
      <div className="emp-sec-options">
        <TextField
          id="outlined-search"
          label="Search Employee"
          type="search"
          className={classes.textField}
          onChange={updateCriteria}
          margin="normal"
          variant="outlined"
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={openAddEmployeePage}
        >
          Add Employee
          <AddIcon className={classes.rightIcon} />
        </Button>
      </div>

      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="left">Department</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => ( */}
              {employees.map(row => (
                <TableRow key={row.name}>
                  <TableCell></TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.jobtitle}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.department}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        editEmployee(row);
                      }}
                    // onClick={handleFirstPageButtonClick}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => deleteEmployee(row)}
                    // onClick={handleFirstPageButtonClick}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 0 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  colSpan={6}
                  count={countEmployees}
                  rowsPerPage={rowsPerPage}
                  page={page-1}
                  SelectProps={{
                    inputProps: { "aria-label": "employees per page" },
                    native: true
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    </div>
  );
}

export default Welcome;
