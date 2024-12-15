import {$, addEvent, getData, navigate, setData} from './util.js'

export const getCurrentLogin = () => {
    return getData('userLoggedIn') || undefined;
}

export const logout = () => {
    setData('userLoggedIn', null);
    navigate('/todo-asm/pages/authentication.html');
}

addEvent('.logout', 'click', _ => {
    logout();
})