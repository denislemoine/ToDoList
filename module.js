var updateStats = function () {
    $("#totalTodo").text(
        $(".todoList li").length
    );
    $("#remainTodo").text(
        $(".todoList li:not(.done)").length
    );
    if ($(".todoList li").length === 0) {
        $(".todoList").addClass("empty")
    } else {
        $(".todoList").removeClass("empty")
    }
};

var todoItem = function (text, checked) {
    var innerHtml = '<li' + (checked ? ' class="done"' : "") + '>'
        + '<input type="checkbox"' + (checked ? 'checked' : '') + '/>'
        + '<span>' + text + '</span>'
        + '<a href="javascript:" class="delete">delete</a>'
        + '</li>'
    return innerHtml;
};

var toggleTodo = function () {

    var $li = $(this);
    $li.toggleClass("done");
    $li.find('input[type="checkbox"]')
        .attr("checked", $li.hasClass('done'));

    updateStats();
};

var refreshBrowser = function () {
    location = location;
}

$(".todoList").on('click', "li", toggleTodo)
$(".todoList").on('click', ".delete", function () {
    $(this).closest('li').remove();
    updateStats();
})
// Add list
$("#todoAdd").on('click', function () {
    var $input = $("#todoInput");
    if ($input.val()) {
        $(".todoList").append(todoItem(
            $input.val(), false //checked
        ));
        $input.val("");
    };
    updateStats();
})

// Delete All List
$("#deleteAll").on('click', function () {
    //var sureDelete = true;
    var sureDelete = confirm("Etes-vous sûr de vouloir supprimer toute la liste?");
    if (sureDelete) {
        $('.todoList li').remove();
        updateStats();
    }
});

// CO-WORKERS PAGE
$("#addCoworker").on('click', function () {
    console.log("click");
});

function showCoworkers() {
    $("#all").empty();
    let coworker_tmp = new userClass;
    coworker_tmp.getAll().then(function (users) {
        users.forEach(function (user) {
            $("#all").append(createItem(user.firstname, user.lastname, user.todos))
        });
        $("#addCoworker").on('click', addUser);
        $("#deleteCoworker").on('click', deleteUser);
    });
}

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

// Go to co-workers page
$("#coworkers").on('click', function () {
    $("#todoContainer").addClass("hidden");
    $("#coworkersContainer").removeClass("hidden");
});

// Show coworkers
var coworkers = [
    { id: 1, firstname: "Noémie", lastname: "Foulon" },
    { id: 2, firstname: "Denis", lastname: "Lemoine" },
    { id: 3, firstname: "Caroline", lastname: "Fouquet" }
];

let coworkerItem = function (firstname, lastname, id) {
    let innerHTML = "<li>" + firstname + ' ' + lastname + "<button class='deleteCoworker' id=" + id + ">Supprimer</button></li>";
    return innerHTML;
};

function showCoworkers() {
    $("#coworkersList").empty();
    coworkers.forEach(function (coworker) {
        $("#coworkersList").append(coworkerItem(coworker.firstname, coworker.lastname, coworker.todos));
    });
}

showCoworkers();

// Add coworker
$("#addCoworker").on('click', function () {
    console.log("click");
});

// Delete coworker
$(".deleteCoworker").on('click', function () {
    for (let i = 0; i < coworkers.length; i++) {
        if (coworkers[i].id === Number($(this).attr('id'))) {
            console.log('test2');
            coworkers.splice(i, 1);
        }
    }
    showCoworkers();
});
