import {$, addEvent, getData, navigate, setData} from './util.js'

export const getCurrentLogin = () => {
    return getData('userLoggedIn') || undefined;
}

export const logout = () => {
    addEvent('.logout', 'click', _ => {
        setData('userLoggedIn', null);
        navigate('/todo-asm/pages/authentication.html');
    })
}

