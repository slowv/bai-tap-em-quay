import {getData} from './util.js'

export const getCurrentLogin = () => {
    return getData('userLoggedIn') || undefined;
}