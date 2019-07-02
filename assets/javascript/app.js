// doc.ready waits until document is loaded
$(document).ready(function() {

// create array for buttons
var monsArray = ['Godzilla', 'Dracula', 'Mothra'];
console.log(monsArray);

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
    queryURL = 'https://api.giphy.com/v1/gifs/search?q='+bID+'&api_key=Amn3QQghpSgmxrd4ayGLZt5GGXEFQAv7'
    console.log(queryURL);

    // make the API call to GIPHY w/ clicked URL
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    // create function that executes after the call being made - in this case populating the gifs div with 5 recieved gifs
    .then (function(response) {
        console.log(response);
        console.log(response.data[0].images);
        // define variables of the URL and 
        var gifURL = response.data[0].images.fixed_width.url;
        var gifRate = response.data[0].rating;
        var gifDiv = $('<div>');
        $(gifDiv).html('<br>Rating: ' +gifRate);
        var gifDisplay = $('<img>');
        // append the url from the API into the image tag
        gifDisplay.attr('src', gifURL);
        // prepend the recieved gif to gifs div
        $(gifDiv).prepend(gifDisplay);
        $('#gif').prepend(gifDiv);
    });

}

// create the onclick event and correlate it to monster buttons
$('.mon-button').on('click', monGif);


// closing doc.ready
});