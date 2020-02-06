import {
  watchGetUsers,
  watchPostUser,
  watchEditUser,
  watchPutUser,
  watchCancelUserUpdate,
  watchDeleteUser
} from "./users";
import { all } from "redux-saga/effects";

export default function*() {
  yield all([
    watchGetUsers(),
    watchPostUser(),
    watchEditUser(),
    watchPutUser(),
    watchCancelUserUpdate(),
    watchDeleteUser()
  ]);
}
