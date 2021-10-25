import {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DeleteEvent from './deleteEvent';
import { FaExternalLinkAlt, FaTrashAlt } from "react-icons/fa";
import { useHistory } from 'react-router-dom';


// import Event from './event';

const EventList = ({events, onDelete, onEdit}) => {
    const [delModalShow, setDelModalShow] = useState(false);
    const [delEvent, setDelEvent] = useState({});
    const history = useHistory();

    // Delete Click event handler
    const handleDelClick = (event) => {
        setDelEvent(event);
        setDelModalShow(true);
    }

    //  Close Modal
    const handleModalClose = () => {
        setDelModalShow(false);
    }

    // Open an event 
    const openEvent = (event, index) => {
        history.push("/eventDetails", { ...event, index }); // route to event details
    }

    // Events Table structure
    const eventTable = () => {
        return   <Table striped bordered hover size="sm">
                     <thead>
                         <tr>
                            <th># </th>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Company</th>
                            <th>Description</th>
                            <th>Action</th>

                         </tr>
                     </thead>
                     <tbody>
                     {
                         events.map((event, index) => {
                           return <tr key ={index} className={'event '+event.id}>
                                    <td>{index+1}</td>
                                    <td onClick={()=> openEvent(event, index)}>{event.name}</td>
                                   
                                    <td>{event.date}</td>
                                    
                                    <td>{event.company}</td>
                                    <td>{event.description} 
                                            <Button variant="light" onClick={()=> openEvent(event, index)}> <FaExternalLinkAlt></FaExternalLinkAlt></Button>
                                    </td>
                                    <td>
                                        <Button variant="light" onClick={() => handleDelClick(event)}>
                                            <FaTrashAlt/>
                                        </Button>
                                    </td>
                                </tr> 
                        } )
                     }
                     </tbody>
                 </Table>
     }
    return (
        <>
            {eventTable()}
            {delModalShow && <DeleteEvent event={delEvent} modalClose={handleModalClose} onDelete={onDelete} />}
           
        </>
    )
}

export default EventList
