// TODOS PAGE

showTodos();
$("#todoAdd").on('click', addTodo);
$("#deleteAll").on('click', deleteAllTodos);

function showTodos() {
    $("#all").empty();
    let todo_tmp = new Todo;
    todo_tmp.getAll().then(function (todos) {
        todos.forEach(function (todo) {
            if (todo.status === 2) {
                var checked = true;
            } else {
                var checked = false;
            }
            $("#all").append(createItem(todo.name, todo.id, checked))
        });
        $(".deleteTodo").on('click', deleteTodo);
        $(".status").on('click', toggleTodo);
    });
}

function addTodo() {
    var input = $("#todoInput");
    if(input.val()) {
        let todo = new Todo(input.val(), "", 0);
        todo.add();
    }
    input.val();
    showTodos()
}

function deleteTodo() {
    let todo = new Todo();
    todo.delete(this.parentElement.id);
    showTodos();
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
    showTodos()
}

function createItem(text, id, checked){
    let innerHtml = '<li id=' +  id + (checked ? ' class="done"' : "") + '>'
        + '<input type="checkbox" class="status"' + (checked? 'checked': '' )+ '/>'
        + '<span>' + text + '</span>'
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
    showTodos();
}

var refreshBrowser = function(){
    location = location;
};

// CO-WORKERS PAGE

// Go to co-workers page
$("#coworkers").on('click', function () {
    $("#todoContainer").addClass("hidden");
    $("#coworkersContainer").removeClass("hidden");
});

// Show coworkers
var coworkers = [
    {id: 1, firstname: "Noémie", lastname: "Foulon"},
    {id: 2, firstname: "Denis", lastname: "Lemoine"},
    {id: 3, firstname: "Caroline", lastname: "Fouquet"}
];

let coworkerItem = function (firstname, lastname, id) {
    let innerHTML = "<li>" + firstname + ' ' + lastname + "<button class='deleteCoworker' id=" + id  + ">Supprimer</button></li>";
    return innerHTML;
};

function showCoworkers() {
    $("#coworkersList").empty();
    coworkers.forEach(function (coworker) {
        $("#coworkersList").append(coworkerItem(coworker.firstname, coworker.lastname, coworker.id));
    });
}

showCoworkers();

// Add coworker
$("#addCoworker").on('click', function () {
    let firstnameInput = $("#firstname").val();
    let lastnameInput = $("#lastname").val();
    let coworker = {firstname: firstnameInput, lastname: lastnameInput};
    coworkers.push(coworker);
    showCoworkers();
});

// Delete coworker
$(".deleteCoworker").on('click', function () {
    for(let i=0;i<coworkers.length;i++) {
        if (coworkers[i].id === Number($(this).attr('id'))) {
            console.log('test2');
            coworkers.splice(i, 1);
        }
    }
    showCoworkers();
});
  