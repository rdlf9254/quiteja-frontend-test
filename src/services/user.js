import { API } from "./api";



export const getUsers = data => {
    return API.get("user", data).then(result => {
        console.log('result - ', result)
      return result.data;
    });
  };