import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

// changes the forms showing in the application when calling transition function
export default function Appointment(props) {
    const {mode, transition, back} = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {

        const interview = {
            student: name,
            interviewer
          }
        
        transition(SAVING);
    
        props.bookInterview(props.id, interview)
        .then(() => {transition(SHOW)})
        .catch(err => transition(ERROR_SAVE, true));
    }
    
    function remove() {
        transition(DELETING, true);
        props.cancelInterview(props.id) 
        .then(() =>   transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true));
    }

      return (
        <article className="appointment" data-testid="appointment">
               <Header time={props.time} />
                {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
                {mode === SHOW && (
                    <Show
                        student={props.interview && props.interview.student}
                        interviewer={props.interview && props.interview.interviewer}
                        interview={props.interview}
                        onDelete={() => transition(CONFIRM)}
                        onEdit={() => transition(EDIT)}
                    />
                )}
                {mode === SAVING && (<Status message="Saving"/>)}
                {mode === CREATE && (
                    <Form
                        interviewers={props.interviewers}
                        interviewer={props.interviewer}
                        onCancel={() => back(EMPTY)}
                        onSave={save}
                    />
                )}
                {mode === CONFIRM && 
                    <Confirm
                        message="Are you sure you would like to delete?"
                        onCancel={() => back(EMPTY)}
                        onConfirm={remove}
                    />  
                }
                {mode === DELETING &&(<Status message="Deleting"/>)}
                {mode === EDIT && (
                    <Form
                        name={props.name ? props.name : props.interview.student}
                        interviewers={props.interviewers}
                        interviewer={props.interview.interviewer.id}
                        onCancel={() => back()}
                        onSave={save}
                    />
                )}
                {mode === ERROR_DELETE &&  (
                    <Error 
                        message="Cannot not cancel appointment."
                        onClose={() => back()}
                    />
                )}
                {mode === ERROR_SAVE && (
                    <Error 
                        message="cannot save appointment."
                        onClose={() => back()}
                    />
                )} 
        </article>
    )
};
