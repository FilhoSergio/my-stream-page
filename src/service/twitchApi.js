import axios from 'axios';

axios.defaults.withCredentials = false;

const productList = axios.create({
  baseURL: "https://private-3efa8-products123.apiary-mock.com"
});




export default productList;