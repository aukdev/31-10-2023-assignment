import axios from "axios";
import { base_url, endpoint_defamative, endpoint_identification } from "./url";

export const defamativeFetch = (data) => {
  return new Promise((resolve, reject) => {
    const url = `${base_url}/${endpoint_defamative}`;
    axios
      .post(url, data)
      .then((data) => resolve(data.data))
      .catch((err) => reject(err));
  });
};

export const identificationFetch = (data) => {
  return new Promise((resolve, reject) => {
    const url = `${base_url}/${endpoint_identification}`;
    axios
      .post(url, data)
      .then((data) => resolve(data.data))
      .catch((err) => reject(err));
  });
};
