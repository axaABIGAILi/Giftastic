// doc.ready waits until document is loaded
$(document).ready(function() {

// create array for buttons
var monsArray = ['Godzilla','Dracula', 'Mothra'];

for ( var i = 0; i < monsArray.length; i++) {
    var monBtn = $('<button>');
    $(monBtn).text(monsArray[i]);
    $(monBtn).addClass('mon-button');
    $(monBtn).attr('id', monsArray[i]);
    $('#mon-buttons').append(monBtn);
}

//capture input typed into the input box
function newMon () {
    var newMon = $('#mon-input').val();
    monsArray.push(newMon);
    // create a new button
    var newBtn = $('<button>')
    // add the required class and text
    $(newBtn).addClass('mon-button');
    $(newBtn).attr('id', newMon);
    $(newBtn).text(newMon);
    // append the button to the buttons div
    $('#mon-buttons').append(newBtn);
    $('#mon-input').text('');
}

// run newMon on click for the submit button
$('#mon-submit').on('click', newMon);

// declare a variable to be populated via user click input
var bID;
var queryURL;
// function to get the value of the clicked button and plug in bID and put it in the query
function monGif () {
    bID = $(this).attr('id');
    console.log(bID);
    // plug bID into the queryURL
    queryURL = 'https://api.giphy.com/v1/gifs/search?q='+bID+'&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10'
    console.log(queryURL);

    // make the API call to GIPHY w/ clicked URL
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    // create function that executes after the call being made - in this case populating the gifs div with 5 recieved gifs
    .then (function(response) {
        // make a loop to return 10 images
        for ( j = 0; j < 10; j++) {
        // define variables of the URL and 
        var gifURL = response.data[j].images.fixed_width.url;
        var gifRate = response.data[j].rating;
        var gifDiv = $('<div>');
        $(gifDiv).html('<br>Rating: ' +gifRate);
        var gifDisplay = $('<img>');
        // append the url from the API into the image tag
        gifDisplay.addClass('gif');
        gifDisplay.attr('src', response.data[j].images.fixed_width_still.url);
        gifDisplay.attr('data-still',response.data[j].images.fixed_width_still.url);
        gifDisplay.attr('data-animated', gifURL);
        gifDisplay.attr('data-state', 'still')
        // prepend the recieved gif to gifs div
        $(gifDiv).prepend(gifDisplay);
        $('#gif').prepend(gifDiv);
        }
    });

}

// create the onclick event and correlate it to monster buttons
$(document).on('click', '.mon-button', monGif);

// create function to play and pause gifs
function gifPause () {
    var state = $(this).attr('data-state');
    console.log(state);
    var animated = $(this).attr('data-animated');
    var still = $(this).attr('data-still');
  

    if (state === 'still') {
      $(this).attr('src', animated);
      $(this).attr('data-state', 'animated');
    } else {
      $(this).attr('src', still);
      $(this).attr('data-state', 'still')
    }
}

$(document).on('click', '.gif', gifPause);


// closing doc.ready
});