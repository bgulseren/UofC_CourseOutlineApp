import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import Alert from '@material-ui/lab/Alert'

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

export default function GradeBreakdown({ selcourse }) {
  const classes = useStyles()

  const [data, setData] = React.useState({
    course_id: selcourse,
    ap: 100,
    an: 100,
    am: 100,
    bp: 100,
    bn: 100,
    bm: 100,
    cp: 100,
    cn: 100,
    cm: 100,
    dp: 100,
    dn: 100,
  })

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
        console.log(res.data[0])

        if (res.data[0] === undefined) {
          console.log(
            'No grade breakdown found, setting default recommended values'
          )
          let gradeData = {
            course_id: selcourse,
            ap: 100,
            an: 99,
            am: 98,
            bp: 97,
            bn: 96,
            bm: 95,
            cp: 94,
            cn: 93,
            cm: 92,
            dp: 91,
            dn: 90,
          }

          setData(gradeData)

          api.post('/gradeBreakdowns/', gradeData)
        } else {
          setData(res.data[0])
        }
      })
      .catch((error) => {
        console.log('Error')
      })
  }

  const clickSaveHandler = () => {
    let errorList = []
    if (data.ap <= data.an) {
      errorList.push('A+ needs to be bigger than A')
    }
    if (data.an <= data.am) {
      errorList.push('A needs to be bigger than A-')
    }
    if (data.am <= data.bp) {
      errorList.push('A- needs to be bigger than B+')
    }
    if (data.bp <= data.bn) {
      errorList.push('B+ needs to be bigger than B')
    }
    if (data.bn <= data.bm) {
      errorList.push('B needs to be bigger than B-')
    }
    if (data.bm <= data.cp) {
      errorList.push('B- needs to be bigger than C+')
    }
    if (data.cp <= data.cn) {
      errorList.push('C+ needs to be bigger than C')
    }
    if (data.cn <= data.cm) {
      errorList.push('C needs to be bigger than C-')
    }
    if (data.cm <= data.dp) {
      errorList.push('C- needs to be bigger than D+')
    }
    if (data.dp <= data.dn) {
      errorList.push('D+ needs to be bigger than D')
    }

    if (errorList.length < 1) {
      setErrorMessages([])
      setIserror(false)
      api.patch('/gradeBreakdowns/' + data.id + '/', data)
      // make save button invisible again since data is submit to remote
      // setChangedData(false)
    } else {
      setErrorMessages(errorList)
      setIserror(true)
    }
  }

  const handleChangeAp = (event, newValue) => {
    let dataCopy = { ...data }
    dataCopy.ap = newValue
    setData(dataCopy)
  }

  const handleChangeAn = (event, newValue) => {
    let dataCopy = { ...data }
    dataCopy.an = newValue
    setData(dataCopy)
  }

  const handleChangeAm = (event, newValue) => {
    let dataCopy = { ...data }
    dataCopy.am = newValue
    setData(dataCopy)
  }

  const handleChangeBp = (event, newValue) => {
    let dataCopy = { ...data }
    dataCopy.bp = newValue
    setData(dataCopy)
  }

  const handleChangeBn = (event, newValue) => {
    let dataCopy = { ...data }
    dataCopy.bn = newValue
    setData(dataCopy)
  }

  const handleChangeBm = (event, newValue) => {
    let dataCopy = { ...data }
    dataCopy.bm = newValue
    setData(dataCopy)
  }

  const handleChangeCp = (event, newValue) => {
    let dataCopy = { ...data }
    dataCopy.cp = newValue
    setData(dataCopy)
  }

  const handleChangeCn = (event, newValue) => {
    let dataCopy = { ...data }
    dataCopy.cn = newValue
    setData(dataCopy)
  }

  const handleChangeCm = (event, newValue) => {
    let dataCopy = { ...data }
    dataCopy.cm = newValue
    setData(dataCopy)
  }

  const handleChangeDp = (event, newValue) => {
    let dataCopy = { ...data }
    dataCopy.dp = newValue
    setData(dataCopy)
  }

  const handleChangeDn = (event, newValue) => {
    let dataCopy = { ...data }
    dataCopy.dn = newValue
    setData(dataCopy)
  }

  return (
    <div className={classes.root}>
      <div>
        {iserror && (
          <Alert severity='error'>
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>
            })}
          </Alert>
        )}
      </div>
      <Typography id='range-slider' gutterBottom>
        A+
      </Typography>
      <Slider
        track='inverted'
        value={data.ap}
        onChange={handleChangeAp}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
        valueLabelDisplay='on'
      />

      <Typography id='range-slider' gutterBottom>
        A
      </Typography>
      <Slider
        track='inverted'
        value={data.an}
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
