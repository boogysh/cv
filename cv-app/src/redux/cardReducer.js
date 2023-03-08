const initialStore = {
  storedIp: "q",
};
// reducer
function cardReducer(state = initialStore, action) {
  switch (action.type) {
    case "IP":
      return {
        ...state,
        storedIp: action.payload,
      };

    default: //doo nothing
  }
  return state;
}
export default cardReducer;
