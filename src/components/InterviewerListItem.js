import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
    const interviewerClass = classNames("interviewers__item", {
        "interviewers__item--selected" : props.selected,
     });

    const imageClass = classNames("interviewers__item-image", {
        "interviewers__item--selected-image" : props.selected,
    });


    return (
        <li onClick={props.setInterviewer}
            className={interviewerClass}
            >
            <img
                className={imageClass}
                src={props.avatar}
                alt={props.name}
            />
            {props.selected && props.name}
        </li>
    )
}