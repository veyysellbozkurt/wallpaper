 const fetchImages = async (params = { page: 1 }, append = true) => {
    let res = await apiCall(params);
    console.log('get results', res);
  };