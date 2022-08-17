import store from '../../store/index.js'
export default function auth({ next, router }) {
    if (!localStorage.getItem('token')) {
      return router.push({ name: 'login' });
    }
  
    return next();
  }