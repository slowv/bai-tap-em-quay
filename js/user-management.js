import {$, $$, setData, getData} from '/js/util.js';

// Hiển thị thông tin user đang login
let userLoggedIn = getData('userLoggedIn') || undefined;

if (!userLoggedIn) {
    window.location.assign('/todo-asm/pages/authentication.html');
}

$('.user-logged').innerText = `Xin chào ${userLoggedIn.firstname} ${userLoggedIn.lastname}`;
