import {activeRouteLink} from "./router.js";
import {logout} from "./security-utils.js";
import {addComponent, navbar} from "./layout.js";
import {PAGE} from "./constant.js";

export const Application = {
    eventStartApp: [activeRouteLink, logout],
    pages: [
        {
            path: '/todo-asm/pages/user-management.html',
            script: '../js/user-management.js',
            component: [navbar(PAGE.USER)],
            event: undefined
        },

    ]
}

initialization(Application);

function initialization(application) {
    const page = application.pages.find(page => page.path === window.location.pathname)
    if (page) {
        // Load script
        lazyLoadScript(page.script, _ => {
        });

        // Add component
        page.component.forEach((component) => addComponent('body', component, page.event || Application.eventStartApp));
    }
}

function lazyLoadScript(url, callback) {
    // Kiểm tra nếu script đã được tải
    if (document.querySelector(`script[src="${url}"]`)) {
        console.log("Script already loaded:", url);
        if (callback) callback();
        return;
    }

    // Tạo thẻ script
    const script = document.createElement("script");
    script.src = url;
    script.type = "module";
    script.async = true; // Đảm bảo tải không đồng bộ
    script.onload = () => {
        console.log("Script loaded:", url);
        if (callback) callback();
    };
    script.onerror = () => {
        console.error("Failed to load script:", url);
    };

    // Thêm vào body hoặc head
    document.body.appendChild(script);
}
