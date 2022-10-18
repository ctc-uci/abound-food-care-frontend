import { Modal } from 'antd';
import React, { useState } from 'react';

const EditEvents = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  // const showModal = () => {
  //   setOpen(true);
  // };

  const handleOk = () => {
    setModalText('Edit Event');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 20000);
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Edit Event"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        {/* <form>
          <label>
            Event Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <form>
          <label>
            Date:
            <input type="text" name="date" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <form>
          <label>
            Time:
            <input type="text" name="time" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <form>
          <label>
            Additional Notes:
            <input type="text" name="notes" />
          </label>
          <input type="submit" value="Submit" />
        </form> */}
      </Modal>
    </>
  );
};

export default EditEvents;
