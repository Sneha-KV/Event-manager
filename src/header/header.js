import React from 'react';
import {Button } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

const Header = (props) => {
    const history = useHistory();

    const handleCreateClick = () => {
        history.push("/event", { actionType: "CREATE" });
    }

    return (
        <>
            <div className={'event-details-header'}>
                <h1>{props.title ? props.title : 'Manage your events' }</h1>
                {props.page === "home" && 
                    <Button variant="primary" onClick={() => handleCreateClick()}>
                        Create Event 
                    </Button>
                }
            </div>
        </>
    )
}

export default Header
