
///////// CLASS INDEPENDET FUNCTIONS
// Sends the color data to
function sendPOSTValue (inputValue) {
    console.log(inputValue);
    var request = $.ajax ({
        url: "/ajax",
        type: "POST",
        data: inputValue,
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

function makeMenu(){
     // initiate click function: only show the element clicked on if wanted
     var menuItems = $('#mainNav a');
     // is the show all devices checkbox clicked?
     var showAllDevs = $('#allDevs').prop('checked');

     if ( showAllDevs == true ) {
          $.each(menuItems, makeClickShowAll); //unbind event listeners
          $('.menuItem').css('display','block'); //display all items
     }
     else {
          $.each(menuItems, makeClickShowOne); //setup event listener
          if ( window.location.hash != '' ){ //check whether an item is addressed
               displayItem(window.location.hash); // display it
          }
          else {
               displayItem(menuItems[0].hash); // or display the first item
          }
     }

     function makeClickShowAll(number, item){ //unbind click event listener
          $(item).unbind('click');
     }

     function makeClickShowOne(number, item){ //bind event listener to only display the clicked element
          $(item).click(function(event){
               event.preventDefault(); // do not jump to item
               window.location.hash = event.target.hash; //set the hash in the url

               var pointingItem = item.hash; //get the id of the div to display
               displayItem(pointingItem); //display it
          });
     }

     function displayItem(item){ // displays the item given
                    $('.menuItem').css('display','none'); //hide all other items
                    $(item).css('display','inline-block'); //display the one clicked
                    $('html,body').scrollTop(0); //scroll to the top of the page
     }
}
