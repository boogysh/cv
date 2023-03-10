import { fr } from "../data/lang/fr";
import { en } from "../data/lang/en";
import { ro } from "../data/lang/ro";
// import { ru } from "../data/lang/ru";

const initialState = {
  t: fr,
};
// reducer
function cardReducer(state = initialState, action) {
  switch (action.type) {
    case "FR":
      return {
        ...state,
        t: fr,
      };
    case "EN":
      return {
        ...state,
        t: en,
      };
    case "RO":
      return {
        ...state,
        t: ro,
      };
    // case "RU":
    //   return {
    //     ...state,
    //     t: ru,
    //   };
    default:
      return state;
  }
}
export default cardReducer;
