$(document).ready(async () => {
  sessionStorage.setItem("api_charcoal", `https://charcoal-api.herokuapp.com`);
  let token = sessionStorage.getItem("x-auth-token");
  let api_charcoal = sessionStorage.getItem("api_charcoal");

  let data = {};

  if (token) {
    window.location = "./index.html";
  }

  $("#username").on("change", (e) => {
    if (e.target.value == "") {
      delete data.username;
    } else {
      data.username = e.target.value;
    }
  });

  $("#password").on("change", (e) => {
    if (e.target.value == "") {
      delete data.password;
    } else {
      data.password = e.target.value;
    }
  });

  $("#btn-login").on("click", async (e) => {
    try {
      e.preventDefault();
      await $.post("http://localhost:3000/users/login", data, (result) => {
        sessionStorage.setItem("x-auth-token", `${result.token}`);
        window.location = "./index.html";
      });
    } catch (error) {
      alert(error.responseJSON.errors[0].msg);
    }
  });
});
