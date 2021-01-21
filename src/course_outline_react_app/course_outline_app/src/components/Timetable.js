import React, { useState, useEffect } from 'react';
import './App.css';
import { forwardRef } from 'react';

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
  baseURL: `http://localhost:8000/api`
})

function Timetable({selcourse}) {

  var columns = [
    {title: "id", field: "id", hidden: true},
    {title: "course_id", field: "course_id", hidden: true},
    {title: "Instructor Type", field: "instructor_type"},
    {title: "Section", field: "section"},
    {title: "Section Type", field: "section_type"},
    {title: "Days", field: "days"},
    {title: "Time", field: "time"},
    {title: "Location", field: "location"},
    {title: "Hours Per Week", field: "hoursPerWeek"},
    {title: "Students per Instructor", field: "studentsPerInstructor"}
  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => { 
    refresh()
  }, [])

  const refresh = () => {
    // update data
    api.get("/timetables?course_id=" + selcourse)
        .then(res => {               
            setData(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if(newData.instructor_type === ""){
      errorList.push("Please enter instructor type")
    }
    if(newData.section === ""){
      errorList.push("Please enter section name")
    }
    if(newData.section_type === ""){
      errorList.push("Please enter section type")
    }
    if(newData.days === ""){
      errorList.push("Please enter days")
    }
    if(newData.time === ""){
      errorList.push("Please enter time")
    }
    if(newData.location === ""){
      errorList.push("Please enter location")
    }
    if(newData.hoursPerWeek === ""){
      errorList.push("Please enter hours per week")
    }
    if(newData.studentsPerInstructor === ""){
      errorList.push("Please enter students per instructor")
    }

    if(errorList.length < 1){
      api.put("/timetables/" + newData.id, newData)
      .then(res => {
        refresh()
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
    
  }

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    if(newData.instructor_type === undefined){
      errorList.push("Please enter instructor type")
    }
    if(newData.section === undefined){
      errorList.push("Please enter section name")
    }
    if(newData.section_type === undefined){
      errorList.push("Please enter section type")
    }
    if(newData.days === undefined){
      errorList.push("Please enter days")
    }
    if(newData.time === undefined){
      errorList.push("Please enter time")
    }
    if(newData.location === undefined){
      errorList.push("Please enter location")
    }
    if(newData.hoursPerWeek === undefined){
      errorList.push("Please enter hours per week")
    }
    if(newData.studentsPerInstructor === undefined){
      errorList.push("Please enter students per instructor")
    }

    let timetableData = {
      course_id: selcourse,
      component: newData.component,
      learningOutcomes: newData.learningOutcomes,
      weight: newData.weight,
    }

    if(errorList.length < 1){ //no error
      api.post("/timetables", timetableData)
      .then(res => {

        refresh()
        resolve()
        setErrorMessages([])
        setIserror(false)
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }

    
  }

  const handleRowDelete = (oldData, resolve) => {
    
    api.delete("/timetables/" + oldData.id)
      .then(res => {
        refresh()

        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }


  return (
    
    <div className="Timetable">
      <div>
        {iserror && 
          <Alert severity="error">
              {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>
              })}
          </Alert>
        }       
      </div>

      <MaterialTable
        title="List of Timetables"
        columns={columns}
        data={data}
        icons={tableIcons}
        editable={{

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
                
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
            }),
        }}
        options={{
          search: false,
          selection: false,
          showSelectAllCheckbox: false,
        }}
      />
    </div>
  );
}

export default Timetable;