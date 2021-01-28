import React, { useState, useEffect } from 'react'
import './App.css'
import { forwardRef } from 'react'

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

function Timetable({ selcourse }) {
  var columns = [
    { title: 'id', field: 'id', hidden: true },
    { title: 'course_id', field: 'course_id', hidden: true },
    { title: 'Section', field: 'section' },
    {
      title: 'Section Type',
      field: 'section_type',
      lookup: {
        1: 'Lecture',
        2: 'Tutorial',
        3: 'Lab',
      },
    },
    {
      title: 'Day 1',
      field: 'day1',
      lookup: {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
      },
    },
    {
      title: 'Day 2',
      field: 'day2',
      lookup: {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
      },
    },
    {
      title: 'Start Time',
      field: 'start_time',
      lookup: {
        1: '8:00',
        2: '8:30',
        3: '9:00',
        4: '9:30',
        5: '10:00',
        6: '10:30',
        7: '11:00',
        8: '11:30',
        9: '12:00',
        10: '12:30',
        11: '13:00',
        12: '13:30',
        13: '14:00',
        14: '14:30',
        15: '15:00',
        16: '15:30',
        17: '16:00',
        18: '16:30',
        19: '17:00',
        20: '17:30',
        21: '18:00',
        22: '18:30',
        23: '19:00',
        24: '19:30',
        25: '20:00',
      },
    },
    {
      title: 'End Time',
      field: 'end_time',
      lookup: {
        1: '8:00',
        2: '8:30',
        3: '9:00',
        4: '9:30',
        5: '10:00',
        6: '10:30',
        7: '11:00',
        8: '11:30',
        9: '12:00',
        10: '12:30',
        11: '13:00',
        12: '13:30',
        13: '14:00',
        14: '14:30',
        15: '15:00',
        16: '15:30',
        17: '16:00',
        18: '16:30',
        19: '17:00',
        20: '17:30',
        21: '18:00',
        22: '18:30',
        23: '19:00',
        24: '19:30',
        25: '20:00',
      },
    },
    { title: 'Location', field: 'location' },
    { title: 'Hours Per Week', field: 'hoursPerWeek' },
    { title: 'Students per Instructor', field: 'studentsPerInstructor' },
  ]

  const [data, setData] = useState([]) //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    // update data
    api
      .get('/timetables?course_id=' + selcourse)
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.log('Error')
      })
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    var regExp = /^[0-9]*[.]?[0-9]*$/

    //validation
    let errorList = []
    if (newData.section === '') {
      errorList.push('Please enter section name')
    }
    if (newData.section_type === '') {
      errorList.push('Please enter section type')
    }
    if (newData.day1 === '') {
      errorList.push('Please enter day 1')
    }
    if (newData.start_time === '') {
      errorList.push('Please enter start time')
    }
    if (newData.end_time === '') {
      errorList.push('Please enter end time')
    }
    if (newData.location === '') {
      errorList.push('Please enter location')
    }
    if (newData.hoursPerWeek === '') {
      errorList.push('Please enter hours per week')
    }
    if (newData.studentsPerInstructor === '') {
      errorList.push('Please enter students per instructor')
    }
    if (newData.hoursPerWeek !== '' && !regExp.test(newData.hoursPerWeek)) {
      errorList.push('Error in Hours Per Week - Enter integers only')
    }
    if (
      newData.studentsPerInstructor !== '' &&
      !regExp.test(newData.studentsPerInstructor)
    ) {
      errorList.push('Error in Students Per Instructor - Enter integers only')
    }

    if (errorList.length < 1) {
      api
        .put('/timetables/' + newData.id + '/', newData)
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
    var regExp = /^[0-9]*[.]?[0-9]*$/

    //validation
    let errorList = []
    if (newData.section === undefined) {
      errorList.push('Please enter section name')
    }
    if (newData.section_type === undefined) {
      errorList.push('Please enter section type')
    }
    if (newData.day1 === undefined) {
      errorList.push('Please enter days')
    }
    if (newData.start_time === undefined) {
      errorList.push('Please enter start time')
    }
    if (newData.end_time === undefined) {
      errorList.push('Please enter end time')
    }
    if (newData.location === undefined) {
      errorList.push('Please enter location')
    }
    if (newData.hoursPerWeek === undefined) {
      errorList.push('Please enter hours per week')
    }
    if (newData.studentsPerInstructor === undefined) {
      errorList.push('Please enter students per instructor')
    }
    if (
      newData.hoursPerWeek !== undefined &&
      !regExp.test(newData.hoursPerWeek)
    ) {
      errorList.push('Error in Hours Per Week - Enter integers only')
    }
    if (
      newData.studentsPerInstructor !== undefined &&
      !regExp.test(newData.studentsPerInstructor)
    ) {
      errorList.push('Error in Students Per Instructor - Enter integers only')
    }

    let timetableData = {
      course_id: selcourse,
      section: newData.section,
      section_type: newData.section_type,
      day1: newData.day1,
      day2: newData.day2,
      start_time: newData.start_time,
      end_time: newData.end_time,
      location: newData.location,
      hoursPerWeek: newData.hoursPerWeek,
      studentsPerInstructor: newData.studentsPerInstructor,
    }

    if (errorList.length < 1) {
      //no error
      api
        .post('/timetables/', timetableData)
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
      .delete('/timetables/' + oldData.id + '/')
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
    <div className='Timetable'>
      <div>
        {iserror && (
          <Alert severity='error'>
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>
            })}
          </Alert>
        )}
      </div>

      <MaterialTable
        title='List of Timetables'
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
          search: false,
          selection: false,
          showSelectAllCheckbox: false,
          showTitle: false,
        }}
      />
    </div>
  )
}

export default Timetable
