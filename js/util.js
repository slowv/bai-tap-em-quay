export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);

// Lấy dữ liệu từ localStorage theo key
export function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Set dữ liệu vào localStorage theo key và value
export function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function navigate(to) {
    window.location.assign(to);
}

export function formatDate(date) {
    const padZero = (number) => number.toString().padStart(2, '0');

    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1); // Tháng trong JS bắt đầu từ 0
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function addEvent(selector, eventType, callback) {
    $$(selector).forEach((elm) => {
        elm.addEventListener(eventType, callback);
    });
}

export function getInputValue(selector) {
    return $(selector).value;
}

export function normalize(str) {
    return str.normalize('NFD') // Chuẩn hóa chuỗi
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các ký tự dấu
        .replace(/đ/g, 'd') // Chuyển 'đ' thành 'd'
        .replace(/Đ/g, 'D'); // Chuyển 'Đ' thành 'D'
}

export function addContent(selector, content) {
    $(selector).innerHTML = content;
}

export function UUID() {
    return crypto.randomUUID();
}

export function toggleClass(elm, clazz) {
    if (elm.classList.contains(clazz)) {
        elm.classList.remove(clazz);
    } else {
        elm.classList.add(clazz);
    }
}

export function addClass(elm, clazz) {
    elm.classList.add(clazz);
}

export function removeClass(elm, clazz) {
    elm.classList.remove(clazz);
}

