import {addEvent, navigate} from "./util.js";

addEvent('.nav-link', 'click', e => {
    const url = e.target.getAttribute('data-link');
    navigate(url);
})