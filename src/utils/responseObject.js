class ResponseObject {
  constructor(statusCode, message, status, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.status = status;
    this.data = data;
  }
}

module.exports = ResponseObject;
