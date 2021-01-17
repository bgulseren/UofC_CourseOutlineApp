
import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap'

class GradeComponent extends Component {

    state = {
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
  this._refreshGradeComponents();
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

export default GradeComponent;