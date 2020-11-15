import React, { useCallback, useState } from 'react';
import { PrimaryButton, TextInput } from "../components/UIkit";
import { signIn } from '../reducks/users/operations'
import { useDispatch } from "react-redux";
import { push } from 'connected-react-router'

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword]);

  return (
    <div>
      <h2>サインイン</h2>
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true} rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <div>
        <PrimaryButton
          label={"Sign In"}
          onClick={() => dispatch(signIn(email, password,))}
        />
        <p onClick={() => dispatch(push('/signup'))}>アカウント登録はこちら</p>
      </div>
    </div>
  )
}

export default SignIn