function startColorwheel(){
     var cw = Raphael.colorwheel($("#colorwheelInput .colorwheel")[0],1000,800);
     cw.input($("#colorwheelInput input")[0]);

     cw.onchange(function(color){
         console.log(color.hex);
     })

}
