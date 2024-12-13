const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const keyData = 'tasks';

// Lấy dữ liệu từ localStorage theo key là tasks nếu không có thì default sẽ là array rỗng [].
const tasks = getData(keyData) || [];

// Hiển thị danh sách task
generateTask(tasks);

// 1. Thêm task
const btnAddTask = $('#btn-add-task');

btnAddTask.addEventListener('click', e => {
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
        generateTask(tasks);

        // Reset input
        inputAddTask.value = '';
        alert('Thêm công việc thành công!!!!');
    }
});

// Tạo object task
function createTask(taskName) {
    return {
        id: new Date().getTime(),
        name: taskName,
        status: false
    }
}

// Done Thêm task

// Hiển thị danh sách công việc, biến tasks là array
function generateTask(tasks) {
    // Lấy thẻ chứa danh sách task
    const elmTasks = $('#tasks');

    let content = '';

    tasks.forEach(task => {
        content += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="${task.id}" ${task.status ? 'checked' : ''}>
                <label class="form-check-label ${task.status ? 'line-through' : ''}" for="${task.id}">
                    ${task.name}
                </label>
            </div>
        `
    });

    elmTasks.innerHTML = content;
}

// Lấy dữ liệu từ localStorage theo key
function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Set dữ liệu vào localStorage theo key và value
function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}



