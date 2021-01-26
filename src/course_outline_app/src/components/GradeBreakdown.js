import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

import axios from 'axios'

const useStyles = makeStyles({
  root: {
    width: 300,
  },
})

function valuetext(value) {
  return `${value}%`
}

const api = axios.create({
  baseURL: `http://localhost:8000/api`,
})

// const rows = [
//   createData('A+', 100, 6.0),
//   createData('A', 237, 9.0),
//   createData('A-', 262, 16.0),
//   createData('B+', 305, 3.7),
//   createData('B-', 356, 16.0),
//   createData('C+', 159, 6.0),
//   createData('C', 237, 9.0),
//   createData('C-', 262, 16.0),
//   createData('D+', 305, 3.7),
//   createData('D', 356, 16.0),
//   createData('F', 356, 16.0),
// ];

export default function GradeBreakdown({ selcourse }) {
  const classes = useStyles()

  const [data, setData] = React.useState('')

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    // update data
    api
      .get('/gradeBreakdowns?course_id=' + selcourse)
      .then((res) => {
        if (res.data.id === undefined) {
          console.log(res.data)
          let gradeData = {
            course_id: selcourse,
            ap: 95,
            an: 90,
            am: 85,
            bp: 80,
            bn: 75,
            bm: 70,
            cp: 65,
            cn: 60,
            cm: 55,
            dp: 50,
            dn: 45,
          }

          setData(gradeData)
        } else {
          setData(res.data)
        }
      })
      .catch((error) => {
        console.log('Error')
      })
  }

  const clickSaveHandler = () => {
    if (data.id == undefined) {
      let copyData = { ...data }
      copyData.course_id = selcourse
      api.post('/gradeBreakdowns/', copyData)
      console.log(copyData)
    } else {
      api.patch('/gradeBreakdowns/' + data.id + '/', data)
    }

    // make save button invisible again since data is submit to remote
    // setChangedData(false)
  }

  const validate = (grade, rank) => {
    if (grade < data.an && rank < 1) {
      let dataCopy = { ...data }
      dataCopy.an = grade
      setData(dataCopy)
    }

    if (grade < data.am && rank < 2) {
      let dataCopy = { ...data }
      dataCopy.am = grade
      setData(dataCopy)
    }

    if (grade < data.bp && rank < 3) {
      let dataCopy = { ...data }
      dataCopy.bp = grade
      setData(dataCopy)
    }

    if (grade < data.bn && rank < 4) {
      let dataCopy = { ...data }
      dataCopy.bn = grade
      setData(dataCopy)
    }

    if (grade < data.bm && rank < 5) {
      let dataCopy = { ...data }
      dataCopy.bm = grade
      setData(dataCopy)
    }

    if (grade < data.cp && rank < 6) {
      let dataCopy = { ...data }
      dataCopy.cp = grade
      setData(dataCopy)
    }

    if (grade < data.cn && rank < 7) {
      let dataCopy = { ...data }
      dataCopy.cn = grade
      setData(dataCopy)
    }

    if (grade < data.cm && rank < 8) {
      let dataCopy = { ...data }
      dataCopy.cm = grade
      setData(dataCopy)
    }

    if (grade < data.dp && rank < 9) {
      let dataCopy = { ...data }
      dataCopy.dp = grade
      setData(dataCopy)
    }

    if (grade < data.dn && rank < 10) {
      let dataCopy = { ...data }
      dataCopy.dn = grade
      setData(dataCopy)
    }
  }

  const handleChangeAp = (event, newValue) => {
    validate(newValue, 0)

    let dataCopy = { ...data }
    dataCopy.ap = newValue
    setData(dataCopy)
  }

  const handleChangeAn = (event, newValue) => {
    validate(newValue, 1)

    let dataCopy = { ...data }
    dataCopy.an = newValue
    setData(dataCopy)
  }

  const handleChangeAm = (event, newValue) => {
    validate(newValue, 2)

    let dataCopy = { ...data }
    dataCopy.am = newValue
    setData(dataCopy)
  }

  const handleChangeBp = (event, newValue) => {
    validate(newValue, 3)

    let dataCopy = { ...data }
    dataCopy.bp = newValue
    setData(dataCopy)
  }

  const handleChangeBn = (event, newValue) => {
    validate(newValue, 4)

    let dataCopy = { ...data }
    dataCopy.bn = newValue
    setData(dataCopy)
  }

  const handleChangeBm = (event, newValue) => {
    validate(newValue, 5)

    let dataCopy = { ...data }
    dataCopy.bm = newValue
    setData(dataCopy)
  }

  const handleChangeCp = (event, newValue) => {
    validate(newValue, 6)

    let dataCopy = { ...data }
    dataCopy.cp = newValue
    setData(dataCopy)
  }

  const handleChangeCn = (event, newValue) => {
    validate(newValue, 7)

    let dataCopy = { ...data }
    dataCopy.cn = newValue
    setData(dataCopy)
  }

  const handleChangeCm = (event, newValue) => {
    validate(newValue, 8)

    let dataCopy = { ...data }
    dataCopy.cm = newValue
    setData(dataCopy)
  }

  const handleChangeDp = (event, newValue) => {
    validate(newValue, 9)

    let dataCopy = { ...data }
    dataCopy.dp = newValue
    setData(dataCopy)
  }

  const handleChangeDn = (event, newValue) => {
    validate(newValue, 10)
    let dataCopy = { ...data }
    dataCopy.dn = newValue
    setData(dataCopy)
  }

  return (
    <div className={classes.root}>
      <Typography id='range-slider' gutterBottom>
        A+
      </Typography>
      <Slider
        track='inverted'
        value={data.ap}
        max={100}
        onChange={handleChangeAp}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
        marks={[
          {
            value: 100,
            label: '100%',
          },
        ]}
      />

      <Typography id='range-slider' gutterBottom>
        A
      </Typography>
      <Slider
        track='inverted'
        value={data.an}
        max={data.ap}
        onChange={handleChangeAn}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
      />

      <Typography id='range-slider' gutterBottom>
        A-
      </Typography>
      <Slider
        track='inverted'
        value={data.am}
        max={data.an}
        onChange={handleChangeAm}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
      />

      <Typography id='range-slider' gutterBottom>
        B+
      </Typography>
      <Slider
        track='inverted'
        value={data.bp}
        max={data.am}
        onChange={handleChangeBp}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
      />

      <Typography id='range-slider' gutterBottom>
        B
      </Typography>
      <Slider
        track='inverted'
        value={data.bn}
        max={data.bp}
        onChange={handleChangeBn}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
      />

      <Typography id='range-slider' gutterBottom>
        B-
      </Typography>
      <Slider
        track='inverted'
        value={data.bm}
        max={data.bn}
        onChange={handleChangeBm}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
      />

      <Typography id='range-slider' gutterBottom>
        C+
      </Typography>
      <Slider
        track='inverted'
        value={data.cp}
        max={data.bm}
        onChange={handleChangeCp}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
      />

      <Typography id='range-slider' gutterBottom>
        C
      </Typography>
      <Slider
        track='inverted'
        value={data.cn}
        max={data.cp}
        onChange={handleChangeCn}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
      />

      <Typography id='range-slider' gutterBottom>
        C-
      </Typography>
      <Slider
        track='inverted'
        value={data.cm}
        max={data.cn}
        onChange={handleChangeCm}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
      />

      <Typography id='range-slider' gutterBottom>
        D+
      </Typography>
      <Slider
        track='inverted'
        value={data.dp}
        max={data.cm}
        onChange={handleChangeDp}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
      />

      <Typography id='range-slider' gutterBottom>
        D
      </Typography>
      <Slider
        track='inverted'
        value={data.dn}
        max={data.dp}
        onChange={handleChangeDn}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
      />

      <Button
        variant='contained'
        color='primary'
        size='small'
        startIcon={<SaveIcon />}
        // disabled={!changedData}
        className={classes.button}
        onClick={clickSaveHandler}
      >
        Save
      </Button>
    </div>
  )
}
