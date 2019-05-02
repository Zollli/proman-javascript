
// test
document.getElementById("login_save_button").addEventListener("click", login_save);
document.getElementById('save_register').addEventListener("click", register_save);

// Default options are marked with *
document.getElementById("logout").addEventListener("click", logout);

function postData(url = ``, data = {}) {
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

function login_save() {
    let username = document.getElementById("loginName").value;
    let password = document.getElementById("login_password").value;
    let data_from_auth = {'username' : username, 'password': password};
    postData(`/login`, data_from_auth)
        .then(response => {
            if(response['Successful']){
                console.log("Sikerült bejelentkezned!");
                setLogin(data_from_auth);

            }
            else{
                console.log("Nem sikerült!")
            }
        })

      .catch(error => console.error(error));


    sessionStorage.setItem("username", username);

    //setLogin({"rdy_username": username});


}

function setLogin(obj) {
   let usernameField = document.getElementById("username");
   usernameField.innerText = "Logged in as " + obj['username'];
   sessionStorage.setItem("username", obj['username']);
   // close modal
    document.getElementById('register_close').click();
    document.getElementById('login_close').click();

    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "inline";

}

function register_save() {
    let register_name = document.getElementById("register_name").value;
    let register_password = document.getElementById("register_password").value;
    let data_from_auth = {'username' : register_name, 'password': register_password};
    postData(`/register`, data_from_auth)
        .then(response => {
            if(response['Successful']){
                console.log("Sikerült beregelned!");
                setLogin(data_from_auth);

            }
            else {
                console.log(response['message']);
            }
        })

      .catch(error => console.error(error));


}

/*
* server oldalon: request.get_json()
* fetch-el olyan request-et írok, amibe beletudok írni
*
*
* */

function logout() {
    sessionStorage.clear();
    document.getElementById("username").innerText = "";
    document.getElementById("register").style.display = "inline";
    document.getElementById("login").style.display = "inline";
    document.getElementById("logout").style.display = "none";

}
