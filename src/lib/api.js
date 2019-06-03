/* eslint-disable new-cap */
import axios from 'axios';
import Vue from 'vue';
import * as VueCookies from 'vue-cookies';

Vue.use(VueCookies);

export default class Api {
  static defaultOptions = {
    baseURL: process.env.VUE_APP_API,
    loginURL: '/login',
    mainURL: '/',
    headers: {
      Authorization: `Bearer ${Vue.cookies.get('access_token')}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  };

  static cancelToken = new axios.CancelToken.source();

  constructor(options = {}) {
    this.baseURL = Object.prototype.hasOwnProperty.call(options, 'baseURL') ? options.baseURL : Api.defaultOptions.baseURL;
    this.mainURL = Object.prototype.hasOwnProperty.call(options, 'mainURL') ? options.mainURL : Api.defaultOptions.mainURL;
    this.loginURL = Object.prototype.hasOwnProperty.call(options, 'loginURL') ? options.loginURL : Api.defaultOptions.loginURL;
    this.headers = Object.prototype.hasOwnProperty.call(options, 'headers') ? options.headers : Api.defaultOptions.headers;
    this.onUnauthorized();
  }

  static createCancelToken() {
    Api.cancelToken = new axios.CancelToken.source();
    return Api.cancelToken;
  }

  static cancelAll(token) {
    const cancelToken = token || Api.cancelToken;
    cancelToken.cancel();
    this.createCancelToken();
  }

  onUnauthorized(callback = () => {}) {
    axios.interceptors.response.use(
      (response) => {
        if (!response || !response.data) {
          return Promise.reject(new Error('Response is empty'));
        }
        return response;
      },
      (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
          Vue.cookies.remove('access_token');
          this.goToLoginURL();
          callback();
        }
        return Promise.reject(error);
      },
    );
  }

  isLoggedIn() {
    return Vue.cookies.isKey('access_token');
  }

  goToMainURL() {
    window.location.pathname = this.mainURL;
  }

  goToLoginURL() {
    window.location.pathname = this.loginURL;
  }

  async login(data = {}) {
    try {
      const localData = {
        ...data, grant_type: 'password', client_id: '1', client_secret: '1',
      };
      const response = await axios({
        url: `${this.baseURL}/oauth/token`,
        method: 'POST',
        data: localData,
        cancelToken: Api.cancelToken.token,
      });
      Vue.cookies.set('access_token', response.data.access_token, 60 * 60 * 24 * 365);
      this.goToMainURL();
    } catch (e) {
      if (!axios.isCancel(e)) throw e;
    }
  }

  logout() {
    Vue.cookies.remove('access_token');
    this.goToLoginURL();
  }

  async register(data = {}) {
    try {
      await axios({
        url: `${this.baseURL}/register`,
        method: 'POST',
        data,
        cancelToken: Api.cancelToken.token,
      });
      await this.login(data);
    } catch (e) {
      if (!axios.isCancel(e)) throw e;
    }
  }

  async send(url, data = {}) {
    try {
      return axios({
        url: `${this.baseURL}/method/${url}`,
        method: 'GET',
        headers: this.headers,
        cancelToken: Api.cancelToken.token,
        ...data,
      });
    } catch (e) {
      if (!axios.isCancel(e)) throw e;
      return null;
    }
  }

  get(url, params = {}) {
    return this.send(url, { params, method: 'GET' });
  }

  post(url, data = {}) {
    return this.send(url, { data, method: 'POST' });
  }

  put(url, data = {}) {
    return this.send(url, { data, method: 'PUT' });
  }

  delete(url, data = {}) {
    return this.send(url, { data, method: 'DELETE' });
  }
}
