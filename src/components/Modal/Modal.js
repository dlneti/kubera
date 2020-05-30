import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const CustomModal = props => {
    const [isOpen, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false);
    }

    const openModal = () => {
        setOpen(true);
    }

    console.log(props)

    // useEffect(() => {
    //     const openButton = document.querySelector(`[id='${props.id}']`);
    //     openButton.onClick(openModal)
    // }, [])

    const OpenButton = () => {
        const button = {...props.children[0]}
        button.props.onclick = openModal;

        return <>{button}</>
    }

    return (
        <div>
            <OpenButton {...props} />
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
    
                <h2>>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <div>
                    BODY
                    {props.children}
                </div>
            </Modal>
        </div>
      );
}

export default CustomModal