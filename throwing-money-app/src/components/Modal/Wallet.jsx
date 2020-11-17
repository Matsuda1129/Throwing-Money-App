import { Button } from 'react-bootstrap';
import Modal from 'react-modal'
import React from 'react'

const Wallet = (props) => {

  const [IsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={IsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className='modal'
      >
        <div>{props.name}の残高です。</div>
        <div>{props.money}</div>
      </Modal>
      <Button variant="success" className="mr-2" onClick={openModal}>walletを見る</Button>
    </div>
  );
};

export default Wallet