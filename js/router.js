import {addEvent, navigate} from "./util.js";

export function activeRouteLink() {
    addEvent('.nav-link', 'click', e => {
        const url = e.target.getAttribute('data-link');
        navigate(url);
    })
}