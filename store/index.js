import AuthenticationStore from "./AuthenticationStore";
import CoffeeStore from "./CoffeeStore";
import UserStore from "./UserStore";

export default {
  authenticationStore: new AuthenticationStore(),
  coffeeStore: new CoffeeStore(),
  userStore: new UserStore(),
};
