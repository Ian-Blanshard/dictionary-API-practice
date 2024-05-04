
//function which interacts with the API and 
function getDataFromApi(callback, wordToCheck){
    //create new instance of XMLHttp request and assign it to a variable 
    var xhr = new XMLHttpRequest(); 
    //initialise the request, using wordToCheck variable which is entered by a user
    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`);
    //send the request to the server
    xhr.send();
    //an event handler to take action when the server returns the request
    xhr.onreadystatechange = function() {
        //if the request has been completed (4) and has been successful (200)
        if (this.readyState == 4 && this.status == 200) {
            //the call back function is called 
            callback(JSON.parse(this.responseText));
            //if the status returned is 404 it wasn't located and the notAWord function runs
        } else if (this.readyState == 4 && this.status == 404){
            notAWord();
        }
    };

};

//create an event listener which listens for the submit button being pressed
//takes the text from the box and puts in the word variable which is then added
//to the url for the dictionary API

//get submit button and assign it to a variable
let submitButton = document.getElementById('wordChecker').children[1];
//add event listener to button for click event on the submit button
submitButton.addEventListener('click', function(event) {
    //stop the page refreshing when the submit button is pressed
    event.preventDefault();
    //run the function which interacts with API, passing the callback
    //and the collect word function which gets the word from the user input
    getDataFromApi(correctWordEntered, collectWord());
} )


//function for collecting word from input box
function collectWord() {
        let wordToCheck = document.getElementById('wordToCheck').value;
        return wordToCheck;
};

//function to alert user that their answer was not found in the dictionary
function correctWordEntered(data) {
    let answerDiv = document.getElementById('answerBox');
    answerDiv.innerText = `The word you entered was ${data[0].word}. This scores * points.`
};

function notAWord() {
    let answerDiv = document.getElementById('answerBox');
    answerDiv.innerText = `The word you entered does not score as it does not exist in the english dictionary`
};