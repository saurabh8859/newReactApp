import React from "react";
import { Link } from "react-router-dom";

import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

class RemoveUser extends React.Component {
    constructor() {
        super();
        this.state = {
            no_of_users: 0,
            list_of_users: [],
            isUserIdEmpty: false,
            isUserIdExist: false,
            isUserRemoved: false,
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    componentWillMount() {
        console.log(this.props)
        this.setState({
            no_of_users: this.props.location.state.no_of_users,
            list_of_users: this.props.location.state.list_of_users
        })
    }

    onInputChange(event) {
        this.setState({
            isUserIdEmpty: false,
            isUserIdExist: false,
            [event.target.name]: event.target.value
        });
    }

    checkIfUserIdExist() {
        const userList = this.state.list_of_users;
        const userId = this.state.userId;
        var isUserIdExist = false;
        userList.forEach((element) => {
            if (element['userId'] === parseInt(userId)) {
                isUserIdExist = true;
            }
        })

        if (isUserIdExist === true) {
            return true;
        }
        else {
            return false;
        }
    }

    validateData() {
        var isUserIdExist = false;
        var isUserIdEmpty = false;

        if (this.state.userId === undefined || this.state.userId === "") {
            isUserIdEmpty = true;
        }
        else if (!this.checkIfUserIdExist()) {
            isUserIdExist = true;
        }

        this.setState({
            isUserIdExist: isUserIdExist,
            isUserIdEmpty: isUserIdEmpty
        })
        if (isUserIdEmpty || isUserIdExist) {
            return false;
        }
        else {
            return true;
        }
    }

    onSubmitForm() {
        if (this.validateData()) {
            var userList = this.state.list_of_users;
            userList.forEach((element, index) => {
                if (element['userId'] === parseInt(this.state.userId)) {
                    userList.splice(index, 1);
                }
            });
            console.log(userList)
            this.setState({
                no_of_users: this.state.no_of_users - 1,
                isUserRemoved: true,
                list_of_users: userList
            })
        }
    }

    render() {
        return (
            <>
                {this.state.isUserRemoved ?
                    <main ref="main">
                        <div style={{ textAlign: "center", display: "block", marginTop: "250px" }}>
                            <p style={{
                                color: "green",
                                fontSize: "30px"
                            }}>User Removed Successfully.</p>
                            <Link to={{
                                pathname: "/",
                                state: {
                                    no_of_users: this.state.no_of_users,
                                    list_of_users: this.state.list_of_users
                                }
                            }} style={{ textDecoration: "none", color: "white" }}>
                                <Button color="success"> GO BACK TO HOME PAGE </Button>
                            </Link>
                        </div>
                    </main>
                    :
                    this.state.no_of_users !== 0 ?
                        <main ref="main">
                            <p style={{ textAlign: "center", marginBottom: "60px", marginTop: "50px", fontSize: "20px" }}>REMOVE A USER</p>
                            <Form style={{ marginLeft: "200px", marginRight: "200px" }}>
                                <FormGroup>
                                    <Label for="userId">User Id</Label>
                                    <Input
                                        type="text"
                                        name="userId"
                                        id="userId"
                                        placeholder="Enter User Id"
                                        value={this.state.name}
                                        onChange={this.onInputChange}
                                        invalid={this.state.isUserIdEmpty || this.state.isUserIdExist ? true : false}
                                    />
                                    {this.state.isUserIdEmpty ? <FormFeedback> User Id can not be Empty </FormFeedback> : " "}
                                    {this.state.isUserIdExist ? <FormFeedback> User Id not found. </FormFeedback> : " "}
                                </FormGroup>
                                <Button onClick={this.onSubmitForm}>Remove User</Button>
                            </Form>
                        </main>
                        :
                        <main ref="main">
                            <div style={{ textAlign: "center", display: "block", marginTop: "250px" }}>
                                <p style={{
                                    color: "red",
                                    fontSize: "30px"
                                }}>There is no user to remove</p>
                                <Link to={{
                                    pathname: "/",
                                    state: {
                                        no_of_users: this.state.no_of_users,
                                        list_of_users: this.state.list_of_users
                                    }
                                }} style={{ textDecoration: "none", color: "white" }}>
                                    <Button color="danger"> GO BACK TO HOME PAGE </Button>
                                </Link>
                            </div>
                        </main>
                }
            </>
        );
    }
}

export default RemoveUser;
