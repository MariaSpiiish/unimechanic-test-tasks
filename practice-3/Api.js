export default class Api {
  constructor(options) {
      this.url = options.url;
  }

  _handleResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getInfo() {
      return fetch(this.url)
          .then(this._handleResponse)
  }
}