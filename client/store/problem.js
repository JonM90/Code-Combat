import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PROBLEM = 'GET_PROBLEM'
const GET_PROBLEMS = 'GET_PROBLEMS'
const GET_COMPLETED_PROBLEMS = 'GET_COMPLETED_PROBLEMS'

// const REMOVE_PROBLEM = 'REMOVE_PROBLEM'

/**
 * INITIAL STATE
 */
const defaultProblem = {
  singleProblem: {},
  allProblems: [],
  completedProblems: []
};

/**
 * ACTION CREATORS
 */
const getProblem = problem => ({type: GET_PROBLEM, problem})
const getAllProblems = problems => ({type: GET_PROBLEMS, problems})
const getCompletedProblems = completedProblems => ({type: GET_COMPLETED_PROBLEMS, completedProblems})

// const removeProblem = () => ({type: REMOVE_PROBLEM})

/**
 * THUNK CREATORS
 */
export const fetchProblem = () =>
  dispatch =>
    axios.get('/api/problems/:problemId')
      .then(res =>
        dispatch(getProblem(res.data || defaultProblem)))
      .catch(err => console.log(err))

export const fetchAllProblems = () =>
  dispatch =>
    axios.get('/api/problems')
      .then(res => {
        dispatch(getAllProblems(res.data))
      })
      .catch(err => console.error(err))

export const fetchCompletedProblems = (userId) =>
dispatch =>
  axios.get(`/api/users/${userId}/problemHistory`)
    .then(res => {
      dispatch(getCompletedProblems(res.data))
    })
    .catch(err => console.error(err))


//REDUCER
export default function (state = defaultProblem, action) {
  switch (action.type) {
    case GET_PROBLEM:
      // return [...state, action.problem]
      return Object.assign({}, state, {singleProblem: action.problem})
    case GET_PROBLEMS:
      // return [...state, action.problems]
      return Object.assign({}, state, {allProblems: action.problems})
    case GET_COMPLETED_PROBLEMS:
    // return [...state, action.completedProblems]
    return Object.assign({}, state, {completedProblems: action.completedProblems})
    default:
      return state
  }
}
