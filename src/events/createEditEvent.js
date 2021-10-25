import {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation, Link, useHistory } from 'react-router-dom';

const CreateEditEvent = ({onEdit, onAdd}) => {

    const {state} = useLocation();
    const history = useHistory();
    const [title, setTitle] = useState('Create new event');
    const initialData = {
        id: state?.id || '',
        color: state?.color || 'red',
        name: state?.name || '',
        isActive:state?.isActive || false,
        company: state?.company || '',
        email: state?.email || '',
        phone: state?.phone || '',
        date: state?.date || '',
        address: state?.address || '',
        description: state?.description || '',
        time: state?.time || '',
        image: state?.image || '',
        createdOn: state?.createdOn || ''
    }
    
    const [eventData, setEventData] = useState(initialData); // set data if the action is modify

    const actionType = state.actionType; // check for edit or create

    const onSubmit = (e) => {
        e.preventDefault();
        setTitle("Changes Successful!")
        if(actionType === "EDIT")
             onEdit(eventData);
        else if (actionType === "CREATE") {
            delete eventData.id; // no ID needed for create
             onAdd(eventData);
        } 

        alert("Changes Successful!");
        history.push("/"); // redirect to home page
    }

    useEffect(()=> {
        if(actionType === "EDIT")
            setTitle('Modify an Event');
    }, [actionType])
    
    return (
        <>  
            
            <div className={'event-details-header'}>
                <h1>{title}</h1>
                <Button variant="Light" >
                    <Link to="/">Back to Events</Link>
                </Button>
            </div>
            <form className={`add-edit-form ${state?.actionType}`} onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>
                        Event Name *
                        <input type='text' className="form-control" placeholder='Set event Name' value={eventData.name} name="name" onChange={e=> setEventData({...eventData, name:e.target.value})} required/>
                
                    </label>

                </div>
                <div className='form-group'>
                    <label>
                        Date *
                        <input required type='text' className="form-control" placeholder='(YYYY-MM-DD HH:MM)' name="date" value={eventData.date} onChange={e=> setEventData({...eventData, date:e.target.value})}/>
                    </label>
                    <label>
                        Time *
                        <input required type='text' className="form-control" placeholder='(HH:MM)' name="time" value={eventData.time} 
                        onChange={e=> setEventData({...eventData, time:e.target.value})}/>
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Company *
                        <input required type='text' className="form-control" placeholder='Host Organization'  name="company" value={eventData.company} 
                        onChange={e=> setEventData({...eventData, company:e.target.value})}/>
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Event Address
                        <input type='text' className="form-control" placeholder='Address' name="address" value={eventData.address}
                        onChange={e=> setEventData({...eventData, address:e.target.value})}/>
                    </label>
                    <label>
                        Image URL
                        <input type='text' className="form-control" placeholder='Image Link'  name="image" value={eventData.image} 
                        onChange={e=> setEventData({...eventData, image:e.target.value})}/>
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Event Description
                    <textarea type='text' className="form-control" placeholder='Description' name="description" value={eventData.description}
                    onChange={e=> setEventData({...eventData, description:e.target.value})}/>
                    </label>
                    <label>
                        Event Color
                        <input type='text' className="form-control" placeholder='Set event Name' value={eventData.color} name="color" onChange={e=> setEventData({...eventData, color:e.target.value})}/>
                
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Email *
                        <input required type='email'  className="form-control" placeholder='Email' name="email" value={eventData.email}
                        onChange={e=> setEventData({...eventData, email:e.target.value})}/>
                    </label>
                    <label>
                        Phone
                        <input type='text' className="form-control" placeholder='Phone Number' name="phone" value={eventData.phone}
                        onChange={e=> setEventData({...eventData, phone:e.target.value})}/>
                    </label>
                </div>
                <div className="form-group ">
                <label className='form-check-label'>
                        Active?
                        <input type='checkbox' className="form-check-input" placeholder='Set event Name' value={eventData.isActive} name="isActive" onChange={e=> setEventData({...eventData, isActive:e.target.value})} checked={eventData.isActive}/>
                
                </label>
                
                </div>
                <Button type="submit" variant="primary">Submit</Button>
            </form>
        </>
    )
}

export default CreateEditEvent
