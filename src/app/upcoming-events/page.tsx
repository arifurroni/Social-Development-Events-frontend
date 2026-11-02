import React from 'react';

const UpcomingEventsPage = async () => {
    
    const res = await fetch('http://localhost:8000/upcoming-events');
    const data = await res.json();
    console.log(data);

    return (
        <div>
            All upcoming events.
        </div>
    );
};

export default UpcomingEventsPage;