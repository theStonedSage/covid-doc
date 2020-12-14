console.log("working");

function loadnext(){
    var evidence = [];
    $("select").each((index, element)=>{
        var opt = {
            id : element.name,
            choice_id: $(element).children("option:selected").val()
        }
        evidence.push(opt);
    })
    //ajax call to route
    if($("#type").val()=="group_single"){
        for(var i=0;i<evidence.length;i++){
            console.log("here");
            if(evidence[i].choice_id=="absent"){
                evidence.splice(i,1);
                i--;
            }
        }
    }
    if(evidence.length==0){
        if(!$("#selectone").hasClass("hide")){
            $("#selectone").addClass("hide");
        }
        $("#selectmore").removeClass("hide");
    }
    else if($("#type").val()=="group_single"&&evidence.length>1){
        if(!$("#selectmore").hasClass("hide")){
            $("#selectmore").addClass("hide");
        }
        $("#selectone").removeClass("hide");
    }
    else{
        console.log(evidence);
        let k={
            h:evidence,
        }
        var link="/update_evids";
        var saveData = $.ajax({
            type: "POST",
            url: link,
            data: k,
            dataType: "text",
            success: function(resultData){
                console.log('data sent');
                $('#about')[0].click();
            }
        });
        saveData.error(function() { alert("Something went wrong"); });
    }
    
}