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