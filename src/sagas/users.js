import { takeEvery, call, put } from "redux-saga/effects";
import {
  SET_USERS,
  GET_USERS,
  GET_USERS_STARTED,
  GET_USERS_FAILED,
  PUT_USER,
  POST_USER,
  DELETE_USER,
  CANCEL_USER_UPDATE,
  EDIT_USER,
  SET_EDIT_MOD,
  SET_EDIT_MODE
} from "../action";
import Axios from "axios";

export function* watchGetUsers() {
  yield takeEvery(GET_USERS, workerGetUsers);
}

export function* watchPostUser() {
  yield takeEvery(POST_USER, workerPostUser);
}

export function* watchPutUser() {
  yield takeEvery(PUT_USER, workerPutUser);
}

export function* watchDeleteUser() {
  yield takeEvery(DELETE_USER, workerDeleteUser);
}

export function* watchEditUser() {
  yield takeEvery(EDIT_USER, workerEditUser);
}

export function* watchCancelUserUpdate() {
  yield takeEvery(CANCEL_USER_UPDATE, workerCancelUserUpdate);
}

function* workerGetUsers() {
  console.log("get users");
  try {
    const uri = "https://jsonplaceholder.typicode.com/users";
    const result = yield call(Axios.get, uri);
    yield put({ type: SET_USERS, value: result.data });
    console.log("success");
  } catch {
    console.log("Failed");
  }
}

function* workerPostUser(action) {
  console.log("Adding a user");
  try {
    console.log("sdf");
    const uri = "https://jsonplaceholder.typicode.com/users";
    const result = yield call(Axios.post, uri, action.value);
    yield put({ type: GET_USERS });
    console.log("Added a user successfully");
  } catch {
    console.log("Failed");
  }
}

function* workerPutUser(action) {
  console.log("Updating a user");
  try {
    const uri = `https://jsonplaceholder.typicode.com/users/${action.value.id}`;
    const result = yield call(Axios.put, uri, action.value);
    yield put({ type: GET_USERS });
    console.log("Updated a user successfully");
  } catch {
    console.log("Failed");
  }
}

function* workerDeleteUser(action) {
  console.log("Deleting a user");
  try {
    const uri = `https://jsonplaceholder.typicode.com/users/${action.value}`;
    const result = yield call(Axios.delete, uri);
    yield put({ type: GET_USERS });
    console.log("Deleted a user successfully");
  } catch {
    console.log("Failed");
  }
}

function* workerEditUser(action) {
  console.log("Editing a user", action);
  yield put({
    type: SET_EDIT_MODE,
    value: { userId: action.value, editMode: true }
  });
}

function* workerCancelUserUpdate(action) {
  console.log("Cancelled a user edit");
  yield put({
    type: SET_EDIT_MODE,
    value: { userId: action.value, editMode: false }
  });
}
