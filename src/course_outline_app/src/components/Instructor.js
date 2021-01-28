import React, { useState, useEffect } from 'react'
import './App.css'
import { forwardRef } from 'react'
import Avatar from 'react-avatar'

import Course from './Course'

import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const api = axios.create({
  baseURL: `http://localhost:8000/api`,
})

function validateEmail(email) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/
  return re.test(String(email).toLowerCase())
}

function Instructor() {
  var columns = [
    { title: 'id', field: 'id', hidden: true },
    {
      title: 'Avatar',
      render: (rowData) => (
        <Avatar
          maxInitials={2}
          size={40}
          round={true}
          name={
            rowData === undefined
              ? ' '
              : rowData.first_name[0] + ' ' + rowData.last_name[0]
          }
        />
      ),
    },
    { title: 'First name', field: 'first_name' },
    { title: 'Last name', field: 'last_name' },
    { title: 'Phone', field: 'phone' },
    { title: 'Office', field: 'office' },
    { title: 'email', field: 'email' },
  ]
  const [data, setData] = useState([]) //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const [isactive, setIsactive] = useState(true)
  const [selinstructor, setSelinstructor] = useState(-1)

  const [headermessage, setHeadermessage] = useState(
    'Select an instructor or add a new one if not existing...'
  )

  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    api
      .get('/instructors/')
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.log('Error')
      })
  }

  const selectInstructor = (instructor) => {
    setIsactive(false)
    setHeadermessage(
      'Selected Instructor: ' +
        instructor.first_name +
        ' ' +
        instructor.last_name
    )
    setSelinstructor(instructor.id)
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (newData.first_name === '') {
      errorList.push('Please enter first name')
    }
    if (newData.last_name === '') {
      errorList.push('Please enter last name')
    }
    if (newData.office === '') {
      errorList.push('Please enter office')
    }
    if (newData.phone === '') {
      errorList.push('Please enter phone')
    }
    if (newData.email === '' || validateEmail(newData.email) === false) {
      errorList.push('Please enter a valid email')
    }

    if (errorList.length < 1) {
      api
        .put('/instructors/' + newData.id + '/', newData)
        .then((res) => {
          refresh()
          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch((error) => {
          setErrorMessages(['Update failed! Server error'])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    if (newData.first_name === undefined) {
      errorList.push('Please enter first name')
    }
    if (newData.last_name === undefined) {
      errorList.push('Please enter last name')
    }
    if (newData.office === undefined) {
      errorList.push('Please enter office')
    }
    if (newData.phone === undefined) {
      errorList.push('Please enter phone number')
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push('Please enter a valid email')
    }

    if (errorList.length < 1) {
      //no error
      console.log(newData)
      api
        .post('/instructors/', newData)
        .then((res) => {
          refresh()
          resolve()
          setErrorMessages([])
          setIserror(false)
        })
        .catch((error) => {
          setErrorMessages(['Cannot add data. Server error!'])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }

  const handleRowDelete = (oldData, resolve) => {
    api
      .delete('/instructors/' + oldData.id + '/')
      .then((res) => {
        refresh()
        resolve()
      })
      .catch((error) => {
        setErrorMessages(['Delete failed! Server error'])
        setIserror(true)
        resolve()
      })
  }

  return (
    <div className='Instructor'>
      <div>
        {iserror && (
          <Alert severity='error'>
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>
            })}
          </Alert>
        )}
      </div>
      <h4>{headermessage}</h4>
      {isactive && (
        <MaterialTable
          title='List of Instructors'
          columns={columns}
          data={data}
          icons={tableIcons}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve)
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
            selection: true,
            showSelectAllCheckbox: false,
            showTitle: false,
          }}
          onSelectionChange={(rows) => selectInstructor(rows[0])}
        />
      )}

      {!isactive && (
        <div>
          <Course selinstructor={selinstructor} />
        </div>
      )}
    </div>
  )
}

export default Instructor
