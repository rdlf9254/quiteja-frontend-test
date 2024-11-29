import { API } from "./api";



export const getUsers = data => {
    return API.get("user", data).then(result => {
        console.log('result - ', result)
      return result.data;
    });
  };

export const getUserById = (id) => {
  return API.get(`user/${id}`).then((result) => {
    console.log("result - ", result);
    return result.data;
  });
};

export const createUser = (data) => {
  return API.post("user", data).then((result) => {
    console.log("result - ", result);
    return result.data;
  });
};

export const updateUser = (id, data) => {
  return API.put(`user/${id}`, data).then((result) => {
    console.log("result - ", result);
    return result.data;
  });
};

export const deleteUser = (id) => {
  return API.delete(`user/${id}`).then((result) => {
    console.log("result - ", result);
    return result.data;
  });
};
