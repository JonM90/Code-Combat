import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/profile')
      })
      .catch(error =>
        dispatch(getUser({error})))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

// {
//   questions : [
//     {spec, title, desciption, solution},
//     {spec, title, desciption, solution},
//     {spec, title, desciption, solution},
//   ]
// }

// class Battle extends React.Component {
//   constructor() {
//     this.state = {
//       questions : []
//     }
//   },

//   componentDidMount() {
//     axios.get('/api/questions')
//     .then(q => this.setState({questions : q}))
//   }

//   render() {
//     let idx = Math.floor(Math.random() * this.state.questions.length)
//     let q = this.state.questions[idx];
//     return (
//       <h1>{q.title}</h1>
//       <h2>{q.description}</h2>
//       <canvas 

//     )

//   }
// }



