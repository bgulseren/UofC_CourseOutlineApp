import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap'


class Course extends Component {

    state = {
      courseBasicData: {
        id: 1,
        courseCode: '',
        courseName: '',
        courseDescription: '',
        courseHours: '',
        courseCalRef: ''
      }
    }
  
    componentDidMount() {
      this._refreshCourseBasicData();
    }
  
    updateCourseBasicData() {
      let { courseCode, courseName, courseDescription, courseHours, courseCalRef } = this.state.courseBasicData;
  
      axios.post('http://localhost:8000/api/courses/' + this.state.courseBasicData.id, {
        courseCode, courseName, courseDescription, courseHours, courseCalRef
      }).then((response) => {
        this._refreshCourseBasicData();
      });
    }
  
    _refreshCourseBasicData() {
      axios.get('http://localhost:8000/api/courses/1').then((response) => {
        this.setState({
          courseBasicData: response.data
        })
      });
    }
  
    render() {
  
      return (
        <div className="CourseInformation container">
          <h3>Course Information</h3>
  
          <FormGroup>
            <Label for="courseCode">Course Code</Label>
            <Input id="courseCode" placeholder="ie. ENSF 409" value={this.state.courseBasicData.courseCode} onChange={(e) => {
              let { courseBasicData } = this.state;
              courseBasicData.courseCode = e.target.value;
              this.setState({ courseBasicData });
            }} />
  
            <Label for="courseName">Course Name</Label>
            <Input id="courseName" placeholder="ie. Principles of Software Development" value={this.state.courseBasicData.courseName} onChange={(e) => {
              let { courseBasicData } = this.state;
              courseBasicData.courseName = e.target.value;
              this.setState({ courseBasicData });
            }} />
  
            <Label for="courseDescription">Course Description</Label>
            <Input id="courseDescription" placeholder="ie. A survey of software design and development topics for Engineering students." value={this.state.courseBasicData.courseDescription} onChange={(e) => {
              let { courseBasicData } = this.state;
              courseBasicData.courseDescription = e.target.value;
              this.setState({ courseBasicData });
            }} />
  
            <Label for="courseHours">Course Hours</Label>
            <Input id="courseHours" placeholder="ie. 3" type="number" step="0.5" value={this.state.courseBasicData.courseHours} onChange={(e) => {
              let { courseBasicData } = this.state;
              courseBasicData.courseHours = e.target.value;
              this.setState({ courseBasicData });
            }} />
  
            <Label for="courseCalRef">Course Calendar Reference</Label>
            <Input id="courseCalRef" placeholder="ie. http://www.ucalgary.ca/pubs/calendar/current/software-engineering-for-engineers.html#38252" value={this.state.courseBasicData.courseCalRef} onChange={(e) => {
              let { courseBasicData } = this.state;
              courseBasicData.courseCalRef = e.target.value;
              this.setState({ courseBasicData });
            }} />
  
          </FormGroup>
  
          <Button color="success" size="sm" className="mr-2" onClick={this.updateCourseBasicData.bind(this)}>Save</Button>
  
        </div>
      );
    }
  }
  
  export default Course;