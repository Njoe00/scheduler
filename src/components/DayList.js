import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (props) {
    const scheduler = props.days.map(dayObj => {

        return ( 
            <DayListItem 
                key={dayObj.id}
                selected={dayObj.name === props.day}
                spots={dayObj.spots}
                name={dayObj.name}
                setDay={props.setDay}
            />
        )
    })
    return <ul>{scheduler}</ul>
};