import React from "react";
import useApplicationData from "hooks/userApplicationData";
import DayList from "../components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
// importing helper functions 
const {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} = require("../helpers/selectors");

export default function Application() {
  const { state, bookInterview, cancelInterview, setDay } =
    useApplicationData();
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  // maps overing the appointments passed by getAppointmentsForDay function and passing them to each Appointment compontent
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}