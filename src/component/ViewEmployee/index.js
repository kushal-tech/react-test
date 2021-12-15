import { Button, Dialog, DialogActions, DialogContent, DialogContentText, 
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { Component } from 'react'
import LocalStorage from '../../common/LocalStorage'
import CreateEmployee from '../CreateEmployee';

class ViewEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersList: LocalStorage.getUser(),
            actionIndex: -1,
            dialogOpen: false,
            empId: null,
            empUser: null
        }
    }

    handleAction = (actionIndex, empId) => () => {
        let empUser = null
        if(actionIndex===1) {
            empUser = LocalStorage.getUserById(empId)
        }
        this.setState({dialogOpen: true, actionIndex, empId, empUser })
    }

    handleClose = () => {
        this.setState({dialogOpen: false, actionIndex: -1, empId: null })
    }

    handleConfirm = () => {
        const { actionIndex, empId } = this.state
        if(actionIndex===0) {
            LocalStorage.deleteUser(empId)
            this.setState({dialogOpen: false, usersList: LocalStorage.getUser()})
        }
    }
  
    render() {
        const {usersList, actionIndex, dialogOpen, empUser} = this.state
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">Action</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">DOB</TableCell>
                            <TableCell align="center">Designation</TableCell>
                            <TableCell align="center">Photo</TableCell>
                            <TableCell align="center">Experience</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {usersList.map((row) => (
                            <TableRow key={row.empId}>
                                <TableCell component="th" scope="row">
                                    <Button onClick={this.handleAction(0, row.empId)}>Delete</Button>
                                    <Button onClick={this.handleAction(1, row.empId)}>Edit</Button>
                                </TableCell>
                                <TableCell align="center">{row.firstName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.dob}</TableCell>
                                <TableCell align="center">{row.desgination}</TableCell>
                                <TableCell align="center">
                                    {row.photoLink.startsWith('http')?(
                                        <img src={row.photoLink} alt="user" width="50" height="50" />
                                    ):(
                                        row.photoLink
                                    )}
                                </TableCell>
                                <TableCell align="center">{row.experience}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            
                <Dialog open={dialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        {actionIndex === 0 ? (
                            <DialogContentText>
                                Do you really want to delete user ?
                            </DialogContentText>
                        ):(
                            <CreateEmployee empUser={empUser} isUpdate={true} onUpdate={this.handleClose} />
                        )}
                    </DialogContent>
                    {actionIndex === 0 && (<DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleConfirm} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>)}
                </Dialog>
            </div>
        )
    }

}

export default ViewEmployee;