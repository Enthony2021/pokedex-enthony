const pokemonsContainer = document.getElementsByClassName("pokemons")[0];
const urlString = window.location.href;

// Crie um objeto URL a partir da URL atual
const url = new URL(urlString);

// Use o objeto URLSearchParams para extrair os valores dos parâmetros
const id = parseInt(url.searchParams.get("id"));
console.log(typeof id);

function convertPokemonToHtml(
  name,
  id,
  img,
  ability,
  experience,
  heigth,
  weigth
) {
  return `
  <a>
      <span class="number">#${id}</span>
      <span class="name">${name}</span>
      
      <div class="detail">
        <ol class="types">
        </ol>

        <img src=${img}
        alt="pokemon">
      </div>
      <div class="about">
        <p>Ability: <span class="info">${ability}</span></p>
        <p>Experience: <span class="info">${experience}</span></p>
        <p>Height: <span class="info">${heigth}</span></p>
        <p>Weight: <span class="info">${weigth}</span></p>
      <div>
      </a>
  `;
}

function criaLiPokemon(color) {
  const liPokemon = document.createElement("li");
  liPokemon.classList.add("pokemon");

  // Adiciona a cor no backgroud onforme o pokemon
  liPokemon.style.backgroundColor = color;

  return liPokemon;
}

function loadMore(pokeApi, plusLimit, plusOffset) {
  if (pokeApi.pokemons.length < 151) {
    if (plusLimit) {
      pokeApi.limit += plusLimit;
    }

    if (plusOffset) {
      pokeApi.offset += plusOffset;
    }
  }

  pokeApi.getPokemons().then(async (pokemons = []) => {
    const listItems = [];

    // Captura e formata cada pokemon guardando em pokeApi.pokemons
    for (let pokemon of pokemons) {
      await pokeApi.pokemonObject(pokemon.url);
    }

    // Criando todo o HTML de cada pokemon
    for (let i = 0; i < pokeApi.pokemons.length; i++) {
      const { id, name, img, color, mainHability, experience, height, weight} = pokeApi.pokemons[i];

      // cria li do pokemon
      const liPokemon = criaLiPokemon(color);
      liPokemon.innerHTML = convertPokemonToHtml(name, id, img, mainHability, experience, height, weight);

      listItems.push(liPokemon);
    }

    // Inserindo os liPokemons no DOM
    for (let item of listItems) {
      pokemonsContainer.appendChild(item);
    }

    //Inserindo Types
    for (let i = 0; i < pokeApi.pokemons.length; i++) {
      const types = pokeApi.pokemons[i].types;

      types.forEach((type) => {
        document.getElementsByClassName("types")[i].innerHTML += `<li class="type">${type}</li>`;
      });
    }
  });
}

function calculoId(id) {
  const resto = id % 3;

  const result = parseInt(id/3);

  let idParams = 0;

  if (id < 1) return;

  if (resto === 0) {
    idParams = parseInt(id / 3);
  }

  if (resto === 2) {
    idParams = parseInt(1 + (id / 3));
  }

  if (resto === 1) {
    idParams = parseInt(resto + (id / 3));
  }

  idParams = (idParams * 3) - 2;
  return idParams;
}

const idParams = calculoId(id)

loadMore(pokeApi, 3, idParams-1);



