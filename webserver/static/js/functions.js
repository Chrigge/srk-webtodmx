function startColorwheel(){
     // Responsive sizing of the color wheel
     var colorwheelSize = Math.min(window.innerWidth,window.innerHeight)*0.8;
     // Initialise color wheel
     var cw = Raphael.colorwheel($("#colorwheelInput .colorwheel")[0],colorwheelSize,100);
     // Connect input field to color wheel
     cw.input($("#colorwheelInput input")[0]);

     // Define what to do when the color changes
     cw.onchange(function(color){
         console.log(color.hex)
         sendPOSTValue (color.hex)
     })
}


// Sends the color data to
function sendPOSTValue (inputData) {
    var request = $.ajax ({
        url: "/ajax",
        type: "POST",
        data: { "colorValue":inputData },
        success: function (result) {
            console.log (result);
        }
    })
    request.done (function (response, textStatus, jqXHR) {
        console.log ("Color sent to server (POST)");
    })
    request.fail (function (jqXHR, textStatus, errorThrown) {
        console.error ("Error: " + textStatus, errorThrown);
    })
}
