import * as React from 'react';
import './style.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import BlockIcon from '@mui/icons-material/Block';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import toastr from 'toastr';


const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.light,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

function Body() {
  let [title, setTitle] = React.useState('');
  let [desc, setDesc] = React.useState('');
  const [value, setValue] = React.useState(dayjs());
  let [priority, setPriority] = React.useState('Low');
  let [isComplete, setIsComplete] = React.useState(false);
  let [toDo, setToDo] = React.useState([]);
  let [open, setOpen] = React.useState(false);
  let [titleValidation, setTitleValidation] = React.useState('');
  let [descValidation, setDescValidation] =
    React.useState('');
  let [index, setIndex] = React.useState(0);
  let [test, setTest] = React.useState('');
  let [update, setUpdate] = React.useState(false);

  let handleClickOpen = (updateButton) => {
    if (updateButton) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
    setOpen(true);
  };

  let handleClose = () => {
    setOpen(false);
  };

  let handleTitleChange = (value) => {
    setTitle(value);
    validateTitle(value);
  };

  let handleDescChange = (value) => {
    setDesc(value);
    validateDesc(value);
  };

  let handleUpdateOpen = (title) => {
    let index = findIndexByTitle(title);
    let task = toDo[index];
    setTitle(title);
    setDesc(task.desc);
    setValue(task.deadline);
    setPriority(task.priority);
  };

  let validateTitle = (value) => {
    // Check for unique title
    if (!value) {
      setTitleValidation('Title is required!');
    } else {
      let index = findIndexByTitle(value);
      if (index < 0) {
        setTitleValidation('');
      } else {
        setTitleValidation('Duplicate title!');
      }
    }
  };

  let validateDesc = (value) => {
    if (!value) {
      setDescValidation('Description is required!');
    } else {
      setDescValidation('');
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  let findIndexByTitle = (title) => {
    const isCorrectTitle = (element) => element.title == title;
    return toDo.findIndex(isCorrectTitle);
  };

  let handleCheckChange = (title) => {
    let index = findIndexByTitle(title);
    // Checked
    if (toDo[index].isComplete) {
      toDo[index].isComplete = false;
      setTest("checked");
    // Unchecked
    } else {
      toDo[index].isComplete = true;
      setTest('unchecked');
    }
  };

  let deleteTasks = (title) => {
    let index = findIndexByTitle(title);
    let temp = toDo;
    temp.splice(index, 1);
    setToDo(temp);
    setTest(index);
  };

  function handleAdd() {
    let submit = true;
    // Title validation
    if (title == '') {
      setTitleValidation('Title is required!');
      submit = false;
    }
    // Desc validation
    if (desc == '') {
      setDescValidatorMessage('Description is required!');
      submit = false;
    }
    if (submit && titleValidation == '') {
      let task = {
        title: title,
        desc: desc,
        deadline: value,
        priority: priority,
        isComplete: false,
        index: index,
      };
      if (update) {
        let index = findIndexByTitle(title);
        toDo[index] = task;
        toastr.success("Task successfully updated!", '', {
          positionClass: 'toast-bottom-right',
        });
      } else {
        toDo.push(task);
        toastr.success(`Task added successfully!`, ``, {
          positionClass: 'toast-bottom-right',
        });
      }
      setTitle('');
      setDesc('');
      setValue(dayjs());
      setPriority('Low');
      setIndex(index + 1);
      handleClose();
    }
  }

  return (
    <div>
      {/* Header */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'center', position: 'relative' }}>
            <MenuIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div">
              FRAMEWORKS
            </Typography>
            <div className="rightPosition">
              {' '}
              <div>
                <AddButton onClick={(e) => handleClickOpen(false)}>
                  <AddCircleIcon fontSize="string" />
                  Add
                </AddButton>
              </div> 
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        {update ? (
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'left', position: 'relative' }}>
            <EditIcon/>
            <Typography variant="h6" component="div">
              Edit Task
            </Typography>
          </Toolbar>
        </AppBar>
        ) : (
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'left', position: 'relative' }}>
            <AddCircleIcon/>
            <Typography variant="h6" component="div">
              Add Task
            </Typography>
          </Toolbar>
        </AppBar>
        )}
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            {update ? (
              <div />
            ) : (
            <TextField
              error={titleValidation}
              helperText={titleValidation}
              margin="normal"
              fullWidth
              required
              id="Title"
              label="Title"
              defaultValue=""
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
            )}
            <TextField
              error={descValidation}
              helperText={descValidation}
              margin="normal"
              fullWidth
              required
              id="Description"
              label="Description"
              defaultValue=""
              value={desc}
              onChange={(e) => handleDescChange(e.target.value)}
            />
            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Deadline"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Box>
            <Box mt={2}>
              <FormControl>
                <FormLabel id="priority">Priority</FormLabel>
                <RadioGroup
                  row
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <FormControlLabel
                    value="Low"
                    control={<Radio />}
                    label="Low"
                  />
                  <FormControlLabel
                    value="Med"
                    control={<Radio />}
                    label="Med"
                  />
                  <FormControlLabel
                    value="High"
                    control={<Radio />}
                    label="High"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          {update ? (
          <Button variant="contained" onClick={handleAdd}>
            <EditIcon sx={{ mr: 1 }} />
            Edit
          </Button>
          ) : (
          <Button variant="contained" onClick={handleAdd}>
            <AddCircleIcon sx={{ mr: 1 }} />
            Add
          </Button>
          )}
          <Button color="error" variant="contained" onClick={handleClose}>
            <BlockIcon sx={{ mr: 1 }} />
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Deadline</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Is Complete</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toDo.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.desc}</TableCell>
                <TableCell align="center">
                  {row.deadline.format('MM/DD/YY')}
                </TableCell>
                <TableCell align="center">{row.priority}</TableCell>
                <TableCell align="center">
                  <input
                    type="checkbox"
                    checked={row.isComplete}
                    onClick={(e) => handleCheckChange(row.title)}
                  ></input>
                </TableCell>
                <TableCell align="center">
                  <Stack spacing={0} direction="column">
                    {!row.isComplete ? (
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          handleClickOpen(true);
                          handleUpdateOpen(row.title);
                        }}
                        id="update"
                      >
                        <i className="fa fa-fw fa-edit"></i>
                        <EditIcon /> &nbsp; Update
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    <Button
                      color="error"
                      variant="contained"
                      onClick={(e) => deleteTasks(row.title)}
                    >
                      <i className="fa fa-fw fa-times-circle"></i>
                      <CancelIcon /> &nbsp;Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Body />
    </div>
  );
}
