import { dom } from "./dom.js";
import {auth} from "./auth";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

    auth._init();
}

init();
