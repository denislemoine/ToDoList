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
  