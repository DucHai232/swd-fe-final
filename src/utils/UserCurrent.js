const getUserLocalstorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default getUserLocalstorage;
