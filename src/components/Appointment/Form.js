import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form(props) {

    const [name, setStudent] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");
    //reset used in cancel to clear the form
    const reset = () => {
        setStudent("");
        setInterviewer(null);
    }
    // used to call props.onCancel and reset
    const cancel = () => {
        reset();
        props.onCancel();
    }
    // returns error if student mane is blank
    function validate() {

        if (name === "") {
            setError("student name cannot be blank");
            return;
        }
        
        setError("");
        props.onSave(name, interviewer);
    }
    
    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        alt="Add"
                        onChange={(e) => setStudent(e.target.value)}
                        value={name}
                        data-testid="student-name-input"
                    />
                    <section className="appointment__validation">{error}</section>
                </form>
                <InterviewerList
                    interviewers={props.interviewers}
                    value={interviewer}
                    onChange={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button onClick={() => cancel()} danger>Cancel</Button>
                    <Button onClick={event => validate()} confirm>Save</Button>
                </section>
            </section>
        </main>
    )
};