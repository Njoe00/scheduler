import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  
  const formatSpots = (spots) => {
    if (!props.spots) {
      return "no spots remaining";
    }

    if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    }

    if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    }
  };

  const formatingSpots = formatSpots(props.spots);

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  return (
    <li
      className={dayClass}
      data-testid="day"
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="test--light">{formatingSpots}</h3>
    </li>
  );
}
