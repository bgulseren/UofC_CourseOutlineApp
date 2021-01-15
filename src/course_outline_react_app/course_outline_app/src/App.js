import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap'

class App extends Component {

  state = {
    courseBasicData: {
      id: 1,
      courseCode: '',
      courseName: '',
      courseDescription: '',
      courseHours: '',
      courseCalRef: ''
    },

    learningOutcomes: [],
    newLearningOutcomeData: {
      description: '',
      gradAttribute: '',
      instLevel: ''
    },
    editLearningOutcomeData: {
      id: '',
      description: '',
      gradAttribute: '',
      instLevel: ''
    },
    newLearningOutcomeModal: false,
    editLearningOutcomeModal: false,

    timetables: [],
    newTimetableData: {
      section: '',
      days: '',
      time: '',
      location: ''
    },
    editTimetableData: {
      id: '',
      section: '',
      days: '',
      time: '',
      location: ''
    },
    newTimetableModal: false,
    editTimetableModal: false,

    gradeComponents: [],
    newGradeComponentData: {
      component: '',
      learningOutcomes: '',
      weight: ''
    },
    editGradeComponentData: {
      id: '',
      component: '',
      learningOutcomes: '',
      weight: ''
    },
    newGradeComponentModal: false,
    editGradeComponentModal: false

  }

