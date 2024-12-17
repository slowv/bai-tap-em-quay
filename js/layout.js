import {$} from './util.js';
import {PAGE} from './constant.js'

export function navbar(pageActive) {
    return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">My todo-s</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link ${pageActive === PAGE.USER ? 'active' : ''}" data-link='/todo-asm/pages/user-management.html' href="#">User</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${pageActive === PAGE.TODO ? 'active' : ''}" data-link='/todo-asm/pages/todo-management.html'>Todo</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${pageActive === PAGE.POST ? 'active' : ''}"
                               data-link='/todo-asm/pages/post-management.html'>Post</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${pageActive === PAGE.DTCL ? 'active' : ''}"
                               data-link='/todo-asm/pages/rank-champion.html'>ĐTCL</a>
                        </li>
                    </ul>
                    <div class="container-fluid text-end">
                        <h5 class="user-logged"></h5> <a class="logout">Đăng xuất</a>
                    </div>
                </div>
            </div>
        </nav>
    `
}

export function addComponent(elm, component, callbackFns) {
    $(elm).insertAdjacentHTML('afterbegin', component);
    callbackFns.forEach(fn => fn());
}
