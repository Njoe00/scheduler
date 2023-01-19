import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types'; 



export default function InterviewerList (props) {

    const InterviewerList = props.interviewers.map(interviewerObj => {
        return (
            <InterviewerListItem
                key={interviewerObj.id}
                avatar={interviewerObj.avatar}
                name={interviewerObj.name}
                selected={props.value === interviewerObj.id}
                setInterviewer={() => props.onChange(interviewerObj.id)}
            />
        )   
    })

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{InterviewerList}</ul>
        </section>

    )
}

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
}
