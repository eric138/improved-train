import { API_URL } from "./constants";

export const logIn = async (user) => {
  try {
    fetch(`${API_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_KEY
      },
      body: JSON.stringify({
        'username': user.username,
        'password': user.password
      })
    })
      .then(response => response.json())
      .then(response => {
        return {
          userId: response.userId,
          name: response.user.name,
          username: response.user.username,
          email: response.user.email,
          token: response.token
        };
      })
      .catch(error => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}