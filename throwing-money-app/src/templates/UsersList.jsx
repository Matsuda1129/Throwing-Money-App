import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersList } from "../reducks/userslist/operations";
import { signOut } from "../reducks/users/operations";
import { getUserslist } from "../reducks/userslist/selectors"
import { getUserId, getUsername, getMoney } from '../reducks/users/selectors';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};  

const UsersList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const users = getUserslist(selector);
  const username = getUsername(selector)
  const money = selector.money
  // .toLocaleString()
  
  useEffect(() => {
    dispatch(fetchUsersList())
  }, []);

  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
      setIsOpen(true);
  }

  function afterOpenModal() {        
      subtitle.style.color = '#3ab60b';
  }

  function closeModal(){
      setIsOpen(false);
  }

  return (
    <section>
      <p>ようこそ、{username}さん　　残高:{money}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
      <table>
        <th>ユーザ一覧</th>
        {users.length > 0 && (
          users.map(user => (
            <tr>
              <td>{user.username}</td>
              <td>
                <button>walletを見る</button>
                <button>送る</button>
              </td>
              <Button variant="success" className="mr-2" onClick={openModal}>モーダル表示</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Mebee</h2>
          <Button variant="success" className="mr-2" onClick={closeModal}>close</Button>
          <div>{user.username}</div>          
        </Modal>
              
            </tr>
          ))
        )}
      </table>
    </section>
  );
};

export default UsersList