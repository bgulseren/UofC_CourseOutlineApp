import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap'

class Timetable extends Component {

    state = {
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
      editTimetableModal: false
    }

    componentDidMount() {
        this._refreshTimetables();
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

    render() {
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

        return (
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
            );
          }
        }
        
export default Timetable;
