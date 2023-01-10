module.exports = { SUCCESS_MSG, FAILURE_MSG };

function SUCCESS_MSG(status, code, message, data) {
  return { 
    status: status, 
    code: code, 
    message: message, 
    data: data
    };
}

function FAILURE_MSG(status, code, message, data) {
  return { 
      status: status, 
      code: code, 
      message: message, 
      data: data 
    };
}
