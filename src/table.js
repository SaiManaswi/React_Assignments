import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
export default function TableBox() {
    const [person_details, setdetails] = useState([{ id: 1, name: 'Sai Manaswi', email: 'saimanaswi11@gmail.com', address: 'Miyapur', phno: '+91 7731895942' }])
    const [openmodel, setmodel] = useState(false)
    const [editmodel, setemodel] = useState(false)
    let name = ''
    let email = ''
    let address = ''
    let phno = ''
    const [person, setperson] = useState({ id: -1, name: name, email: email, address: address, phno: phno })
    let delete_empid = []
    function open_close_model() {
        setmodel(!openmodel)
    }

    function addemp() {
        setdetails([...person_details, { id: Math.random() * 1000, name: name, email: email, address: address, phno: phno }])
        open_close_model()
    }

    function edit_model() {
        setemodel(!editmodel)
    }

    function editemp() {
        if (name === '')
            name = person.name
        if (email === '')
            email = person.email
        if (address === '')
            address = person.address
        if (phno === '')
            phno = person.phno
        setdetails(person_details.map((e)=>{
            if(e.id === person.id){
                e.address = address
                e.email = email
                e.name = name
                e.phno = phno
            }
            return e
        }))
        console.log(person_details)
        edit_model()
    }


    return (
        <div>
            <h1>CRUD on data table</h1>
            <Button color="success" onClick={open_close_model}>Add Employee</Button>
            <Button color="danger" onClick={() => {
                setdetails(person_details.filter((e) => {
                    return !delete_empid.some((val) => { return val === e.id.toString() })
                }))
            }}>Delete Employee</Button>
            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        person_details.map((e) => {
                            return (
                                <tr key={'person_' + e.id}>
                                    <th scope="row"><Input type="checkbox" value={e.id} onInput={(e) => {
                                        if (e.target.checked)
                                            delete_empid.push(e.target.value)
                                        else {
                                            delete_empid = delete_empid.filter((val) => {
                                                return val !== e.target.value
                                            })
                                        }
                                        console.log(delete_empid)
                                    }} /></th>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.address}</td>
                                    <td>{e.phno}</td>
                                    <td>
                                        <button onClick={() => {
                                            setperson({ id: e.id, name: e.name, email: e.email, address: e.address, phno: e.phno })
                                            console.log(person)
                                            edit_model();
                                        }}>edit</button>
                                        <button onClick={() => {
                                            setdetails(person_details.filter((user) => { return user.id !== e.id }))
                                        }}>delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
            <Modal isOpen={editmodel} toggle={edit_model}>
                <ModalHeader toggle={edit_model}>Edit Employee</ModalHeader>
                <ModalBody>
                    <p>Name:</p>
                    <input type="text" onChange={(e) => name = e.target.value} defaultValue={person.name} />
                    <p>Email:</p>
                    <input type="text" onChange={(e) => email = e.target.value} defaultValue={person.email} />
                    <p>Address:</p>
                    <input type="text" onChange={(e) => address = e.target.value} defaultValue={person.address} />
                    <p>Phone number:</p>
                    <input type="text" onChange={(e) => phno = e.target.value} defaultValue={person.phno} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={editemp}>
                        Edit Employee
                    </Button>
                    <Button color="secondary" onClick={edit_model}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={openmodel} toggle={open_close_model}>
                <ModalHeader toggle={open_close_model}>Add Employee</ModalHeader>
                <ModalBody>
                    <p>Name:</p>
                    <input type="text" onChange={(e) => name = e.target.value} />
                    <p>Email:</p>
                    <input type="text" onChange={(e) => email = e.target.value} />
                    <p>Address:</p>
                    <input type="text" onChange={(e) => address = e.target.value} />
                    <p>Phone number:</p>
                    <input type="text" onChange={(e) => phno = e.target.value} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addemp}>
                        Add Employee
                    </Button>
                    <Button color="secondary" onClick={open_close_model}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}