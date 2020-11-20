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

  const [sendMoney, setSendMoney] = useState("");
  const inputMoney = useCallback((event) => {
    setSendMoney(event.target.value)
  }, [setSendMoney])

  const YourUid = props.YourUid
  const OthersUid = props.OthersUid
  // console.log(OthersUid);

  const YourMoney = Number(props.YourMoney) - Number(sendMoney);
  const OthersMoney = Number(props.OthersMoney) + Number(sendMoney);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className='modal'
      >
        <div>あなたの残高：{props.YourMoney}</div>
        <div>送る金額</div>
        <form action="">
          <input type="number" value={sendMoney} onChange={inputMoney} />
          <Button onClick={() => {
            dispatch(saveUser(YourUid, YourMoney));
            dispatch(saveUsersList(OthersUid, OthersMoney))
          }}>送金</Button>
        </form>
      </Modal>
      <Button variant="success" className="mr-2" onClick={openModal}>送金</Button>
    </div>
  );
};

export default Remittance