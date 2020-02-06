import { SET_USERS, SET_EDIT_MODE } from "../action";

const users = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return [...action.value];
    case SET_EDIT_MODE: {
      console.log(action);
      const users = (state || []).map(x => {
        if (x.id === action.value.userId) {
          x.editMode = action.value.editMode;
        }
        return { ...x };
      });
      console.log(users);
      return [...users];
    }

    default:
      return state;
  }
};

export default users;
