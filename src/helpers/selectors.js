export const getAppointmentsForDay = (state, day) => {
  let appArry = [];
  // maps over the days inside of state and matches the days with the days argument and pushes them into an array
  state.days.map((dayObj) => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach((appId) => appArry.push(appId));
    }
  });
  // matchs id of appointments and maps each appointment with each Id
  const matchIds = (appointments, ids) => {
    const matched = ids.map((id) => appointments[id]);
    return matched;
  };
  return matchIds(state.appointments, appArry);
};

// if interview is false return null
export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const InterviewerId = Number(interview.interviewer);
  // return interview object with student and interviewer key pair values
  const InterviewObj = {
    student: interview.student,
    interviewer: state.interviewers[InterviewerId],
  };
  return InterviewObj;
};

// maps over the state days and finds matching days with days arugment and pushes thm into an array
export const getInterviewersForDay = (state, day) => {
  let interviewersArry = [];
  state.days.forEach((dayObj) => {
    if (dayObj.name === day) {
      dayObj.interviewers.forEach((interviewersId) =>
        interviewersArry.push(interviewersId)
      );
    }
  });
  // maps over interviewers object with matching ids and adds interviewers with matching ids to object
  const matchIds = (interviewers, ids) => {
    const matched = ids.map((id) => interviewers[id]);
    return matched;
  };
  return matchIds(state.interviewers, interviewersArry);
};
