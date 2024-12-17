import {activeRouteLink} from "./router.js";
import {logout} from "./security-utils.js";
import {addComponent, navbar} from "./layout.js";
import {PAGE} from "./constant.js";
import {lazyLoadScript} from "./util.js";

export const ApplicationConfig = {
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

StartApplication(ApplicationConfig);

function StartApplication(applicationConfig) {
    const page = applicationConfig.pages.find(page => page.path === window.location.pathname)
    if (page) {
        // Load script
        lazyLoadScript(page.script, _ => {});

        // Add component
        page.component.forEach((component) => addComponent('body', component, page.event || ApplicationConfig.eventStartApp));
    }
}
