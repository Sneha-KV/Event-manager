import {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const DeleteEvent = ({event, modalClose, onDelete}) => {
    const [show, setShow] = useState(true); // to hide and show the modal
    const handleClose = () => {
        modalClose(); 
        setShow(false);
    }

    // Hide the modal and make delete call
    const delEvent = (id) => {
        onDelete(id);
        setShow(false);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title>Delete Confirmation</Modal.Title>

            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {event.name} event?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                No, Go back
            </Button>
            <Button variant="primary" onClick={() => delEvent(event.id)}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteEvent;
