const search= document.querySelector(".search-bar");
const searchBtn= document.querySelector(".search-btn");
const info =document.querySelector(".info");
const newWords = document.querySelector(".new-words");
const containner = document.querySelector(".containner");




// searching the words
searchBtn.addEventListener('click',searchfn);

function searchfn(){
    let value = search.value;
    fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
      )
      .then((response)=> response.json())
      .then((json) => data(json));

      function data(response){
        let word = response[0].word;
        let define  = response[0].meanings[0].definitions[0].definition;
        let speech = response[0].meanings[0].partOfSpeech;
        let phoneticText = response[0].phonetic;
        let phoneticsText = response[0].phonetics[0].text;

        let synonyms = response[0].meanings[0].synonyms;
        let antonyms = response[0].meanings[0].antonyms;
        let phoneticsText1 = null;
        let soundUK = response[0].phonetics[0].audio;

        let soundUS = null; // initialize to null

        // check if the phonetics array has a second element
        if (response[0].phonetics.length > 1) {
          soundUS = response[0].phonetics[1].audio;
          phoneticsText1 = response[0].phonetics[1].text;
        }
    

        
          // creating a div to store search data
          const sDiv = document.createElement('div');
          sDiv.classList.add('search-data');
  
          let html= '';

          html += `<article>
          <p>Meaning of ${word} in English</p>
          <hr class="word-hr">
          <div>
          <h1 class="word">${word}</h1>
          <span class="speech">${speech}</span>
          <div class="sound-div">
          <span>UK</span>
          <span class="fa-solid fa-volume-high uk-sound"></span>
          <span>${phoneticText}</span>
          <span>US</span>
          <span class="fa-solid fa-volume-high us-sound hide"></span>
          <span>${phoneticsText}</span>
          </div>
          <hr>
          <p> definition: ${define}</p>
          <span> synonyms: ${synonyms}</span>
          <span class="antonyms"> antonyms: ${antonyms}</span>
          </div>
          </article>
          `;
          sDiv.innerHTML= html;

          containner.appendChild(sDiv);

        containner.removeChild(info);
      containner.removeChild(newWords);


      // play sound when the user clicks on the "uk-sound" element
      const uKSound = document.querySelector(".uk-sound");
      const audio = new Audio(soundUK);
      uKSound.addEventListener("click", function() {
        audio.play();
      });
      const uSSound = document.querySelector(".us-sound");
      const audio1 = new Audio(soundUS);
      uSSound.addEventListener("click", function() {
        audio1.play();
      });
      


      }
    
    };



    