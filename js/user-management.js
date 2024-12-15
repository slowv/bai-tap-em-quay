import {$, $$, setData, getData, addEvent, navigate, normalize, addContent} from '/js/util.js';
import {getCurrentLogin} from "./security-utils.js";

// Hiển thị thông tin user đang login
let userLoggedIn = getCurrentLogin();
if (!userLoggedIn) {
    navigate('/todo-asm/pages/authentication.html');
}
addContent('.user-logged', `Xin chào ${userLoggedIn.firstname} ${userLoggedIn.lastname}`);

const users = getData('users') || [];

generateUI(users);

// Add event click cho nút tìm kiếm
addEvent('#input-search-user', 'keyup', e => {
  searchUser(e.target.value);
})

function generateUI(users) {
    let content = '';
    users.forEach(user => {
        content += `
            <tr>
                <th scope="row">${user.id}</th>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.email}</td>
            </tr>
        `
    });

    $('#users').innerHTML = content;
}

// Tìm kiếm user theo giá trị tìm kiếm
function searchUser(search) {
    // Giá trị tìm kiếm rỗng thì sẽ trả về tất cả
    if (!search) {
        generateUI(users);
        return;
    }

    let results = users.filter(user =>
        normalize(user.firstname.toLowerCase()).includes(normalize(search.toLowerCase())) ||
        normalize(user.lastname.toLowerCase()).includes(normalize(search.toLowerCase())) ||
        normalize(user.email.toLowerCase()).includes(normalize(search.toLowerCase()))
    );
    generateUI(results);
}

