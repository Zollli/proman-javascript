export let auth = {
    // test
    _init: function(){
        //document.getElementById("login").addEventListener("click", auth.loadDoc);
        //document.getElementById("login_save_button").addEventListener("click", auth.login_save);
        document.getElementById('save_register').addEventListener("click", register_save);
    },
    login_save : function(){
        let username = document.getElementById("loginName").value;
        sessionStorage.setItem("username", username);
        auth.setLoginName(username);

    },

    loadDoc: function () {
      let request = new XMLHttpRequest();

      request.open("GET", url, true);
      request.send();

    },


    setLoginName : function (username) {
       let usernameField = document.getElementById("username");
       usernameField.innerText = "Logged in as " + username;
    },

    /*
    * server oldalon: request.get_json()
    * fetch-el olyan request-et írok, amibe beletudok írni
    *
    *
    * */

    postData  : function  (url = ``, data = {}) {
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

function register_save () {
    console.log("Hello, megerkeztunk.");
    let register_name = document.getElementById("register_name").value;
    let register_password = document.getElementById("register_password").value;
        let data_from_auth = {'username' : register_name, 'password': register_password};
        auth.postData(`/register`, data_from_auth)
          .then(data => console.log(data)) // JSON-string from `response.json()` call
            .then(data => auth.setLoginName(data['rdy_username']))
          .catch(error => console.error(error));


    }
