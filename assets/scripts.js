function getDataFromApi(callback, wordToCheck){
    //create new instance of XMLHttp request and assign it to a variable 
    var xhr = new XMLHttpRequest(); 
    //initialise the request
    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`);
    //send the request to the server
    xhr.send();
    //an event handler to take action when the server returns the request
    xhr.onreadystatechange = function() {
        //if the request has been completed (4) and has been successful (200)
        if (this.readyState == 4 && this.status == 200) {
            //the call back function is called 
            callback(JSON.parse(this.responseText));
        } else if (this.readyState == 4 && this.status == 404){
            console.log('This is not a word')
        }
    };

};

//create an event listener which listens for the submit button being pressed
//takes the text from the box and puts in the word variable which is then added
//to the url for the dictionary API

//get submit button
let submitButton = document.getElementById('wordChecker').children[1];
//add event listener to button for click event passing the collect word function
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    getDataFromApi(printDataConsole, collectWord());
} )


//function for collecting word from input box
function collectWord() {
        let wordToCheck = document.getElementById('wordToCheck').value;
        return wordToCheck;
};


function printDataConsole(data) {
    let answerDiv = document.getElementById('answerBox');
    console.log(data);
    answerDiv.innerText = `The word you entered was ${data[0].word}. This scores * points.`
};

