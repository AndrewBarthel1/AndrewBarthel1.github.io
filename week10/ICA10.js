let triviaBtn = document.querySelector("#js-new-quote").addEventListener('click', newTrivia);
const endpoint =  "https://trivia.cyberwisp.com/getrandomchristmasquestion";
let answerBtn = document.querySelector('#js-tweet').addEventListener('click', newAnswer);
let btnText = '';
const display = document.querySelector('#js-answer-text');



async function newTrivia() {
    try{
        const response = await fetch(endpoint);
        if(!response.ok)
        {
            throw Error(response.statusText);
        }
        const json = await response.json();
        displayTrivia(json["question"]);
        btnText = json["answer"];
        display.textContent = '';
    } catch (err) {
        console.log(err);
        alert('Trivia Failed');
    }
}

function displayTrivia(question){
    const questionText = document.querySelector('#js-quote-text');
    questionText.textContent = question;
}

function newAnswer() {
    display.textContent = btnText;
}

newTrivia();