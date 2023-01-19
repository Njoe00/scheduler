import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) =>
    setState(() => {
      const newState = { ...state, day };
      return newState;
    });
    // using promises to use muitple get calls from server
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => {
        const newstate = {
          // setting state with new data from API call
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        };
        return newstate;
      });
    });
  }, []);
  // creating appointments object and passing to API with delete call and updating server with empty interview object
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then((res) => {
      setState(() => {
        const newState = { ...state, appointments };
        return newState;
      });
    });
  }
  // INTENTIONALLY LEFT BLANK DUE TO TIME CONSTRAINTS
  function spotsRemaining() {}
  // books interviews by creating new appointment object and passing it to api server with PUT 
  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    
    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState(() => {
        const newState = { ...state, appointments };
        return newState;
      });
    });
  }

  return {
    state,
    setDay,
    cancelInterview,
    bookInterview,
  };
}
