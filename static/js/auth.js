export let auth = {
    // test
    _init: function () {
        document.querySelector("#login_save_button").addEventListener("click", loginHandler);
        //document.getElementById("login_save_button").addEventListener("click", auth.login_save);
        document.querySelector('#save_register').addEventListener("click", register_save);
    },

    setLoginName: function (username) {
        let usernameField = document.querySelector("#username");
        usernameField.setAttribute('value', 'logged in as:' + username)
    },

    /*
    * server oldalon: request.get_json()
    * fetch-el olyan request-et írok, amibe beletudok írni
    *
    *
    * */

    postData: function (url = ``, data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then(response => response.json())// parses JSON response into native Javascript objects
    }
};

function register_save() {
    console.log("Hello, megerkeztunk.");
    let register_name = document.querySelector("#register_name").value;
    let register_password = document.querySelector("#register_password").value;
    let data_from_auth = {'username': register_name, 'password': register_password};
    auth.postData(`/register`, data_from_auth)
        .then(data => console.log(data)) // JSON-string from `response.json()` call
        .then(function (data) {
            if (data.key === 'error') {
                $('register_modal').modal('toggle');
            } else {
                sessionStorage.setItem("username", register_name);
                $('register_modal').modal('toggle');
                auth.setLoginName(register_name);
            }
        })
}

function loginHandler() {
    let username = document.querySelector("#loginName").value;
    let password = document.querySelector("#loginPassword").value;
    let data = {username, password};
    console.log(data);
    auth.postData('/login', data)
        .then(data => console.log(data))
        .then(function (username) {
            if (username.key === 'error') {
                $('login_modal').modal('toggle');
            } else {
                sessionStorage.setItem("username", username);
                $('login_modal').modal('toggle');
                auth.setLoginName(username);
            }
        })
}