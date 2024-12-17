import {activeRouteLink} from "./router.js";
import {logout} from "./security-utils.js";

export const Application = {
    eventStartApp: [activeRouteLink, logout]
}