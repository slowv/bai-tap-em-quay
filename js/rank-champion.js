// Hiển thị thông tin user đang login
import {addClass, addContent, addEvent, navigate, removeClass, UUID} from "./util.js";
import {getCurrentLogin} from "./security-utils.js";
import {addComponent, navbar} from "./layout.js";
import {PAGE} from "./constant.js";

import {Application} from "./app-initialization.js";

const IMAGES = [
    {id: UUID(), src: '../img/champion/tft13_missmage.png', name: 'Mel'},
    {id: UUID(), src: '../img/champion/tft13_viktor.png', name: 'Viktor'},
    {id: UUID(), src: '../img/champion/tft13_warwick.png', name: 'Warwick'},
    {id: UUID(), src: '../img/champion/tft13_akali.png', name: 'Akali'},
    {id: UUID(), src: '../img/champion/tft13_ambessa.png', name: 'Ambessa'},
    {id: UUID(), src: '../img/champion/tft13_amumu.png', name: 'Amumu'},
    {id: UUID(), src: '../img/champion/tft13_beardy.png', name: 'Loris'},
    {id: UUID(), src: '../img/champion/tft13_blitzcrank.png', name: 'Blitzcrank'},
    {id: UUID(), src: '../img/champion/tft13_blue.png', name: 'Powder'},
    {id: UUID(), src: '../img/champion/tft13_caitlyn.png', name: 'Caitlyn'}
];

initPage();

function initPage() {
    // Thêm navbar vào dom
    addComponent('body', navbar(PAGE.DTCL), Application.eventStartApp);

    let userLoggedIn = getCurrentLogin();
    if (!userLoggedIn) {
        navigate('/todo-asm/pages/authentication.html');
    }
    addContent('.user-logged', `Xin chào ${userLoggedIn.firstname} ${userLoggedIn.lastname}`);

    generateChampion(IMAGES);
}

function generateChampion(championImages) {
    let content = '';
    championImages.forEach(champion => {
        content += `
                  <div class="draggable cham" draggable="true" id="${champion.id}"
                    style="background: url('${champion.src}') no-repeat center; background-position: center;">
                      <div class="name">${champion.name}</div>
                      <div class="info d-none">
                        <div class="header" style="background: url('../img/champion/tft13_viktor.png') no-repeat">
                            <div>
                                <div class="name">${champion.name}</div>
                                <div class="title">Sứ giả máy móc</div>
                            </div>
                            <div class="des">
                                <div>
                                    <img src="../img/machineherald.png" alt=""> Sứ giả máy móc
                                </div>
                                <div class="cost">
                                    <img src="../img/gold2.png" alt="icon"> 6
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="r mt-1">
                                <div class="passive">
                                    <img src="../img/viktor_passive.png" alt="Bão điện từ">
                                    Bão điện từ
                                </div>
                                <div class="mana">
                                    <img src="../img/Mana.svg" alt="icon"> 0/100
                                </div>
                            </div>
                            <div class="r detail">
                                Nội Tại: Đòn đánh thường được thay thế bằng Tia Chết Chóc, gây 70/175/2000 (AP) sát thương
                                phép và <span class="text-info">35/90/1000</span> <img src="../img/AP.svg" alt="icon"> sát thương chuẩn theo đường thẳng 2 ô. Các kẻ địch trúng đòn nhận 30%
                                Phân Tách và Cào Xé trong 5 giây.
                                <div class="mt-2"></div>
                                Kích Hoạt: Triệu hồi một cơn bão điện từ bao trùm cả chiến trường, hất tung TẤT CẢ kẻ địch
                                lên không trung trong 2/3/30 giây. Khi hết thời gian hiệu lực, quật chúng xuống mặt đất, gây
                                <span class="text-info">120/300/9999</span> (<img src="../img/AP.svg" alt="icon">) + <span class="text-info">8/20/100%</span> Máu tối đa dưới dạng sát thương phép.
                                <div class="mt-2"></div>
                                Phân Tách: Giảm Giáp, Cào Xé: Giảm Kháng Phép
                            </div>
                        </div>
                    </div>
                </div>
            `
    })
    addContent('.tiers', content);

    // Lắng nghe sự kiện dragstart để lưu thông tin
    addEvent('.draggable', 'dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.id); // Lưu ID của phần tử
        addClass(e.target.querySelector('.info'), 'd-none');
    });

    // Khi phần tử được kéo vào vùng dropzone
    addEvent('.dropzone', 'dragover', e => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định để cho phép drop
        e.target.classList.add('dragover');
    });

    // Khi phần tử rời khỏi vùng dropzone
    addEvent('.dropzone', 'dragleave', e => {
        e.target.classList.remove('dragover');
    })

    // Khi phần tử được thả vào vùng dropzone
    addEvent('.dropzone', 'drop', e => {
        e.preventDefault();
        e.target.classList.remove('dragover');

        // Lấy ID của phần tử từ dataTransfer
        const draggableId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(draggableId);

        if (draggedElement) {
            // Sao chép phần tử và thêm vào dropzone
            e.target.appendChild(draggedElement);
        }
        addClass(e.target.querySelector('.info'), 'd-none');
    })

    addEvent('.cham', 'mouseenter', e => {
        removeClass(e.target.querySelector('.info'), 'd-none');
    })

    addEvent('.cham', 'mouseleave', e => {
        addClass(e.target.querySelector('.info'), 'd-none');
    })
}