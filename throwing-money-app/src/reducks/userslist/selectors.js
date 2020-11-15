import { createSelector } from "reselect";

const usersListSelector = (state) => state.userslist;

export const getUserslist = createSelector(
    [usersListSelector],
    state => state.list
);
