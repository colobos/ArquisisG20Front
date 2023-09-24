let route;

if (process.env.REACT_APP_BACKEND_ENV === 'local') {
  console.log("Running in local mode")
  route = process.env.REACT_APP_BACKEND_LOCAL_URL;
} else {
  console.log("Running in cloud mode")
  route = process.env.REACT_APP_BACKEND_CLOUD_URL;
}

const config = {
  route: route
};

console.log("Route: " + config.route)
export default config;
