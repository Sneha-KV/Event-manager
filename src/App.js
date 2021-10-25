import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Events from "./services/events.service";
import EventList from "./events/eventList";
import Event from "./events/event";
import CreateEditEvent from "./events/createEditEvent";
import Header from './header/header';

const App = () => {
  const [events, setEvents] = useState([]);

  // Delete event handler
  const removeEvent = async (eventId) => {
    const delEvent = await Events.deleteEvent(eventId);
    if(delEvent) setEvents(events.filter(event => event.id !== eventId));
  }

  // Edit Event Handler
  const modifyEvent = async(event) => {
    const modify = await Events.editEvent(event);
    if(modify) {
      events[event.id] = event;
      setEvents(event);
    }
  }

  // Fetch all the events on page load
  const getEvents = async () => {
    const eventList = await Events.fetchEvents();
    setEvents(eventList?.sort( (a,b) => a.company > b.company ? 1 : -1));
  };

  // Create New event

  const createEvent = async (event) => {
    const createEvent = await Events.createEvent(event);
    if(createEvent) getEvents();
  }

  // Load the events on page refresh
  useEffect( () => {
    getEvents();
  }, [events.length]);


  return (
    <Router>
      
      <Route path='/' exact render={props => (
          <>
            <Header page="home" eventHandler={[createEvent]}/>
            {events.length > 0 ? (<EventList events = {events} onDelete= {removeEvent} onEdit={modifyEvent}></EventList>) : ('No Events to display')}
          </>
        )}>
        </Route>
        <Route path='/eventDetails' exact render={props => (
            <Event onDelete={removeEvent}/> 
        )}>
        </Route>
        <Route path='/event' exact render={props => (
            <CreateEditEvent onEdit={modifyEvent} onAdd={createEvent}/> 
          )}>
        </Route>
    </Router>
  )
}

export default App
