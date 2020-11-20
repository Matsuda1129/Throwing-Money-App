import { push } from 'connected-react-router';
import { signInAction, signOutAction } from './actions';
import { auth, db, FirebaseTimestamp } from '../../firebase/index'

const userRef = db.collection('users')

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        userRef.doc(user.uid).get()
          .then(snapshot => {
            const data = snapshot.data()
            if (!data) {
              throw new Error('ユーザーデータが存在しません。')
            }
            // Update logged in user state
            dispatch(signInAction({
              customer_id: (data.customer_id) ? data.customer_id : "",
              email: data.email,
              isSignedIn: true,
              payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
              role: data.role,
              uid: user.uid,
              username: data.username,
              money: data.money
            }))
          })
      } else {
        dispatch(push('/signin'))
      }
    })
  }
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === "" || password === "") {
      alert("必須項目が未入力です")
      return false
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid

          db.collection('users').doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
                money: data.money
              }))
              dispatch(push('/'))
            })
        }
      })
  }
}

export const signUp = (username, email, password) => {
  return async (dispatch) => {

    if (username === "" || email === "" || password === "" ) {
      alert("必須項目が未入力です")
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
            money: 500 
          };

          userRef.doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push('/'))
            })
        }
      })
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction());
        dispatch(push('/'))
      })
  }
}

export const saveUser = (YourUid,YourMoney) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      money:YourMoney,
      updated_at: timestamp
    }
    
    if(YourUid ===""){
      const ref = userRef.doc()
      data.created_at = timestamp;
      YourUid = ref.YourUid;
      data.id = YourUid;
    }

    return userRef.doc(YourUid).set(data, {merge:true})
  }
}