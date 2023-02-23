import axios from "axios";

const dealError = (error) => {
  if (error.response && error.response.status) {
    const {
      status
    } = error.response;

    let message;

    switch (status) {
      case 400:
        message = "请求错误";
        break;
      case 401:
        message = "请求错误";
        break;
      case 404:
        message = "请求地址出错";
        break;
      case 408:
        message = "请求超时";
        break;
      case 500:
        message = "服务器内部错误!";
        break;
      case 501:
        message = "服务未实现!";
        break;
      case 502:
        message = "网关错误!";
        break;
      case 503:
        message = "服务不可用!";
        break;
      case 504:
        message = "网关超时!";
        break;
      case 505:
        message = "HTTP版本不受支持";
        break;
      default:
        message = "请求失败";
    }

    console.log(message);
  }
};

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    };
    return config;
  }

  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use((config) => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true;
      return config;
    }, (error) => Promise.reject(error));
    // 响应拦截
    instance.interceptors.response.use((res) => {
      this.destroy(url);
      const {
        data,
        status
      } = res;
      return {
        data,
        status
      };
    }, (error) => {
      this.destroy(url);

      dealError(error);
      return Promise.reject(error);
    });
  }

  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
