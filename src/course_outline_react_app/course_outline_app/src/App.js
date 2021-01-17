import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap'

import Course from './components/Course';
import CourseOutline from './components/CourseOutline';
import GradeComponent from './components/GradeComponent';
import Timetable from './components/Timetable';

class App extends Component {

  render() {

    return (
    <React.Fragment>
      <Course />
      <CourseOutline />
      <Timetable />
      <GradeComponent />
    </React.Fragment>
    );
  }
}

export default App;