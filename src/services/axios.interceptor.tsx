import axios from "axios";

export const AxiosInterceptor = () => {
  axios.interceptors.request.use((request) => {
    return request;
  });
  axios.interceptors.response.use(
    (response) => {
      //console.log(response);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
