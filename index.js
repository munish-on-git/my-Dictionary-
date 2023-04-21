const search= document.querySelector(".search-bar");
const searchBtn= document.querySelector(".search-btn");
const info =document.querySelector(".info");
const newWords = document.querySelector(".new-words");
const containner = document.querySelector(".containner");
let definitionsArray = [];




// searching the words
searchBtn.addEventListener('click',searchfn);

function searchfn(){
    let value = search.value;
    fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
      )
      .then((response)=> response.json())
      .then((json) => {
        json.forEach((item) => {
          let word = item.word;
          let define = "";
          let speech = "";
          let phoneticText = "";
          let phoneticsText2 = null;
          let soundUK = "";
          let soundUS = "";
          let example = "";
          let synonyms = [];
          let antonyms = [];
      
          // check if meanings array exists and has at least one element
      if (item.meanings && item.meanings.length > 0) {
        define = item.meanings[0].definitions.map((definition) => {
          return `<p>${definition.definition}</p>`;
        }).join("");

        example = item.meanings[0].definitions.example.map((ex) => {
          return `<li>${ex.example}</li>`;
        }).join("");


        speech = item.meanings[0].partOfSpeech;


        // check if phonetics array exists and has at least one element
        if (item.phonetic && item.phonetic.length > 0) {
          phoneticText = item.phonetic;
          soundUK = item.phonetic.audio;

          // check if phonetics array has a second element
          if (item.phonetics && item.phonetics.length > 0) {
          item.phonetics.map((ph) =>{
            phoneticsText2 = ph.text;
            soundUS = ph.audio;
          })
            
          }

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
          <span>${phoneticsText2 ? phoneticsText2: ''}</span>
          </div>
          <hr>
          <p> ${define}</p>
          <div> 
          <ul>
            <li>${example}</li>
            </ul>
          </div>
          <div class="sy-an">
          <ul>
          <p>synonyms:</p>
          <li>${synonyms}</li>
          
          </ul>
          <ul>
          <p>antonyms :</p>
          <li>${antonyms}</li>
          
          </ul>
          </div>
          
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
  }
        )}

      )}
    



    