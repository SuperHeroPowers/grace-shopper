/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserProfile} from './UserProfile'
export {default as Products} from './Products'
export {default as Navbar} from './Navbar'
export {Login, Signup} from './auth-form'
export {default as Product} from './Product';
export {default as OrderList} from './OrderList';
export {default as OrderProduct} from './OrderProduct';
export {default as Cart} from './Cart';