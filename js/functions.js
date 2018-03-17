function startColorwheel(){
     // Responsive sizing of the color wheel
     var colorwheelWidth = window.innerWidth*0.8;
     // Initialise color wheel
     var cw = Raphael.colorwheel($("#colorwheelInput .colorwheel")[0],colorwheelWidth,800);
     // Connect input field to color wheel
     cw.input($("#colorwheelInput input")[0]);

     // Define what to do when the color changes
     cw.onchange(function(color){
         console.log(color.hex);
     })
}
