var temp = document.querySelector('.time');
var button = document.querySelector("button");
var words = document.querySelector(".words");
var timerDiv = document.querySelector(".time");
var scoreDiv = document.querySelector(".score");
var points = 0;
var spans;
var typed;
var seconds = 60;
// var spark = new Audio("http://k003.kiwi6.com/hotlink/qdpr7bioht/spark.mp3");

function countdown() {
    points = 0;
    var timer = setInterval(function(){
        button.disabled = true;
        seconds--;
        temp.innerHTML = seconds;
        if (seconds === 0) {
            alert("Game over! Your score is " + points);
            scoreDiv.innerHTML = "0";
            words.innerHTML = "";
            button.disabled = false;
            clearInterval(timer);
            seconds = 60;
            timerDiv.innerHTML = "60";
            button.disabled = false;
        }
    }, 1000);
}

function random() {
    words.innerHTML = "";
    // var random = Math.floor(Math.random() * (96 - 0 + 1)) + 0;
    var random = Math.floor(Math.random() * (100 + 1));
    var wordArray = list[random].split("");
    for (var i = 0; i < wordArray.length; i++) { //woorden bouwen met spans om de letters heen
        var span = document.createElement("span");
        span.classList.add("span");
        span.innerHTML = wordArray[i];
        words.appendChild(span);
    }
    spans = document.querySelectorAll(".span");
}


const list = ['ABELS','ABSCIS','AFBEELDING','AFGELEIDE','APOTHEMA','AS','ASSENSTELSEL','ASYMMETRIE','BIJECTIE',
    'BILINEAIR','BISSECTRICE','BREKINGSINDEX','COEFFICIENT','COLLINEAIR','COSECANS','COSINUS','COTANGENS','CURVE',
    'DALPARABOOL','DELER','DIFFERENTIAAL','DIMENSIE','DOORSNEDE','DRIEHOEK','EENTERM','ELLIPSOIDE','EVENWIJDIG',
    'EXPONENT','FACTOR','FILTER','FORMULE','FUNCTIE','GEMIDDELDE','GETAL','GRAAD','GRAAF','GROEP','HASSEDIAGRAM',
    'HOEK','HOEKPUNT','HOMOMORFISME','HOOGTELIJN','HULPSTELLING','HYPOTENUSA','DEMPOTENTIE','INFIMUM','INJECTIE',
    'INTEGRAAL','KEGEL','KEGELAS','KEGELVLAK','KOORDE','KROMME','KUBUS','KWADRAAT','LIJN','LIJNSTUK','LOG','LOGARITME',
    'LOODLIJN','MACHT', 'MANTISSE','MATRIX','NEVENHOEK','NORMAAL','OPVOLGER','PARABOOL','POLYEDER','POLYNOOM',
    'PRIEMGETAL','PRISMOIDE','PRONIKGETAL','QUOTIENT','RAAKLIJN','RADIX','RECHTE','REPETENT','RESTGETAL','RESULTANTE',
    'RING','SECANS','SIN','SINUS','SNIJPUNT','STOCHAST','STRAAL','SUPREMUM','TANGENS','TELLER','TENSOR','TRANSLATIE',
    'TROOP','VECTOR','VEELHOEK','VEELTERM','VERGELIJKING','VERZAMELING','WORTEL','ZIJDE','ZWAARTELIJN'];

button.addEventListener("click", function(e){
    countdown();
    random();
    button.disabled = true;
});


function typing(e) {
    typed = String.fromCharCode(e.which);
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].innerHTML === typed) { // check of letter in het woord zit
            if (spans[i].classList.contains("bg")) {
            } else if (spans[i].classList.contains("bg") === false && spans[i-1] === undefined || spans[i-1].classList.contains("bg") !== false ) { // if it dont have class, if it is not first letter or if the letter before it dont have class (this is done to avoid marking the letters who are not in order for being checked, for example if you have two "A"s so to avoid marking both of them if the first one is at the index 0 and second at index 5 for example)
                spans[i].classList.add("bg");
                break;
            }
        }
    }
    var checker = 0;
    for (var j = 0; j < spans.length; j++) { //Checkt of alle letters getypt zijn
        if (spans[j].className === "span bg") {
            checker++;
        }
        if (checker === spans.length) {
            points++; //verhoogt de punten
            scoreDiv.innerHTML = points; //voegt punten aan de punten div toe
            document.removeEventListener("keydown", typing, false);
            setTimeout(function(){
                words.className = "words"; // restart the classes
                random(); // give another word
                document.addEventListener("keydown", typing, false);
            }, 400);
        }

    }
}

document.addEventListener("keydown", typing, false);