let token = sessionStorage.getItem("x-auth-token");
$.ajaxSetup({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/x-www-form-urlencoded",
    "x-auth-token": token,
  },
});

$(document).ready(function () {
  if (!token) {
    window.location = "./sign-in.html";
  }
  $(".sign-out").on("click", (e) => {
    sessionStorage.clear();
  });
  $("#dtpicker").datetimepicker({
    format: "DD-MM-YYYY LT",
  });

  $(".timepicker").timepicker({
    showInputs: false,
  });
});

$.get("http://localhost:3000/level/", (result) => {
  let levels = result.levels;
  let tbody = "";
  levels.forEach((level) => {
    tbody += `<tr>
                              <td>
                                 <div class="btn-group">
                                    <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>
                                    <ul class="dropdown-menu">
                                       <li>
                                          <button class="btn-edit btn-default" data-id-level="${level.id}" data-toggle="modal" data-target="#edit">Edit</button>
                                          <button class="btn-delete btn-danger" data-id-level="${level.id}" data-toggle="modal" data-target="#delete">Delete</button>
                                       </li>
                                    </ul>
                                 </div>
                              </td>
                              <td>${level.name}</td>
                              <td>${level.description}</td>
                           </tr>
                           `;
  });
  $("#example2 > tbody tr:first-child").remove();
  $("#example2 > tbody").append(tbody);

  $("#btn-save").on("click", async (e) => {
    try {
      let data = {
        name: $("#name").val(),
        description: $("#desc").val(),
      };
      await $.post("http://localhost:3000/level/add", data);
    } catch (error) {
      console.log(error);
    }
  });

  $(".btn-delete").on("click", (e) => {
    const id_level = $(e.target).attr("data-id-level");

    $("#delete-level")
      .off("click")
      .on(`click`, async (e) => {
        try {
          await $.post("http://localhost:3000/level/delete", { id: id_level });
        } catch (error) {
          console.log(error);
        }
      });
  });

  $(".btn-edit").on(`click`, (e) => {
    const id_level = $(e.target).attr("data-id-level");
    let level = levels.find((level) => level.id == id_level);
    $("#name_edit").val(level.name);
    $("#desc_edit").val(level.description);

    $("#edit-level").on("click", async (e) => {
      try {
        let data = {
          id: id_level,
          name: $("#name_edit").val(),
          description: $("#desc_edit").val(),
        };
        await $.post("http://localhost:3000/level/edit", data);
      } catch (error) {
        console.log(error);
      }
    });
  });
});

$(function () {
  $("#example1").DataTable();

  $("#example2").DataTable({
    paging: true,

    lengthChange: false,

    searching: false,

    ordering: true,

    info: true,

    autoWidth: false,
  });
});
