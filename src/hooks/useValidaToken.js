import { jwtDecode } from 'jwt-decode';

const isTokenValid = (token) => {
  if (!token) return false;

  try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
  } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return false;
  }
  };

  export { isTokenValid };