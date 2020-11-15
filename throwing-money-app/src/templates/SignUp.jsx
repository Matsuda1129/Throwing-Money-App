import React, { useCallback, useState } from 'react';
import { PrimaryButton, TextInput } from "../components/UIkit";
import { signUp } from '../reducks/users/operations'
import { useDispatch } from "react-redux";
import { push } from 'connected-react-router'

const SignUp = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword]);

  return (
    <div>
      <h2>アカウント登録</h2>
      <TextInput
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true} rows={1} value={username} type={"text"} onChange={inputUsername}
      />
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true} rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <div>
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() => dispatch(signUp(username, email, password))}
        />
        <p onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
      </div>
    </div>
  )
}

export default SignUp