  componentDidMount() {
    this._refreshCourseBasicData();
    this._refreshLearningOutcomes();
    this._refreshTimetables();
    this._refreshGradeComponents();
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

  toggleNewLearningOutcomeModal() {
    this.setState({
      newLearningOutcomeModal: ! this.state.newLearningOutcomeModal
    });
  }

  toggleEditLearningOutcomeModal() {
    this.setState({
      editLearningOutcomeModal: ! this.state.editLearningOutcomeModal
    });
  }

  addLearningOutcome() {
    axios.post('http://localhost:8000/api/learningOutcomes', this.state.newLearningOutcomeData).then((response) => {
      let { learningOutcomes } = this.state;

      learningOutcomes.push(response.data);

      this.setState({ learningOutcomes, newLearningOutcomeModal: false, newLearningOutcomeData: {
        description: '',
        gradAttribute: '',
        instLevel: ''
      }});
    });
  }

  editLearningOutcome(id, description, gradAttribute, instLevel) {
    this.setState({
      editLearningOutcomeData: { id, description, gradAttribute, instLevel }, editLearningOutcomeModal: ! this.state.editLearningOutcomeModal
    });
  }

  updateLearningOutcome() {
    let { description, gradAttribute, instLevel } = this.state.editLearningOutcomeData;

    axios.put('http://localhost:8000/api/learningOutcomes/' + this.state.editLearningOutcomeData.id, {
      description, gradAttribute, instLevel
    }).then((response) => {
      this._refreshLearningOutcomes();

      this.setState({
        editLearningOutcomeModal: false, editLearningOutcomeData: { id: '', description: '', gradAttribute: '', instLevel: ''}
      })
    });
  }

  deleteLearningOutcome(id) {
    axios.delete('http://localhost:8000/api/learningOutcomes/' + id).then((response) => {
      this._refreshLearningOutcomes();
    });
  }

  _refreshLearningOutcomes() {
    axios.get('http://localhost:8000/api/learningOutcomes').then((response) => {
      this.setState({
        learningOutcomes: response.data
      })
    });
  }

  toggleNewTimetableModal() {
    this.setState({
      newTimetableModal: ! this.state.newTimetableModal
    });
  }

  toggleEditTimetableModal() {
    this.setState({
      editTimetableModal: ! this.state.editTimetableModal
    });
  }

  addTimetable() {
    axios.post('http://localhost:8000/api/timetables', this.state.newTimetableData).then((response) => {
      let { timetables } = this.state;

      timetables.push(response.data);

      this.setState({ timetables, newTimetableModal: false, newTimetableData: {
        section: '',
        days: '',
        time: '',
        location: ''
      }});
    });
  }

  editTimetable(id, section, days, time, location) {
    this.setState({
      editTimetableData: { id, section, days, time, location }, editTimetableModal: ! this.state.editTimetableModal
    });
  }

  updateTimetable() {
    let { section, days, time, location } = this.state.editTimetableData;

    axios.put('http://localhost:8000/api/timetables/' + this.state.editTimetableData.id, {
      section, days, time, location
    }).then((response) => {
      this._refreshTimetables();

      this.setState({
        editTimetableModal: false, editTimetableData: {
          section: '',
          days: '',
          time: '',
          location: ''
        }
      })
    });
  }

  deleteTimetable(id) {
    axios.delete('http://localhost:8000/api/timetables/' + id).then((response) => {
      this._refreshTimetables();
    });
  }

  _refreshTimetables() {
    axios.get('http://localhost:8000/api/timetables').then((response) => {
      this.setState({
        timetables: response.data
      })
    });
  }


  toggleNewGradeComponentModal() {
    this.setState({
      newGradeComponentModal: ! this.state.newGradeComponentModal
    });
  }

  toggleEditGradeComponentModal() {
    this.setState({
      editGradeComponentModal: ! this.state.editGradeComponentModal
    });
  }

  addGradeComponent() {
    axios.post('http://localhost:8000/api/gradeComponents', this.state.newGradeComponentData).then((response) => {
      let { gradeComponents } = this.state;

      gradeComponents.push(response.data);

      this.setState({ gradeComponents, newGradeComponentModal: false, newGradeComponentData: {
        component: '',
        learningOutcomes: '',
        weight: ''
      }});
    });
  }

  editGradeComponent(id, component, learningOutcomes, weight) {
    this.setState({
      editGradeComponentData: { id, component, learningOutcomes, weight }, editGradeComponentModal: ! this.state.editGradeComponentModal
    });
  }

  updateGradeComponent() {
    let { component, learningOutcomes, weight } = this.state.editGradeComponentData;

    axios.put('http://localhost:8000/api/gradeComponents/' + this.state.editGradeComponentData.id, {
      component, learningOutcomes, weight
    }).then((response) => {
      this._refreshGradeComponents();

      this.setState({
        editGradeComponentModal: false, editGradeComponentData: {
          component: '',
          learningOutcomes: '',
          weight: ''
        }
      })
    });
  }

  deleteGradeComponent(id) {
    axios.delete('http://localhost:8000/api/gradeComponents/' + id).then((response) => {
      this._refreshGradeComponents();
    });
  }

  _refreshGradeComponents() {
    axios.get('http://localhost:8000/api/gradeComponents').then((response) => {
      this.setState({
        gradeComponents: response.data
      })
    });
  }



  render() {
    let learningOutcomes = this.state.learningOutcomes.map((learningOutcome) => {
      return (
        <tr key={learningOutcome.id}>
          <td>{learningOutcome.id}</td>
          <td>{learningOutcome.description}</td>
          <td>{learningOutcome.gradAttribute}</td>
          <td>{learningOutcome.instLevel}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editLearningOutcome.bind(this, learningOutcome.id, learningOutcome.description, learningOutcome.gradAttribute, learningOutcome.instLevel)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteLearningOutcome.bind(this, learningOutcome.id)}>Delete</Button>
          </td>
        </tr>
      )
    });

    let timetables = this.state.timetables.map((timetable) => {
      return (
        <tr key={timetable.id}>
          <td>{timetable.id}</td>
          <td>{timetable.section}</td>
          <td>{timetable.days}</td>
          <td>{timetable.time}</td>
          <td>{timetable.location}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editTimetable.bind(this, timetable.id, timetable.section, timetable.days, timetable.time, timetable.location)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteTimetable.bind(this, timetable.id)}>Delete</Button>
          </td>
        </tr>
      )
    });

