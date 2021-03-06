/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as Lobby} from './Lobby'
export {default as Battle} from './Battle'
export {default as Train} from './Train'
export {default as Sandbox} from './Sandbox'
export {default as Navbar} from './Navbar'
export {default as Footer} from './Footer'
export {default as CodeEditor} from './editor'

export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
