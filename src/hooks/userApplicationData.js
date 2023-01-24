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
    // finds matching days in state with matching appointments
    const CurrentDay = state.days.find((day) => day.appointments.includes(id));
    // maps over days object and if the day matchs the currentDay method it will add 1 spot to the day object
    const days = state.days.map((day) => {
      if (day.name === CurrentDay.name) {
        return {...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });

    return axios.delete(`/api/appointments/${id}`, appointment).then((res) => {
      setState(() => {
        const newState = { ...state, appointments, days };
        return newState;
      });
    });
  }
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

    const CurrentDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day) => {
    // maps over days object and if the day matchs the currentDay method and the if the 
    //state appointments spot is null it will minus one spot from the day obj
      if (day.name === CurrentDay.name && state.appointments[id].interview === null) {
        return {...day, spots: day.spots - 1};
      } else {
        return day;
      }
    });

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState(() => {
        const newState = { ...state, appointments, days };
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
