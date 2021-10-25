import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation, Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup';
import {Container, Row, Col} from 'react-bootstrap'
import { FaEdit, FaBuilding, FaLocationArrow, FaCalendarAlt, FaClipboardCheck, FaWindowClose, FaInfoCircle, FaPhone,FaEnvelope, FaFly } from "react-icons/fa";
import DeleteEvent from './deleteEvent';
// import CreateEditEvent from './createEditEvent';


const Event = ({onDelete}) => {
    const [delModalShow, setDelModalShow] = useState(false);
    const {state} = useLocation();
    const history = useHistory();

    // Delete Click event handler
    const handleDelClick = () => {
        setDelModalShow(true);
    }

    //  Close Modal
    const handleModalClose = () => setDelModalShow(false);
    
    // Modify current event
    const handleEditClick = (event) => {
        history.push("/event", { ...event, actionType: "EDIT" }); // route to event edit page page
    }

    const eventDisplay = (event) => {
        return <CardGroup>
                    <Card>
                        <Card.Title>
                                <h2>{event.name}</h2>
                        </Card.Title>
                        <Card.Img variant="top" src={event.image} alt={event.description}/>
                        <Card.Footer>
                            <small className="text-muted">
                                <Row>
                                    <Col><FaEnvelope/><a href={`mailto:${event.email}`}>{' '+ event.email}</a></Col>
                                    <Col><FaPhone/> {' '+ event.phone}</Col>
                                    <Col><FaFly/>{' '+ event.color}</Col>
                                </Row>
                            </small>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Body>
                            
                                <Container>
                                    <Row>
                                        <Col>
                                        <h3><FaBuilding/> </h3><p>Hosted By</p></Col>
                                        <Col xs={9}> 
                                            <h3>{event.company}</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <h3><FaLocationArrow/> </h3><p>Location</p></Col>
                                        <Col xs={9}> 
                                            <h4>{event.address}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <h3><FaCalendarAlt/> </h3><p>Date & Time</p></Col>
                                        <Col xs={9}> 
                                            <h4>{event.date} {' '}{event.time}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col><h3><FaInfoCircle></FaInfoCircle></h3></Col>
                                        <Col xs={9}> 
                                            {event.description} 
                                            {event.isActive ? <FaClipboardCheck/> : <FaWindowClose/>}
                                        </Col>
                                    </Row>
                                </Container>
                            
                        </Card.Body>
                        <Card.Footer>
                            <Link to="/">Go Back</Link>
                        </Card.Footer>
                    </Card>
                
                </CardGroup>
    }
    return (
        <>  
            <div className={'event-details-header'}>
                <h1>Event Details</h1>
                <Button variant="primary" onClick={() => handleDelClick(state)}>
                    Cancel Event
                </Button>
                <Button variant="primary" onClick={() => handleEditClick(state)}>
                    Modify Event <FaEdit/>
                </Button>
                <Button variant="Light" >
                    <Link to="/">All Events</Link>
                </Button>
            </div>
            {eventDisplay(state)}
            {   
                delModalShow && <DeleteEvent event={state} modalClose={handleModalClose} onDelete={onDelete}/>
            }
       </> 
    )
}

export default Event
