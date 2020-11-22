import {db, FirebaseTimestamp} from "../../firebase";
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

export const saveUsersList = (othersUid,othersMoney) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      money:othersMoney,
      updated_at: timestamp
    }
    
    if(othersUid ===""){
      const ref = userslistRef.doc()
      data.created_at = timestamp;
      othersUid = ref.othersUid;
      data.id = othersUid;
    }

    return userslistRef.doc(othersUid).set(data, {merge:true})
  }
}