import { Box, Button, Divider, TextField } from '@material-ui/core';
import React, { Component } from 'react'
import LocalStorage from '../../common/LocalStorage'



class CreateEmployee extends Component {

    constructor(props) {
        super(props);
        const empUser = props.empUser ? props.empUser : null
        this.state = {
            empId: empUser ? empUser.empId : 0,
            firstName: empUser ? empUser.firstName: '',
            lastName: empUser ? empUser.lastName: '',
            dob: empUser ? empUser.dob: '',
            designation: empUser ? empUser.designation: '',
            photoLink: empUser ? empUser.photoLink: '',
            experience: empUser ? empUser.experience: '',
            isUpdate: empUser ? props.isUpdate: false,
        }
    }

    componentWillReceiveProps(props) {
        if(this.props.empId!==props.empUser.empId) {
            this.setState({...props.empUser, isUpdate: props.isUpdate})
        }
    }

    handleChange = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    }

    handleSubmit = () => {
        if(this.state.isUpdate) {
            LocalStorage.addUser(this.state)
            this.handleClear()
            alert("User updated successfully")
            this.props.onUpdate()
        } else {
            this.setState({empId: new Date().getTime()}, ()=>{
                LocalStorage.addUser(this.state)
                this.handleClear()
                alert("User added successfully")
            })
        }
    }
  
    handleClear = () => {
        this.setState({
            empId: 0,
            firstName: '',
            lastName: '',
            dob: '',
            designation: '',
            photoLink: '',
            experience: ''
        })
    }

    render() {
        const {firstName,
        lastName,
        dob,
        designation,
        photoLink,
        experience} = this.state
        return (
            <div>
                <h3>User Form</h3>
                <TextField fullWidth placeholder="firstName"   name="firstName" value={firstName} onChange={this.handleChange} />
                <TextField fullWidth placeholder="lastName"  name="lastName" value={lastName} onChange={this.handleChange} />
                <TextField fullWidth placeholder="dob"   name="dob" value={dob} onChange={this.handleChange} />
                <TextField fullWidth placeholder="designation" name="designation" value={designation}onChange={this.handleChange} />
                <TextField fullWidth placeholder="photoLink"   name="photoLink" value={photoLink} onChange={this.handleChange} />
                <TextField fullWidth placeholder="experience"  name="experience" value={experience} onChange={this.handleChange} />

                <Divider />
                <Box p={1}>
                    <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
                </Box>
            </div>
        )
    }
}

export default CreateEmployee;