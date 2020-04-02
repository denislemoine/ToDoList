// MENU
$("#coworkersLink").on('click', goToCoworkers);

function goToCoworkers() {
    $("#todoContainer").addClass("hidden");
    $("#coworkersContainer").removeClass("hidden");
}


// TODOS PAGE
initColumn();
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
                })
            } else {
                $(column).append(createItem(todo.name, todo.id, checked));
            }
        });
        $(".deleteTodo").off('click');
        $(".deleteTodo").on('click', deleteTodo);
    });
}

function addTodo() {
    var input = $("#todoInput");
    if(input.val()) {
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

function deleteAllTodos(){
    var sureDelete = confirm("Êtes-vous sûr de vouloir supprimer toute la liste ?");
    if(sureDelete){
        let todo_tmp = new Todo;
        todo_tmp.getAll().then(function (todos) {
            todos.forEach(function (todo) {
                todo.delete(todo.id);
            })
        })
    }
    initColumn();
}

function createItem(text, id, checked, coworker, property){
    let innerHtml = '<li id=' +  id + ' class="card" property="' + property
        + '" mv-multiple mv-accepts="todo in_progress completed">'
        + '<span>' + text + '</span>'
        + '<span class="assigned">' + coworker + '</span>'
        + '<button class="deleteTodo">delete</button>'
        + '</li>';
    return innerHtml;
}

function toggleTodo(){
    let todo = new Todo;
    if(this.checked) {
        todo.updateStatus(this.parentElement.id, 2);
    } else {
        todo.updateStatus(this.parentElement.id, 0);
    }
    initColumn();
}

var refreshBrowser = function(){
    location = location;
};

// CO-WORKERS PAGE
$("#addCoworker").on('click', function () {
    console.log("click");
});

/*function showCoworkers() {
    $("#all").empty();
    let coworker_tmp = new userClass;
    coworker_tmp.getAll().then(function (users) {
        users.forEach(function (user) {
            $("#all").append(createItem(user.firstname, user.lastname, user.todos))
        });
        $("#addCoworker").on('click', addUser);
        $("#deleteCoworker").on('click', deleteUser);
    });
}*/

function addUser() {
    /* $("#addCoworker").click( function () {
         console.log("click");*/
    let firstnameInput = $("#firstname").val();
    let lastnameInput = $("#lastname").val();
    let user = new userClass(firstnameInput, lastnameInput, []);
    user.add();
    //});
    showCoworkers();
}

function deleteUser() {
    let user = new userClass();
    user.delete(this.parentElement.id);
    showCoworkers();
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

$(document).ready(function(){
    $("a.one").click( function(){
        $ ("body").removeClass('bg2 , bg3').addClass("bg1");
    });
    $("a.two").click( function(){
        $ ("body").removeClass("bg1 , bg3").addClass("bg2");
     });
     $("a.three").click( function(){
         $ ("body").removeClass("bg1 , bg2").addClass("bg3");
        });
});

// dropdown menu
$('li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(300).fadeIn(500);
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
  });