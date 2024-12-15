import {$, $$, setData, getData, navigate} from '/js/util.js';

const keyUserData = 'users';
let users = getData(keyUserData) || [];
let userLoggedIn = undefined;

// ========================= ĐĂNG KÝ =========================

// Lấy giá trị của các ô input form đăng ký
$('#btn-register').addEventListener('click', (e) => {
    const firstnameElm = $('#firstname');
    const lastnameElm = $('#lastname');
    const emailElm = $('#register-email');
    const passwordElm = $('#register-password');

    // Add event keyup để xóa text lỗi
    addEventKeyUp(firstnameElm, lastnameElm, emailElm, passwordElm);

    // Validate dữ liệu
    validate(
        createPair(firstnameElm.value, '.firstname-msg'),
        createPair(lastnameElm.value, '.lastname-msg'),
        createPair(emailElm.value, '.register-email-msg'),
        createPair(passwordElm.value, '.register-password-msg'),
    );

    // Validate Email đã tồn tại hay chưa
    validateEmailExisted(emailElm.value, '.register-email-msg');

    // Đẩy user vào array sau đó lưu lại vào localStorage
    users.push(createUser(firstnameElm.value, lastnameElm.value, emailElm.value, passwordElm.value));
    setData(keyUserData, users);

    alert('Đăng ký tài khoản thành công!');
});

function createUser(firstname, lastname, email, password) {
    return {
        id: new Date().getTime(),
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    }
}

// ======================= END ĐĂNG KÝ =======================

// **********************************************************************************************************

// ========================= ĐĂNG NHẬP =========================

$('#btn-login').addEventListener('click', (e) => {
    const emailElm = $('#email');
    const passwordElm = $('#password');

    // Add event keyup để xóa text lỗi
    addEventKeyUp(emailElm, passwordElm);

    // Validate dữ liệu
    validate(
        createPair(emailElm.value, '.email-msg'),
        createPair(passwordElm.value, '.password-msg'),
    );

    validateMatchUser(emailElm.value, passwordElm.value,'.email-msg');

    alert('Login Success!!')
    setData('userLoggedIn', userLoggedIn);
    navigate('/todo-asm/pages/user-management.html')
})

function validateMatchUser(email, password, selectorMsg) {
    userLoggedIn = users.find(user => user.email === email && user.password === password);
    console.log(userLoggedIn);
    if (!userLoggedIn) {
        $(selectorMsg).innerText = 'Thông tin tài khoản không chính xác';
        throw new Error('Thông tin tài khoản không chính xác');
    }
}

// ======================= END ĐĂNG NHẬP =======================

function validateEmailExisted(email, selectorMsg) {
    const hasUser = users.some((user) => user.email === email);
    if (hasUser) {
        $(selectorMsg).innerText = 'Email này đã có tài khoản';
        throw new Error('Email này đã có tài khoản');
    }
}

function validate(...pairs) {
    let isValid = true;
    pairs.forEach((pair) => {
        if (!pair.first) {
            $(pair.last).innerText = 'Hãy nhập đầy đủ thông tin';
            isValid = false;
        }
    });

    if (!isValid) {
        throw Error('Hãy nhập đầy đủ thông tin');
    }
}

function addEventKeyUp(...elms) {
    elms.forEach(elm => {
        elm.addEventListener('keyup', (e) => {
            const msgElm = elm.nextElementSibling;
            msgElm.innerText = '';
        })
    })
}

function createPair(value, selectorMsg) {
    return {
        first: value,
        last: selectorMsg
    }
}