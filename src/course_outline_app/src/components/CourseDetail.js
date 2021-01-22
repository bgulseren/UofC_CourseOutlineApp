import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';

import validator from 'validator';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
}));

const api = axios.create({
    baseURL: `http://localhost:8000/api`
  })

function CourseDetail({selcourse}) {
  const classes = useStyles();
  const [data, setData] = useState([]); //original data (from source)
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState(0);
  const [calendar_ref, setCalendar_ref] = useState('');

  const [changedData, setChangedData] = useState(false);

//   {title: "Description", field: "description", hidden: true},
//   {title: "Hours", field: "hours"},
//   {title: "Calendar Reference", field: "calendar_ref", hidden: true},
//   {title: "Grade Breakdown", field: "grade_breakdown", hidden: true},


  useEffect(() => { 
    refresh()
  }, [])

  const refresh = () => {
    // update data
    api.get("/courses/" + selcourse + "/")
        .then(res => {
            setData(res.data)

            setDescription(res.data.description)
            setHours(res.data.hours)
            setCalendar_ref(res.data.calendar_ref)
         })
         .catch(error=>{
             console.log("Error")
         })
         
  }

  const clickSaveHandler = () => {
    api.patch("/courses/" + selcourse + "/", data);

    // make save button invisible again since data is submit to remote
    setChangedData(false);
  };

 /**
 * Course Description Functions
 */

  const handleChangeDescription = (event) => {

    //update new data
    setDescription(event.target.value);
    let copyData = { ...data }
    copyData.description = event.target.value;
    setData(copyData);

    setChangedData(true);

  };

/**
 * Course Hours Functions
 */

  const handleChangeHours = (event) => {

    //update new data
    setHours(event.target.value);
    let copyData = { ...data }
    copyData.hours = event.target.value;
    setData(copyData);

    setChangedData(true);

  };

  const handleChangeCalendarRef = (event) => {

    //update new data
    setCalendar_ref(event.target.value);
    let copyData = { ...data }
    copyData.calendar_ref = event.target.value;
    setData(copyData);

    setChangedData(true);

  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <div>
            <TextField
                id="course-description"
                label="Course Description"
                multiline
                rows={4}
                value={description}
                onChange={handleChangeDescription}
                variant="outlined"
            />
        </div>
      
        <div>
            <TextField
                id="course-hours"
                label="Course Hours"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={hours}
                onChange={handleChangeHours}
                variant="outlined"
            />
        </div>

        <div>
            <TextField
                id="calendar-reference"
                label="Calendar Reference"
                value={calendar_ref}
                onChange={handleChangeCalendarRef}
                variant="outlined"
            />


            <Button 
                variant="contained"
                color="primary"
                size="small"
                startIcon={<SaveIcon />}
                disabled={!changedData}
                className={classes.button}
                onClick={clickSaveHandler}
                >
                Save
            </Button>
        </div>
    </form>
  );
}

export default CourseDetail;