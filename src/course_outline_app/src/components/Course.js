import React, { useState, useEffect } from 'react'
import './App.css'
import { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import CourseDetail from './CourseDetail'
import GradeComponent from './GradeComponent'
import LearningOutcome from './LearningOutcome'
import Timetable from './Timetable'
import CourseInstructor from './CourseInstructor'
import Textbook from './Textbook'
import GradeBreakdown from './GradeBreakdown'

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

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

function Course({ selinstructor }) {
  const classes = useStyles()
  var columns = [
    { title: 'id', field: 'id', hidden: true },
    { title: 'Instructor', field: 'instructor', hidden: true },
    { title: 'Course code', field: 'code' },
    { title: 'Course name', field: 'name' },
  ]
  const [data, setData] = useState([]) //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const [isactive, setIsactive] = useState(true)
  const [selcourse, setSelcourse] = useState(-1)

  const [headermessage, setHeadermessage] = useState(
    'Select a course or add a new one if not existing...'
  )

  useEffect(() => {
    refresh()
  }, [])

  const selectCourse = (course) => {
    setIsactive(false)
    setHeadermessage('Selected course: ' + course.code + ' - ' + course.name)
    setSelcourse(course.id)
  }

  const refresh = () => {
    // update data
    api
      .get('/courses/?instructor=' + selinstructor)
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.log('Error')
      })
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (newData.code === '') {
      errorList.push('Please enter course code')
    }
    if (newData.name === '') {
      errorList.push('Please enter course name')
    }

    let courseData = {
      instructor: selinstructor,
      code: newData.code,
      name: newData.name,
    }

    if (errorList.length < 1) {
      api
        .put('/courses/' + oldData.id + '/', courseData)
        .then((res) => {
          // refresh list from remote source
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
    if (newData.code === undefined) {
      errorList.push('Please enter course code')
    }
    if (newData.name === undefined) {
      errorList.push('Please enter course name')
    }

    let courseData = {
      instructor: selinstructor,
      code: newData.code,
      name: newData.name,
      description: 'Course description needs to be edited.',
      hours: '1',
      calendar_ref: 'Calendar reference needs to be edited.',
      exam_policy: 'Exam policy needs to be edited.',
      calc_policy: 'Calculator policy needs to be edited.',
      course_policy: 'Course policy needs to be edited.',
    }

    if (errorList.length < 1) {
      //no error
      api
        .post('/courses/', courseData)
        .then((res) => {
          // refresh list from remote source
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
    console.log(oldData)
    api
      .delete('/courses/' + oldData.id + '/')
      .then((res) => {
        // refresh list from remote source
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
    <div className='Course'>
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
          title='List of Courses'
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
          onSelectionChange={(rows) => selectCourse(rows[0])}
        />
      )}

      {!isactive && (
        <div>
          <CourseDetail selcourse={selcourse} />

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>
                Learning Outcomes
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <LearningOutcome selcourse={selcourse} />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>Timetable</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Timetable selcourse={selcourse} />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>
                Course Instructors
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CourseInstructor selcourse={selcourse} />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>
                Grade Components
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GradeComponent selcourse={selcourse} />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>Textbooks</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Textbook selcourse={selcourse} />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>
                Grade Breakdown
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GradeBreakdown selcourse={selcourse} />
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </div>
  )
}

export default Course
