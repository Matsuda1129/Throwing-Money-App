import {db, FirebaseTimestamp} from "../../firebase";
import {push} from "connected-react-router";
import {fetchUsersListAction} from "./actions";

const userslistRef = db.collection('users')
export const fetchUsersList = () => {
  return async (dispatch) => {
    userslistRef.orderBy('updated_at', 'desc').get()
    .then(snapshots =>{
      const usersList = []
      snapshots.forEach(snapshot => {
        const user = snapshot.data()
        usersList.push(user)
      })
      dispatch(fetchUsersListAction(usersList))
    })
  }
}