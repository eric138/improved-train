import { createContext } from "react";

const AppContext = createContext({
  user: {
    id: '',
    name: '',
    username: '',
    token: ''
  },
  setUser: () => {},
  authenticated: false,
  setAuthenticated: () => {}
});

export default AppContext;
