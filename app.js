async function getData() {
  try {
    let searchTerm = document.getElementById('site-search').value;
    let url = `https://rickandmortyapi.com/api/character?name=${searchTerm}`;
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    let data = await response.json();

    data.results.forEach((character) => {
      if (character.episode.length > 25) {
        character.role = 'main';
      } else {
        character.role = 'side';
      }
    });

    const newResults = data.results.filter((aliveChar) => {
      if (aliveChar.status === 'Alive') {
        return aliveChar;
      }
    });

    console.log(newResults);

    const cards = document.querySelector('.container');

    function generateCard() {
      newResults.forEach((character) => {
        let pronoun = '';
        if (character.gender === 'Female') {
          pronoun = 'she';
        } else if (character.gender === 'Male') {
          pronoun = 'he';
        } else {
          pronoun = 'it';
        }
        cards.innerHTML += `<div class="card">
        <img src="${character.image}" alt="${character.name} name" />
        <div class="card-content">
        <h2>${character.name}</h2>
        <p>Species: ${character.species}</p>
        <p>Gender: ${character.gender}</p>
        <p>Origin: ${character.origin.name}</p>
        <p>Location: ${character.location.name}</p>
        <p>${character.name} is a ${character.role} character because ${pronoun} has participated in ${character.episode.length} episodes</p>
        </div>
      </div>`;
      });
    }
    generateCard();
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

getData();
