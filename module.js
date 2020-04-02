var updateStats = function(){
    $("#totalTodo").text(
       $(".todoList li").length
    );
    $("#remainTodo").text(
      $(".todoList li:not(.done)").length
    );
    if ($(".todoList li").length === 0){
        $(".todoList").addClass("empty")
    } else {
        $(".todoList").removeClass("empty")
    }
};

var todoItem = function(text,checked){
    var innerHtml = '<li' + (checked ? ' class="done"' : "") + '>'
        + '<input type="checkbox"' + (checked? 'checked': '' )+ '/>'
        + '<span>' + text + '</span>'
        + '<a href="javascript:" class="delete">delete</a>'
        + '</li>'
    return innerHtml;
};

var toggleTodo = function(){

    var $li = $(this);
    $li.toggleClass("done");
    $li.find('input[type="checkbox"]')
       .attr("checked",$li.hasClass('done'));

    updateStats();
};

var refreshBrowser = function(){
    location = location;
}

$(".todoList").on('click', "li", toggleTodo)
$(".todoList").on('click', ".delete", function(){
   $(this).closest('li').remove();
   updateStats();
})

// Add list
$("#todoAdd").on('click',function(){
    var $input = $("#todoInput");
    if ($input.val()){
        $(".todoList").append(todoItem(
            $input.val(), false //checked
        ));
        $input.val("");
    };
    updateStats();
})

// Delete All List
$("#deleteAll").on('click',function(){
    //var sureDelete = true;
    var sureDelete = confirm("Etes-vous sûr de vouloir supprimer toute la liste?");
    if(sureDelete){
        $('.todoList li').remove();
        updateStats();
    }
});

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


  