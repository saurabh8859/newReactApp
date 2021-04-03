import React from "react";
import { Link } from "react-router-dom";

import { Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

class AddUser extends React.Component {
    constructor() {
        super();
        this.state = {
            no_of_users: 0,
            list_of_users: [],
            isNameEmpty: false,
            isEmailEmpty: false,
            isAddressEmpty: false,
            isJoiningDateEmpty: false,
            isEmailValid: false,
            isUserAdded: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    componentWillMount() {
        this.setState({
            no_of_users: this.props.location.state.no_of_users,
            list_of_users: this.props.location.state.list_of_users
        })
    }

    onInputChange(event) {
        if (event.target.name === "name") {
            this.setState({
                isNameEmpty: false,
                [event.target.name]: event.target.value
            })
        }

        else if (event.target.name === "email") {
            this.setState({
                isEmailEmpty: false,
                isEmailValid: false,
                [event.target.name]: event.target.value
            })
        }

        else if (event.target.name === "address") {
            this.setState({
                isAddressEmpty: false,
                [event.target.name]: event.target.value
            })
        }

        if (event.target.name === "joiningDate") {
            this.setState({
                isJoiningDateEmpty: false,
                [event.target.name]: event.target.value
            })
        }
    }

    validateData() {
        var isNameEmpty = false;
        var isEmailEmpty = false;
        var isAddressEmpty = false;
        var isJoiningDateEmpty = false;
        var isEmailValid = false;
        if (this.state.name === undefined || this.state.name === "") {
            isNameEmpty = true;
        }
        if (this.state.address === undefined || this.state.address === "") {
            isAddressEmpty = true;
        }
        if (this.state.joiningDate === undefined || this.state.joiningDate === "") {
            isJoiningDateEmpty = true;
        }

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if (this.state.email === undefined || this.state.email === "") {
            isEmailEmpty = true;
        }
        else if (!re.test(String(this.state.email).toLowerCase())) {
            isEmailValid = true;
        }

        this.setState({
            isNameEmpty: isNameEmpty,
            isEmailEmpty: isEmailEmpty,
            isEmailValid: isEmailValid,
            isJoiningDateEmpty: isJoiningDateEmpty,
            isAddressEmpty: isAddressEmpty
        })

        if (isNameEmpty || isEmailEmpty || isAddressEmpty || isJoiningDateEmpty || isEmailValid) {
            return false;
        }
        else {
            return true;
        }
    }

    onSubmitForm() {
        if (this.validateData()) {
            var userId = this.state.no_of_users+1;
            var list_of_users = this.state.list_of_users;
            var newUserData = {
                userId: userId,
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
                joiningDate: this.state.joiningDate
            };

            list_of_users.push(newUserData);

            this.setState({
                no_of_users: this.state.no_of_users+1,
                isUserAdded: true,
                list_of_users: list_of_users
            });
        }
    }

    render() {
        return (
            <>
                {!this.state.isUserAdded ?
                    <main ref="main">
                        <p style={{ textAlign: "center", marginBottom: "60px", marginTop: "50px", fontSize: "20px" }}>ADD A NEW USER.</p>
                        <Form style={{ marginLeft: "200px", marginRight: "200px" }}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="Name">Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Enter Name"
                                            value={this.state.name}
                                            onChange={this.onInputChange}
                                            invalid={this.state.isNameEmpty ? true : false}
                                        />
                                        {this.state.isNameEmpty ? <FormFeedback> Name can not be Empty </FormFeedback> : " "}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter Email"
                                            value={this.state.email}
                                            onChange={this.onInputChange}
                                            invalid={this.state.isEmailEmpty || this.state.isEmailValid ? true : false}
                                        />
                                        {this.state.isEmailEmpty ? <FormFeedback> Email can not be Empty </FormFeedback> : " "}
                                        {this.state.isEmailValid ? <FormFeedback> Email is not valid</FormFeedback> : " "}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Enter Address"
                                    value={this.state.address}
                                    onChange={this.onInputChange}
                                    invalid={this.state.isAddressEmpty ? true : false}
                                />
                                {this.state.isAddressEmpty ? <FormFeedback> Address can not be Empty </FormFeedback> : " "}
                            </FormGroup>
                            <FormGroup>
                                <Label for="joiningDate">Joining Date</Label>
                                <Input
                                    type="date"
                                    name="joiningDate"
                                    id="joiningDate"
                                    value={this.state.joiningDate}
                                    onChange={this.onInputChange}
                                    invalid={this.state.isJoiningDateEmpty ? true : false}
                                />
                                {this.state.isJoiningDateEmpty ? <FormFeedback> Joining Date can not be Empty </FormFeedback> : " "}
                            </FormGroup>
                            <Button onClick={this.onSubmitForm}>Add User</Button>
                        </Form>
                    </main>
                    :
                    <main ref="main">
                        <div style={{ textAlign: "center", display: "block", marginTop: "250px"}}>
                            <p style={{
                                color: "green",
                                fontSize: "30px"
                            }}>User Added Successfully.</p>
                            <Link to={{
                                pathname: "/",
                                state: {
                                    no_of_users: this.state.no_of_users,
                                    list_of_users: this.state.list_of_users
                                }
                            }} style={{textDecoration: "none", color: "white"}}>
                                <Button color="success"> GO BACK TO HOME PAGE </Button>
                            </Link>
                        </div>
                    </main>
                }
            </>
        );
    }
}

export default AddUser;