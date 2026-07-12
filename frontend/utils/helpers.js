export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      status: error.response.status,
      message: error.response.data?.message || "An error occurred",
      data: error.response.data,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      status: 0,
      message: "No response from server. Please check your connection.",
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      status: -1,
      message: error.message || "Request failed",
    };
  }
};

export const isSuccessResponse = (response) => {
  return response && response.status >= 200 && response.status < 300;
};