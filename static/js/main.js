import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();

    // loads the boards to the screen
    dom.loadBoards();
    console.log(document.getElementById("10"));

    console.log("Hello, lefutottam!");
}

init();
