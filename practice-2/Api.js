export default class Api {
  constructor(options) {
      this.url = options.url;
      this.headers = options.headers;
  }

  _handleResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getInfo() {
      return fetch(this.url, {
          headers: this.headers
        })
          .then(this._handleResponse)
  }
}