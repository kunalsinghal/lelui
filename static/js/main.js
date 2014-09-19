function list_elements(){
    console.log("in the function");
    var highlighted = []; 
    $('.high').each(function(){
        highlighted.push(parseInt($(this).attr('id')));
    });
    console.log(highlighted);
    window.arr_list = []; 
    if (highlighted.length == 0)
        content = "-- None --"; 
    else {
        var prev = highlighted[0]; 
        window.arr_list[0] = [highlighted[0]];
        for(var i=1; i<highlighted.length; i++){
            if(highlighted[i] == prev + 1){
                prev += 1; 
                window.arr_list[window.arr_list.length-1].push(prev); 
            }
            else {
                prev = highlighted[i]; 
                window.arr_list.push([prev]);
            }
        }
        console.log(window.arr_list);
        var content = ""; 
        for(var i=0;i<window.arr_list.length;i++){
            content += "<p>"; 
            content += (i+1).toString();
            content += ". ";
            for(var j=0;j<window.arr_list[i].length; j++){
                content += $("#"+window.arr_list[i][j].toString()).html() + " "; 
            }
            content += "<button type='submit' class='btn remove' data-index='" +i.toString()+ "'>Remove</button>"
            content += "</p>"; 
        }
    }
    $("#list_elements").html(content);
}
$(document).ready(function(){
    list_elements();
    $('body').on('click', '.word', function(){
        $(this).toggleClass('high');
        list_elements();
    });
    $('body').on('click', '.remove', function(){
        var i = parseInt($(this).attr('data-index'));
        console.log(i);
        console.log(window.arr_list);
        for(var j = 0; j < window.arr_list[i].length; j++){
            var id = window.arr_list[i][j].toString();
            $('#' + id).toggleClass('high');
        }
        list_elements();
    });
    $('body').on('click', '#submit', function(){
        var lis = [];
        $('.word.high').each(function(){
            lis[lis.length] = $(this).attr('id').toString();
        });
    	console.log("in js clicker");
        console.log(lis.toString());
        $.ajax({
            type: "POST",
            data: {lis : lis.toString()},
            url: "recordAnnotation",
        }).done(function(data){
            data = JSON.parse(data);
            var content = "";
            content += "<h5> Once: " + data.once +  "</h5>";
            content += "<h5> Approved: " + data.approved +  "</h5>";
            content += data.instruction;
            content += data.sentence;
            content += data.buttons;
            $('#holder').html(content);
            list_elements();
        });
        list_elements();
    });
});
