import store from '../../store/index.js'

export default function user_type({ next, to }) {
    console.log(to.name);
  
    return next();
  }