// MENU
$("#coworkersLink").on('click', goToCoworkers);

function goToCoworkers() {
    $("#todoContainer").addClass("hidden");
    $("#coworkersContainer").removeClass("hidden");
}


// TODOS PAGE
initColumn();
initDragAndDrop();
$("#todoAdd").on('click', addTodo);
$("#deleteAll").on('click', deleteAllTodos);

function initColumn() {
    showTodos("#todoColumn", 0);
    showTodos("#ongoingColumn", 1);
    showTodos("#finishedColumn", 2);
}

function showTodos(column, status) {
    $(column).empty();
    let todo_tmp = new Todo;
    todo_tmp.getByStatus(status).then(function (todos) {
        todos.forEach(function (todo) {
            if (todo.status === 0) {
                var status = "todo";
            }
            if (todo.status === 1) {
                var status = "in_progress";
            }
            if (todo.status === 2) {
                var checked = true;
                var status = "completed";
            } else {
                var checked = false;
            }
            if (todo.coworker) {
                let coworkerTmp = new Coworker;
                coworkerTmp.getOne(todo.coworker).then(function (coworker) {
                    var coworkerName = coworker.firstname + ' ' + coworker.lastname;
                    $(column).append(createItem(todo.name, todo.id, checked, coworkerName, status));
                    $(".deleteTodo").off('click');
                    $(".deleteTodo").on('click', deleteTodo);
                    $(".assignCoworker").off('click');
                    $(".assignCoworker").on('click', showAssignForm);
                })
            } else {
                $(column).append(createItem(todo.name, todo.id, checked));
                $(".deleteTodo").off('click');
                $(".deleteTodo").on('click', deleteTodo);
                $(".assignCoworker").off('click');
                $(".assignCoworker").on('click', showAssignForm);
            }
        });
    })
}

function addTodo() {
    var input = $("#todoInput");
    if (input.val()) {
        let todo = new Todo(input.val(), "", 0);
        todo.add();
    }
    input.val("");
    initColumn();
}

function deleteTodo() {
    let todo = new Todo();
    todo.delete(this.parentElement.id);
    initColumn();
}

function deleteAllTodos() {
    var sureDelete = confirm("Êtes-vous sûr de vouloir supprimer toute la liste ?");
    if (sureDelete) {
        let todo_tmp = new Todo;
        todo_tmp.getAll().then(function (todos) {
            todos.forEach(function (todo) {
                todo.delete(todo.id);
            })
        })
    }
    initColumn();
}

function createItem(text, id, checked, coworker, property) {
    if(!coworker) {
        coworker = "Non assigné";
    }
    let innerHtml = '<li id=' + id + ' class="card" property="' + property
        + '" mv-multiple mv-accepts="todo in_progress completed">'
        + '<span>' + text + '</span>'
        + '<span class="assigned">' + coworker + '</span>'
        + '<button class="deleteTodo">delete</button>'
        + '<button class="assignCoworker">Assigner</button>'
        + '</li>';
    return innerHtml;
}

var refreshBrowser = function () {
    location = location;
};

function initDragAndDrop() {
    $(".todoList").sortable({
        connectWith: ".todoList",
        update: function(event, ui) {
            let todoTmp = new Todo;
            if(this.id === "todoColumn") {
                var newStatus = 0;
            } else if(this.id === "ongoingColumn") {
                var newStatus = 1;
            } else if(this.id === "finishedColumn") {
                var newStatus = 2;
            }
            todoTmp.updateStatus(ui.item[0].id, newStatus);
        }
    });
}

function showAssignForm() {
    $(this).off('click');
    let id = this.parentElement.id;
    let coworkerTmp = new Coworker;
    coworkerTmp.getAll().then(function (coworkers) {
        let optionsList = [];
        coworkers.forEach(function (coworker) {
            let option = '<option value="' + coworker.id + '">' + coworker.firstname + ' ' + coworker.lastname + '</option>';
            optionsList.push(option)
        });
        let select = '<select class="coworkerChoice">' + optionsList.join("") + '</select>';
        $('#' + id).append(select);
        $('#' + id + ' button.assignCoworker').on('click', function () {
            $(this).parent().find("select").remove();
            $(this).off('click');
            $(this).on('click', showAssignForm);
        });
        $('#' + id + ' select').off('change');
        $('#' + id + ' select').on('change', function () {
            let todo = new Todo;
            todo.updateCoworker(id, $(this).val());
            initColumn();
        });
    })
}


// CO-WORKERS PAGE
showCoworkers();

function showCoworkers() {
    $("#coworkersList").empty();
    let coworkers_tmp = new Coworker();
    coworkers_tmp.getAll().then(function (coworker) {
        coworker.forEach(function (cowork) {
            $("#coworkersList").append(coworkerItem(cowork.firstname, cowork.lastname, cowork.id));
        });
        $(".deleteCoworker").on('click', deleteCoworker);
    })
    $("#addCoworker").on('click', addCoworker);
}

function coworkerItem(firstname, lastname, id) {
    let innerHTML = "<li id =" + id + " >" + firstname + ' ' + lastname + "<button class='deleteCoworker'>Supprimer</button></li>";
    return innerHTML;
}


// test OK  
function addCoworker() {
    let firstnameInput = $("#firstname").val();
    let lastnameInput = $("#lastname").val();

    if (firstnameInput === "" || lastnameInput === "") {
        alert('veuillez mettre les informations du coworkers');
    }
    else {
        let coworker = new Coworker(firstnameInput, lastnameInput, []);
        coworker.add();
        showCoworkers();
    }
}


function deleteCoworker() {
    let coworker = new Coworker();
    coworker.delete(this.parentElement.id);
    showCoworkers();
}

// Modified Background

$(document).ready(function () {
    $("a.one").click(function () {
        $("body").removeClass('bg2 , bg3').addClass("bg1");
    });
    $("a.two").click(function () {
        $("body").removeClass("bg1 , bg3").addClass("bg2");
    });
});

// dropdown menu
$('li.dropdown').hover(function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(300).fadeIn(500);
}, function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});


//Search function


$("#search").on("keyup", search);

function search() {

    var value = $(this).val().toLowerCase();
     $("li").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}


