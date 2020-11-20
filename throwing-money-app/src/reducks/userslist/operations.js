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

export const saveUsersList = (OthersUid,OthersMoney) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      money:OthersMoney,
      updated_at: timestamp
    }
    
    if(OthersUid ===""){
      const ref = userslistRef.doc()
      data.created_at = timestamp;
      OthersUid = ref.OthersUid;
      data.id = OthersUid;
    }

    return userslistRef.doc(OthersUid).set(data, {merge:true})
  }
}