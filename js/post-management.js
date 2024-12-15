import {$, addContent, addEvent, getData, normalize} from './util.js'
import {getCurrentLogin} from "./security-utils.js";

// Hiển thị thông tin user đang login
let userLoggedIn = getCurrentLogin();
if (!userLoggedIn) {
    window.location.assign('/todo-asm/pages/authentication.html');
}
$('.user-logged').innerText = `Xin chào ${userLoggedIn.firstname} ${userLoggedIn.lastname}`;

const posts = getData('posts') || [];

generateUI(posts);

// Add event click cho nút tìm kiếm
addEvent('#input-search-post', 'keyup', e => {
    searchPost(e.target.value);
})

function showPostDetail(e) {
    console.table(posts)
    const post = posts.find(post => post.id === e.target.getAttribute('id'));
    console.log(post, e.target.getAttribute('id'))
    if (post) {
        addContent('#postDetailModal #title', post.title);
        addContent('#postDetailModal .content', post.content);
        addContent('#postDetailModal .createdDate', post.createdAt);
        const user = findUserById(post.userId);
        addContent('#postDetailModal .createdBy', user.firstname + ' ' + user.lastname);

        $('#postDetailModal .post-image').src = post.image;
        console.log($('#postDetailModal .post-image').src, post.image)
    }
}

function findUserById(id) {
    return (getData('users') || []).find(user => user.id === id);
}

function generateUI(posts) {
    let content = '';
    posts.forEach(post => {
        content += `
            <tr>
                <th scope="row" class="ellipsis" style="max-width: 80px" title="${post.id}">
                    ${post.id}
                </th>
                <td class="ellipsis mw-200" title="${post.title}">${post.title}</td>
                <td class="ellipsis mw-200" title="${post.content}">
                    ${post.content}
                </td>
                <td>
                    <img width="100px" class="img-thumbnail" src="${post.image}" alt="">
                </td>
                <td>SlowV</td>
                <td>${post.createdAt}</td>
                <td>${post.updatedAt}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-primary showPostDetail" id="${post.id}" data-bs-toggle="modal" data-bs-target="#postDetailModal">
                      <i class="fa fa-eye" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `
    });

    $('#posts').innerHTML = content;

    addEvent('.showPostDetail', 'click', e => showPostDetail(e))
}

// Tìm kiếm user theo giá trị tìm kiếm
function searchPost(search) {
    // Giá trị tìm kiếm rỗng thì sẽ trả về tất cả
    if (!search) {
        generateUI(posts);
        return;
    }

    let results = posts.filter(user =>
        normalize(user.firstname.toLowerCase()).includes(normalize(search.toLowerCase())) ||
        normalize(user.lastname.toLowerCase()).includes(normalize(search.toLowerCase())) ||
        normalize(user.email.toLowerCase()).includes(normalize(search.toLowerCase()))
    );
    generateUI(results);
}

