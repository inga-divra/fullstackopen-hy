// 4.20*: blogilistan laajennus, step8
// Function to extract token from request headers

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  } else {
    request.token = null;
  }

  next();
};

module.exports = tokenExtractor;
