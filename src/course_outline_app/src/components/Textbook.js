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

function Textbook({selcourse}) {

  var columns = [
    {title: "id", field: "id", hidden: true},
    {title: "course_id", field: "course_id", hidden: true},
    {title: "Title", field: "title"},
    {title: "Author(s)", field: "authors"},
    {title: "Edition", field: "edition"},
    {title: "Year", field: "year"},
    {title: "Publisher", field: "publisher"},
    {title: "Recommended?", field: "is_recommended"},
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
    api.get("/textbooks?course_id=" + selcourse)
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
    if(newData.title === ""){
      errorList.push("Please enter title")
    }
    if(newData.authors === ""){
      errorList.push("Please enter at least an author")
    }
    if(newData.edition === ""){
      errorList.push("Please enter the edition")
    }
    if(newData.year === ""){
      errorList.push("Please enter year")
    }
    if(newData.publisher === ""){
      errorList.push("Please enter publisher")
    }
    if(newData.is_recommended === ""){
      errorList.push("Please enter recommended")
    }

    if(errorList.length < 1){
      api.put("/textbooks/" + newData.id + "/", newData)
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
    if(newData.title === undefined){
      errorList.push("Please enter title")
    }
    if(newData.authors === undefined){
      errorList.push("Please enter at least an author")
    }
    if(newData.edition === undefined){
      errorList.push("Please enter the edition")
    }
    if(newData.year === undefined){
      errorList.push("Please enter year")
    }
    if(newData.publisher === undefined){
      errorList.push("Please enter publisher")
    }
    if(newData.is_recommended === undefined){
      errorList.push("Please enter recommended")
    }

    let textbookData = {
      course_id: selcourse,
      title: newData.title,
      authors: newData.authors,
      edition: newData.edition,
      year: newData.year,
      publisher: newData.publisher,
      is_recommended: newData.is_recommended,
    }

    if(errorList.length < 1){ //no error
      api.post("/textbooks/", textbookData)
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
    
    api.delete("/textbooks/" + oldData.id + "/")
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
    
    <div className="Textbook">
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
        title="List of Textbooks"
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
          showTitle: false,
        }}
      />
    </div>
  );
}

export default Textbook;