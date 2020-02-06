import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import {
  GET_USERS,
  POST_USER,
  DELETE_USER,
  EDIT_USER,
  PUT_USER,
  CANCEL_USER_UPDATE
} from "./action";

class User extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.users);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  inputChanged = (event, field) => {
    this.setState({ [field]: event.target.value });
    console.log(field);
  };

  addUser = () => {
    this.props.addUser({ name: this.state.name, email: this.state.email });
  };

  deleteUser = user => {
    this.props.deleteUser(user.id);
  };

  editUser = user => {
    this.props.editUser(user.id);
  };

  updateUser = user => {
    this.props.updateUser(user);
  };

  cancelUpdate = user => {
    this.props.cancelUpdate(user.id);
  };

  render() {
    return (
      <div className='container'>
        <br />
        <h1>Redux-Saga CRUD Operations </h1>
        <br />
        <div className='row mb-4'>
          <div className='col-5'>
            <input
              id='name'
              onChange={event => this.inputChanged(event, "name")}
            />
          </div>
          <div className='col-5'>
            <input
              id='email'
              onChange={event => this.inputChanged(event, "email")}
            />
          </div>
          <div className='col-2'>
            <button onClick={this.addUser}>Add User</button>
          </div>
        </div>
        {(this.props.users || []).map(user => {
          return (
            <div className='row mb-2'>
              <div className='col-5'>{user.name}</div>
              <div className='col-5'>
                <a href={user.email}> {user.email}</a>
              </div>
              <div className='col-2'>
                {user.editMode ? (
                  <>
                    <button
                      className='float-left mr-2'
                      onClick={() => {
                        this.updateUser(user);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className='float-left'
                      onClick={() => {
                        this.cancelUpdate(user);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className='float-left mr-2'
                      onClick={() => {
                        this.editUser(user);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className='float-left'
                      onClick={() => {
                        this.deleteUser(user);
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch({ type: GET_USERS });
    },
    addUser: user => {
      dispatch({ type: POST_USER, value: user });
    },
    deleteUser: userId => {
      dispatch({ type: DELETE_USER, value: userId });
    },
    editUser: userId => {
      dispatch({ type: EDIT_USER, value: userId });
    },
    updateUser: user => {
      console.log("dispatch update", user);
      dispatch({ type: PUT_USER, value: user });
    },
    cancelUpdate: userId => {
      dispatch({ type: CANCEL_USER_UPDATE, value: userId });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
