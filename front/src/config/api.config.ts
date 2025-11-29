export const SERVER_URL= import.meta.env.VITE_SERVER_URL;
export const API_URL = `${SERVER_URL}/api`;

export const getCharactersUrl = () => '/character';
export const getCharacterUrl = () => '/character/:id';


export const getLocationsUrl = () => '/location';
export const getLocationUrl = () => '/location/:id';