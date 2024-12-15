import {$, $$, setData, getData, addEvent, UUID, addContent, navigate} from '/js/util.js';
import {getCurrentLogin} from "./security-utils.js";

// Hiển thị thông tin user đang login
let userLoggedIn = getCurrentLogin();
if (!userLoggedIn) {
    navigate('/todo-asm/pages/authentication.html');
}
addContent('.user-logged', `Xin chào ${userLoggedIn.firstname} ${userLoggedIn.lastname}`);

const keyData = 'tasks';

// Lấy dữ liệu từ localStorage theo key là tasks nếu không có thì default sẽ là array rỗng [].
let tasks = getData(keyData) || [];

// Tab status default
let tabStatus = 'All';

// Hiển thị danh sách task
generateUI(tasks);

// 1. Thêm task
addEvent('#btn-add-task', 'click', e => {
    // lấy thẻ input
    const inputAddTask = $('#input-add-task');

    // Lấy giá trị của input
    const value = inputAddTask.value;

    // Kiểm tra biến valye phải khác undefined và khác rỗng.
    if (value) {
        // Thêm task vào array
        tasks.push(createTask(value));

        // Lưu danh sách task vào localStorage
        setData(keyData, tasks);

        // Hiển thị lại UI danh sách task
        generateUI(tasks);

        // Reset input
        inputAddTask.value = '';
        alert('Thêm công việc thành công!!!!');
    }
});

// Tạo object task
function createTask(taskName) {
    return {
        id: UUID(),
        name: taskName,
        status: false
    }
}

// Hiển thị danh sách công việc, biến tasks là array
function generateUI(tasks) {
    // Lấy thẻ chứa danh sách task
    const elmTasks = $('#tasks');

    let content = '';

    // Tìm box input thêm task
    const boxAddTask = $('.box-add-task');
    boxAddTask.classList.remove('d-none');

    // Tìm box delete all
    const boxDeleteAll = $('.box-delete-all');
    boxDeleteAll.classList.add('d-none');

    if (tabStatus === 'Active') {
        tasks = tasks.filter((task) => !task.status);
    } else if (tabStatus === 'Complete') {
        tasks = tasks.filter((task) => task.status);
        boxAddTask.classList.add('d-none');
        boxDeleteAll.classList.remove('d-none');
    }

    tasks.forEach(task => {
        content += `
            <div class="task">
                <div class="form-check">
                    <input class="form-check-input task-checkbox" type="checkbox" data-check="${task.status}" value="" id="${task.id}" ${task.status ? 'checked' : ''}>
                    <label class="form-check-label ${task.status ? 'line-through' : ''}" for="${task.id}">
                        ${task.name}
                    </label>
                </div>
                <i title="Xóa" class="fa fa-trash text-danger ${tabStatus === 'Complete' ? '' : 'd-none'}" aria-hidden="true" onclick="deleteTasks([${task.id}])"></i>
            </div>
        `
    });

    elmTasks.innerHTML = content;

    addEvent('.task-checkbox', 'click', e => {
        updateData(e.target.getAttribute('id'));
    })
}

// Cập nhật task
function updateData(id) {
    tasks = tasks.map(task => {
        const status = !task.status;
        console.log(task.id === id)
        return task.id === id ? {...task, status} : task
    })
    console.table(tasks);
    setData(keyData, tasks);
    generateUI(tasks);
}

// Xóa Task
function deleteTasks(ids) {
    // Lọc ra những task có id không có trong danh sách ids
    tasks = tasks.filter((task) => !ids.includes(task.id));
    setData(keyData, tasks);
    generateUI(tasks);
}

function deleteAll() {
    // Lấy danh sách id của task có status = true
    const ids = tasks.filter(tasks => tasks.status)
        .map(task => task.id);
    deleteTasks(ids);
}

// Add event client cho tab status
addEvent('.status', 'click', e => {
    tabStatus = e.target.getAttribute('data');

    // Tìm tab status thay đổi giao diện
    // Xóa class status-active hiện tại
    $('.status-active').classList.remove('status-active');

    // Thêm class status-active vào tab status vừa click
    e.target.classList.add('status-active')

    generateUI(tasks);
})





