/* eslint-disable new-cap */
import axios from 'axios';
import Vue from 'vue';
import * as VueCookies from 'vue-cookies';

Vue.use(VueCookies);

export default class Api {
  static defaultOptions = {
    baseURL: process.env.VUE_APP_API,
    headers: {
      // Authorization: `Bearer ${Vue.cookies.get('access_token')}`,
      Authorization: 'Bearer db2171b5e95d456fb8d5a619402a9dfb70b37ec6698ac729ff97349c2a49fddfb6f2dfbb3ce539e82c3b200a3e98825f',
      'Content-Type': 'application/json;charset=utf-8',
    },
  };

  static cancelToken = new axios.CancelToken.source();

  constructor(options = {}) {
    this.baseURL = Object.prototype.hasOwnProperty.call(options, 'baseURL') ? options.baseURL : Api.defaultOptions.baseURL;
    this.headers = Object.prototype.hasOwnProperty.call(options, 'headers') ? options.headers : Api.defaultOptions.headers;
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

  static onUnauthorized(callback) {
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
          callback();
        }
        return Promise.reject(error);
      },
    );
  }

  async login(data = {}) {
    try {
      const localData = { ...data, grant_type: 'password' };
      const response = await axios({
        url: `${this.baseURL}/oauth/token`,
        method: 'POST',
        data: localData,
        cancelToken: Api.cancelToken.token,
      });
      Vue.cookies.set('access_token', response.data.access_token, 60 * 60 * 24 * 365);
    } catch (e) {
      if (!axios.isCancel(e)) throw e;
    }
  }

  static logout() {
    Vue.cookies.remove('access_token');
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
