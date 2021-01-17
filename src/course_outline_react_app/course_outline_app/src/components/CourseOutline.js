import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap'

class CourseOutline extends Component {

    state = {
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
        editLearningOutcomeModal: false
    }

    componentDidMount() {
        this._refreshLearningOutcomes();
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

        return (
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
        );
      }
    

}

export default CourseOutline;

