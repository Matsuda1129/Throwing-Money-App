export  const SIGN_IN = "SING_IN";
export const signInAction = (userState) => {
  return {
    type: "SING_IN",
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
      money: userState.money
    }
  }
};

export  const SIGN_OUT = "SING_OUT";
export const signOutAction = () => {
  return {
    type: "SING_OUT",
    payload: {
      isSignedIn: false,
      role:"",
      uid: "",
      username:"" ,
      money:null
    }
  }
};