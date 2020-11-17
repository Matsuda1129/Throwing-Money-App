import { Button } from 'react-bootstrap';
import Modal from 'react-modal'
import React from 'react'

const Remittance = (props) => {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className='modal'
      >
        <div>あなたの残高：{props.money}</div>
        <div>送る金額</div>
        <form action="">
          <input type="text"/>
          <button>送金</button>
        </form>
      </Modal>
       <Button variant="success" className="mr-2" onClick={openModal}>送金</Button>
    </div>
  );
};

export default Remittance