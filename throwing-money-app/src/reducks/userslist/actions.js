export const FETCH_USERSLIST = "FETCH_USERSLIST";
export const fetchUsersListAction = (userslist) => {
    return {
        type: "FETCH_USERSLIST",
        payload: userslist
    }
}