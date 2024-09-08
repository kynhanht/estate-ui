import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
    if (!token) return true; // If there's no token, treat it as expired
    const decodedToken = jwtDecode(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTimestamp;
};
