import { Button } from 'react-bootstrap';
import Modal from 'react-modal'
import React from 'react'

const Wallet = (props) => {

  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#3ab60b';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>Mebee</h2>
        <Button variant="success" className="mr-2" onClick={closeModal}>close</Button>
        <div>{props.name}</div>
        <div>{props.money}</div>
      </Modal>
       <Button variant="success" className="mr-2" onClick={openModal}>walletを見る</Button>
    </div>
  );
};

export default Wallet