import React from 'react';
import Modal from "react-bootstrap/Modal";
const CustomModal = ({header,content,footer,title,show,handleClose}) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                {header && <Modal.Header closeButton>
                    {title && <Modal.Title>{title}</Modal.Title>}
                </Modal.Header>}

                { content &&  <Modal.Body>
                    {content}
                </Modal.Body>}

                {footer && <Modal.Footer>
                    {footer}
                </Modal.Footer>}
            </Modal>
        </div>
    );
};

export default CustomModal;