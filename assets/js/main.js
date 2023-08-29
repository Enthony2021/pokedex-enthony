const pokemonsContainer = document.getElementsByClassName("pokemons")[0];

function convertPokemonToHtml(name, id, img) {
  return `
    <a href="/pokemon.html?id=${id}">
      <span class="number">#${id}</span>
      <span class="name">${name}</span>

      <div class="detail">
        <ol class="types">
        </ol>

        <img src=${img}
        alt="pokemon">
      </div>
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
    for (let i = pokeApi.offset; i < pokeApi.pokemons.length; i++) {
      const { id, name, img, color, link } = pokeApi.pokemons[i];

      // cria li do pokemon
      const liPokemon = criaLiPokemon(color);
      liPokemon.innerHTML = convertPokemonToHtml(name, id, img, link);

      listItems.push(liPokemon);
    }

    // Inserindo os liPokemons no DOM
    for (let item of listItems) {
      pokemonsContainer.appendChild(item);
    }

    //Inserindo Types
    for (let i = pokeApi.offset; i < pokeApi.pokemons.length; i++) {
      const types = pokeApi.pokemons[i].types;

      types.forEach((type) => {
        document.getElementsByClassName("types")[
          i
        ].innerHTML += `<li class="type">${type}</li>`;
      });
    }
  });
}

loadMore(pokeApi, 8, 0);

document.getElementById("loadMore").addEventListener("click", () => {
  loadMore(pokeApi, 0, 8);
});
