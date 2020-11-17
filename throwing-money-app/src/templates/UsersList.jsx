import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersList } from "../reducks/userslist/operations";
import { signOut } from "../reducks/users/operations";
import { getUserslist } from "../reducks/userslist/selectors"
import { getUserId, getUsername, getMoney } from '../reducks/users/selectors';
import Modal from 'react-modal'
import { Wallet, Remittance } from "../components/Modal"

Modal.setAppElement('#root')

const UsersList = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector)
  const username = getUsername(selector)
  const money = getMoney(selector)
  const usersList = getUserslist(selector);

  // console.log(money);
  // console.log(uid);

  const users = usersList.filter((user, index) => {
    return user.uid !== uid;
  });

  useEffect(() => {
    dispatch(fetchUsersList())
  });

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
                  <Wallet name={user.username} money={user.money} />
                </td>
                <td>
                  <Remittance money={user.money} />
                </td>
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