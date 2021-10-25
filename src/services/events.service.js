// import React from 'react'

const apiBaseURL = "https://rf-json-server.herokuapp.com/events-2";
const settings = {
    method: 'DELETE',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
};

const Events = {
    // call to get all the events 
   fetchEvents: async () => {
       try {
            const res = await fetch(`${apiBaseURL}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
              }
            const data = await res.json();
            return data
       } catch(e) {
           console.log(e);
       }
   
   },

   fetchOneEvent: async(eventId) => { 
        try {
            const res = await fetch(`${apiBaseURL}/${eventId}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data
        } catch(e) {
            console.log(e);
        }
   },

   deleteEvent: async (eventId) => { // Deleting an event
        settings.method = "DELETE";
       try {
           const res = await fetch(`${apiBaseURL}/${eventId}`, settings);
           if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data

       } catch(e) {
            console.log(e);
        }
   },

   editEvent: async (event) => {
    let requestOptions = {
        method: 'PUT',
        headers: settings.headers,
        body: JSON.stringify(event)
    };
        try {
            const res = await fetch(`${apiBaseURL}/${event.id}`, requestOptions);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data

        } catch(e) {
            console.log(e);
        }
   },

   createEvent: async (event) => {
        event.createdOn = new Date().toISOString(); // updating the created on date
       let requestOptions = {
           method: 'POST',
           headers: settings.headers,
           body: JSON.stringify(event)
       };
       
        try {
            const res = await fetch(`${apiBaseURL}`, requestOptions);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data

        } catch(e) {
            console.log(e);
        }
   }

}

export default Events
