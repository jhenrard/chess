 /**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './archive/navbar'
export {default as UserHome} from './archive/user-home'
export { Login, Signup } from './archive/auth-form'
export {default as SquareContainer} from './SquareContainer'
export {default as Board} from './Board'
export {default as Piece} from './Piece'
export {default as PlayerInfo} from './PlayerInfo'
export {default as MainPage} from './MainPage'
export {default as GameRoutes} from '../GameRoutes'
export {default as GameNotFound} from './GameNotFound'
