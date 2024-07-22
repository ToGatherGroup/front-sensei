const axios = require('axios').default;


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 3000,
});


export {api as axios};

// Teste