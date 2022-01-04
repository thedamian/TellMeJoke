
const synth = window.speechSynthesis;
const voices = synth.getVoices();
const voice = voices.find(voice => voice.name === 'Fiona');
const wordInput = document.getElementById("word");
const joketext = document.getElementById("joketext");
wordInput.focus();
const  tellJoke = async () => {
    let word = wordInput.value;
    let joke = "";

    const jokes =  await fetch("https://api.sampleapis.com/jokes/goodJokes/?q=" + word).then(x=> x.json());
    if (jokes.length)
    {
        //console.log("jokes",jokes)
        let whichJoke = Math.floor(Math.random() * jokes.length);
        let thisJoke = jokes[whichJoke];
        //console.log("thisJoke",thisJoke)
        joke = ` ${thisJoke.setup}. . .  ${thisJoke.punchline}`;
    } else {
        joke = `No ${word} Jokes  found`;
    }
    joketext.innerHTML = joke;
    const utterThis =    new SpeechSynthesisUtterance(joke);
    // Use the selected voice
    utterThis.voice = voice;

    // Change the pitch and pace
    utterThis.pitch = 1.5;
    utterThis.rate = 0.8;
    
    synth.speak(utterThis);
}