    let gradeComponents = this.state.gradeComponents.map((gradeComponent) => {
      return (
        <tr key={gradeComponent.id}>
          <td>{gradeComponent.id}</td>
          <td>{gradeComponent.component}</td>
          <td>{gradeComponent.learningOutcomes}</td>
          <td>{gradeComponent.weight}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editGradeComponent.bind(this, gradeComponent.id, gradeComponent.component, gradeComponent.learningOutcomes, gradeComponent.weight)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteGradeComponent.bind(this, gradeComponent.id)}>Delete</Button>
          </td>
        </tr>
      )
    });

    return (
    <div>

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

      <div className="LearningOutcome container">
        <h3>Learning Outcomes</h3>

        <Button className="my-3" color="primary" onClick={this.toggleNewLearningOutcomeModal.bind(this)}>Add Learning Outcome</Button>
        
        <Modal isOpen={this.state.newLearningOutcomeModal} toggle={this.toggleNewLearningOutcomeModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewLearningOutcomeModal.bind(this)}>Add</ModalHeader>
          
          <ModalBody>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input id="description" placeholder="description here" value={this.state.newLearningOutcomeData.description} onChange={(e) => {
                let { newLearningOutcomeData } = this.state;
                newLearningOutcomeData.description = e.target.value;
                this.setState({ newLearningOutcomeData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="gradAttribute">Graduate Attribute</Label>
              <Input id="gradAttribute" placeholder="gradAttribute here" value={this.state.newLearningOutcomeData.gradAttribute} onChange={(e) => {
                let { newLearningOutcomeData } = this.state;
                newLearningOutcomeData.gradAttribute = e.target.value;
                this.setState({ newLearningOutcomeData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="instLevel">Instruction Level</Label>
              <Input id="instLevel" placeholder="inst level here" value={this.state.newLearningOutcomeData.instLevel} onChange={(e) => {
                let { newLearningOutcomeData } = this.state;
                newLearningOutcomeData.instLevel = e.target.value;
                this.setState({ newLearningOutcomeData });
              }} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.addLearningOutcome.bind(this)}>Add</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewLearningOutcomeModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editLearningOutcomeModal} toggle={this.toggleEditLearningOutcomeModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditLearningOutcomeModal.bind(this)}>Edit</ModalHeader>
          
          <ModalBody>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input id="description" placeholder="description here" value={this.state.editLearningOutcomeData.description} onChange={(e) => {
                let { editLearningOutcomeData } = this.state;
                editLearningOutcomeData.description = e.target.value;
                this.setState({ editLearningOutcomeData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="gradAttribute">Graduate Attribute</Label>
              <Input id="gradAttribute" placeholder="gradAttribute here" value={this.state.editLearningOutcomeData.gradAttribute} onChange={(e) => {
                let { editLearningOutcomeData } = this.state;
                editLearningOutcomeData.gradAttribute = e.target.value;
                this.setState({ editLearningOutcomeData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="instLevel">Instruction Level</Label>
              <Input id="instLevel" placeholder="inst level here" value={this.state.editLearningOutcomeData.instLevel} onChange={(e) => {
                let { editLearningOutcomeData } = this.state;
                editLearningOutcomeData.instLevel = e.target.value;
                this.setState({ editLearningOutcomeData });
              }} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.updateLearningOutcome.bind(this)}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditLearningOutcomeModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Table>

          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Graduate Attribute</th>
              <th>Instruction Level</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {learningOutcomes}
          </tbody>

        </Table>
      </div>

      <div className="Timetable container">
        <h3>Timetable</h3>

        <Button className="my-3" color="primary" onClick={this.toggleNewTimetableModal.bind(this)}>Add Section</Button>
        
        <Modal isOpen={this.state.newTimetableModal} toggle={this.toggleNewTimetableModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewTimetableModal.bind(this)}>Add</ModalHeader>
          
          <ModalBody>
            <FormGroup>
              <Label for="description">Section</Label>
              <Input id="description" placeholder="description here" value={this.state.newTimetableData.section} onChange={(e) => {
                let { newTimetableData } = this.state;
                newTimetableData.section = e.target.value;
                this.setState({ newTimetableData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="days">Days</Label>
              <Input id="days" placeholder="ie:TuTh" value={this.state.newTimetableData.days} onChange={(e) => {
                let { newTimetableData } = this.state;
                newTimetableData.days = e.target.value;
                this.setState({ newTimetableData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="time">Time</Label>
              <Input id="time" placeholder="ie:9.00 AM - 10.00 AM" value={this.state.newTimetableData.time} onChange={(e) => {
                let { newTimetableData } = this.state;
                newTimetableData.time = e.target.value;
                this.setState({ newTimetableData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input id="location" placeholder="ie. ENE241" value={this.state.newTimetableData.location} onChange={(e) => {
                let { newTimetableData } = this.state;
                newTimetableData.location = e.target.value;
                this.setState({ newTimetableData });
              }} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.addTimetable.bind(this)}>Add</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewTimetableModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editTimetableModal} toggle={this.toggleEditTimetableModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditTimetableModal.bind(this)}>Edit</ModalHeader>
          
          <ModalBody>
          <FormGroup>
              <Label for="description">Section</Label>
              <Input id="description" placeholder="description here" value={this.state.editTimetableData.section} onChange={(e) => {
                let { editTimetableData } = this.state;
                editTimetableData.section = e.target.value;
                this.setState({ editTimetableData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="days">Days</Label>
              <Input id="days" placeholder="ie:TuTh" value={this.state.editTimetableData.days} onChange={(e) => {
                let { editTimetableData } = this.state;
                editTimetableData.days = e.target.value;
                this.setState({ editTimetableData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="time">Time</Label>
              <Input id="time" placeholder="ie:9.00 AM - 10.00 AM" value={this.state.editTimetableData.time} onChange={(e) => {
                let { editTimetableData } = this.state;
                editTimetableData.time = e.target.value;
                this.setState({ editTimetableData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input id="location" placeholder="ie. ENE241" value={this.state.editTimetableData.location} onChange={(e) => {
                let { editTimetableData } = this.state;
                editTimetableData.location = e.target.value;
                this.setState({ editTimetableData });
              }} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.updateTimetable.bind(this)}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditTimetableModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Table>

          <thead>
            <tr>
              <th>#</th>
              <th>Section</th>
              <th>Days</th>
              <th>Time</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {timetables}
          </tbody>

        </Table>
      </div>

      <div className="GradeComponent container">
        <h3>Grade Component</h3>

        <Button className="my-3" color="primary" onClick={this.toggleNewGradeComponentModal.bind(this)}>Add Grade Component</Button>
        
        <Modal isOpen={this.state.newGradeComponentModal} toggle={this.toggleNewGradeComponentModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewGradeComponentModal.bind(this)}>Add</ModalHeader>
          
          <ModalBody>
          <FormGroup>
              <Label for="gradeComponent">Component</Label>
              <Input id="gradeComponent" placeholder="ie. assignments, projects" value={this.state.newGradeComponentData.component} onChange={(e) => {
                let { newGradeComponentData } = this.state;
                newGradeComponentData.component = e.target.value;
                this.setState({ newGradeComponentData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="gradeLearningOutcomes">Learning Outcomes</Label>
              <Input id="gradeLearningOutcomes" placeholder="ie: 1-7" value={this.state.newGradeComponentData.learningOutcomes} onChange={(e) => {
                let { newGradeComponentData } = this.state;
                newGradeComponentData.learningOutcomes = e.target.value;
                this.setState({ newGradeComponentData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="gradeWeight">Weight</Label>
              <Input id="gradeWeight" placeholder="ie: % 20" value={this.state.newGradeComponentData.weight} onChange={(e) => {
                let { newGradeComponentData } = this.state;
                newGradeComponentData.weight = e.target.value;
                this.setState({ newGradeComponentData });
              }} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.addGradeComponent.bind(this)}>Add</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewGradeComponentModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editGradeComponentModal} toggle={this.toggleEditGradeComponentModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditGradeComponentModal.bind(this)}>Edit</ModalHeader>
          
          <ModalBody>
          <FormGroup>
              <Label for="gradeComponent">Component</Label>
              <Input id="gradeComponent" placeholder="ie. assignments, projects" value={this.state.editGradeComponentData.component} onChange={(e) => {
                let { editGradeComponentData } = this.state;
                editGradeComponentData.component = e.target.value;
                this.setState({ editGradeComponentData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="gradeLearningOutcomes">Learning Outcomes</Label>
              <Input id="gradeLearningOutcomes" placeholder="ie: 1-7" value={this.state.editGradeComponentData.learningOutcomes} onChange={(e) => {
                let { editGradeComponentData } = this.state;
                editGradeComponentData.learningOutcomes = e.target.value;
                this.setState({ editGradeComponentData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="gradeWeight">Weight</Label>
              <Input id="gradeWeight" placeholder="ie: % 20" value={this.state.editGradeComponentData.weight} onChange={(e) => {
                let { editGradeComponentData } = this.state;
                editGradeComponentData.weight = e.target.value;
                this.setState({ editGradeComponentData });
              }} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.updateGradeComponent.bind(this)}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditGradeComponentModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Table>

          <thead>
            <tr>
              <th>#</th>
              <th>Component</th>
              <th>Learning Outcomes</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {gradeComponents}
          </tbody>

        </Table>
      </div>




    </div>



    );
  }
}

export default App;