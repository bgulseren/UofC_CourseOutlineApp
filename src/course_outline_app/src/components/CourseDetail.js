import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '60ch',
    },
  },
}))

const api = axios.create({
  baseURL: `http://localhost:8000/api`,
})

function CourseDetail({ selcourse }) {
  const classes = useStyles()
  const [data, setData] = useState([]) //original data (from source)
  const [description, setDescription] = useState('')
  const [hours, setHours] = useState(0)
  const [calendar_ref, setCalendar_ref] = useState('')
  const [exam_policy, setExam_policy] = useState('')
  const [calc_policy, setCalc_policy] = useState('')
  const [course_policy, setCourse_policy] = useState('')

  const [changedData, setChangedData] = useState(false)

  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    // update data
    api
      .get('/courses/' + selcourse + '/')
      .then((res) => {
        setData(res.data)

        setDescription(res.data.description)
        setHours(res.data.hours)
        setCalendar_ref(res.data.calendar_ref)
        setExam_policy(res.data.exam_policy)
        setCalc_policy(res.data.calc_policy)
        setCourse_policy(res.data.course_policy)
      })
      .catch((error) => {
        console.log('Error')
      })
  }

  const clickSaveHandler = () => {
    api.patch('/courses/' + selcourse + '/', data)

    // make save button invisible again since data is submit to remote
    setChangedData(false)
  }

  /**
   * Course Description Functions
   */

  const handleChangeDescription = (event) => {
    //update new data
    setDescription(event.target.value)
    let copyData = { ...data }
    copyData.description = event.target.value
    setData(copyData)

    setChangedData(true)
  }

  /**
   * Course Hours Functions
   */

  const handleChangeHours = (event) => {
    //update new data
    setHours(event.target.value)
    let copyData = { ...data }
    copyData.hours = event.target.value
    setData(copyData)

    setChangedData(true)
  }

  const handleChangeCalendarRef = (event) => {
    //update new data
    setCalendar_ref(event.target.value)
    let copyData = { ...data }
    copyData.calendar_ref = event.target.value
    setData(copyData)

    setChangedData(true)
  }

  const handleExamPolicy = (event) => {
    //update new data
    setExam_policy(event.target.value)
    let copyData = { ...data }
    copyData.exam_policy = event.target.value
    setData(copyData)

    setChangedData(true)
  }

  const handleCalcPolicy = (event) => {
    //update new data
    setCalc_policy(event.target.value)
    let copyData = { ...data }
    copyData.calc_policy = event.target.value
    setData(copyData)

    setChangedData(true)
  }

  const handleCoursePolicy = (event) => {
    //update new data
    setCourse_policy(event.target.value)
    let copyData = { ...data }
    copyData.course_policy = event.target.value
    setData(copyData)

    setChangedData(true)
  }

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      {changedData && (
        <div>
          <Button
            variant='contained'
            color='primary'
            size='small'
            startIcon={<SaveIcon />}
            disabled={!changedData}
            className={classes.button}
            onClick={clickSaveHandler}
          >
            Save
          </Button>
        </div>
      )}
      <div>
        <TextField
          id='course-description'
          label='Course Description'
          multiline
          rows={4}
          value={description}
          onChange={handleChangeDescription}
          variant='outlined'
        />
      </div>

      <div>
        <TextField
          id='course-hours'
          label='Course Hours'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          value={hours}
          onChange={handleChangeHours}
          variant='outlined'
        />
      </div>

      <div>
        <TextField
          id='calendar-reference'
          label='Calendar Reference'
          value={calendar_ref}
          onChange={handleChangeCalendarRef}
          variant='outlined'
        />
      </div>
      <div>
        <TextField
          id='exam-policy'
          label='Examination Policy'
          multiline
          rows={4}
          value={exam_policy}
          onChange={handleExamPolicy}
          variant='outlined'
        />
      </div>
      <div>
        <TextField
          id='calc-policy'
          label='Calculator Policy'
          multiline
          rows={2}
          value={calc_policy}
          onChange={handleCalcPolicy}
          variant='outlined'
        />
      </div>
      <div>
        <TextField
          id='course-policy'
          label='Course Policy'
          multiline
          rows={4}
          value={course_policy}
          onChange={handleCoursePolicy}
          variant='outlined'
        />
      </div>
    </form>
  )
}

export default CourseDetail
