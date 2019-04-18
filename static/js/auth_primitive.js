
url = 'click_test';
// test
document.getElementById("login").addEventListener("click", loadDoc);
document.getElementById("login_save_button").addEventListener("click", login_save);
document.getElementById('save_register').addEventListener("click", register_save);
document.getElementById("logout").addEventListener("click", logout);


function login_save() {
    let username = document.getElementById("loginName").value;
    sessionStorage.setItem("username", username);
    setLoginName({"rdy_username": username});

}

function loadDoc() {
  let request = new XMLHttpRequest();

  request.open("GET", url, true);
  request.send();

}


function setLoginName(obj) {
   let usernameField = document.getElementById("username");
   usernameField.innerText = "Logged in as " + obj['rdy_username'];
   sessionStorage.setItem("username", obj['rdy_username']);

}

function register_save() {
    let register_name = document.getElementById("register_name").value;
    let register_password = document.getElementById("register_password").value;
    let data_from_auth = {'username' : register_name, 'password': register_password};
    postData(`/register`, data_from_auth)
      .then(data => console.log(data)) // JSON-string from `response.json()` call
      .catch(error => console.error(error));


}

/*
* server oldalon: request.get_json()
* fetch-el olyan request-et írok, amibe beletudok írni
*
*
* */

function postData(url = ``, data = {}) {
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
        .then(response => setLoginName(response))
    }

function logout() {
    sessionStorage.clear();
    document.getElementById("username").innerText = "";}
