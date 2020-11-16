import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersList } from "../reducks/userslist/operations";
import { signOut } from "../reducks/users/operations";
import { getUserslist } from "../reducks/userslist/selectors"
import { getUserId, getUsername, getMoney } from '../reducks/users/selectors';
import Modal from 'react-modal'
import {Wallet} from "../components/Modal"

Modal.setAppElement('#root')

const UsersList = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const users = getUserslist(selector);
  const username = getUsername(selector)
  const money = selector.money
  // .toLocaleString()

  useEffect(() => {
    dispatch(fetchUsersList())
  }, []);

  return (
    <section>
      <p>ようこそ、{username}さん　　残高:{money}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
      <table>
        <thead>
          <tr>
            <th>ユーザ一覧</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && (
            users.map(user => (
              <tr key={user.uid}>
                <td>{user.username}</td>
                <td>
                  <button>送る</button>
                </td>
                <Wallet
                name = {user.username}
                money = {user.money}
                />
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default UsersList