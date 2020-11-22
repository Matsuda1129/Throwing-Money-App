import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { saveUsersList } from "../../reducks/userslist/operations";
import { saveUser } from "../../reducks/users/operations";
import { push } from 'connected-react-router';
import Modal from 'react-modal'
import React, { useCallback, useState } from 'react'


const Remittance = (props) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    dispatch(push('/'))
    setIsOpen(false);
  }

  const [money, setMoney] = useState("");
  const inputMoney = useCallback((event) => {
    setMoney(event.target.value)
  }, [setMoney])

  const yourUid = props.yourUid
  const othersUid = props.othersUid
  const yourMoney = Number(props.yourMoney) - Number(money);
  const othersMoney = Number(props.othersMoney) + Number(money);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
      >
        <div>あなたの残高：{props.yourMoney}</div>
        <div>送る金額</div>
        <form action="">
          <input type="number" value={money} onChange={inputMoney} />
          <Button onClick={() => {
            dispatch(saveUser(yourUid, yourMoney));
            dispatch(saveUsersList(othersUid, othersMoney))
          }}>送金</Button>
        </form>
      </Modal>
      <Button variant="success" className="mr-2" onClick={openModal}>送金</Button>
    </div>
  );
};

export default Remittance