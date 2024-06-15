import axios from 'axios';

const API_KEY = '44050790-1e076b64f2e9f581e9975a017';
const api_url = `https://pixabay.com/api/?key=${API_KEY}`;


const formatUrl = (params) => { //q, page, category, order
  let url = api_url + "&per_page=25&safesearch=true&editors_choice=true"
  if (!params) return url
  let paramKeys = Object.keys(params);
  paramKeys.forEach(key => {
    let value = key === 'q' ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  //console.log('final url', url);
  return url;
}



export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUrl(params));
    const { data } = response;
    return { success: true, data }
  } catch (err) {
    console.log('got error:', err.message)
    return { success: false, msg: err.message }
  }
}