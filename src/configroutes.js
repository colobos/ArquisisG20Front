let route;
let routeAdmin;

if (process.env.REACT_APP_BACKEND_ENV === 'local') {
  console.log('Running in local mode')
  route = process.env.REACT_APP_BACKEND_LOCAL_URL;
  routeAdmin = process.env.REACT_APP_ADMIN_BACKEND_LOCAL_URL;
} else {
  console.log('Running in cloud mode')
  route = process.env.REACT_APP_BACKEND_CLOUD_URL;
  routeAdmin = process.env.REACT_APP_ADMIN_BACKEND_CLOUD_URL;
}

const config = {
  route: route,
  routeAdmin: routeAdmin
};

console.log('Route: ' + config.route)
console.log('Route Admin: ' + config.routeAdmin)
export default config;
