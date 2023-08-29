function defineColor(type) {
  switch (type) {
    case "grass": {
      return "#77c850";
    }

    case "fire": {
      return "#ee7f30";
    }

    case "water": {
      return "#678fee";
    }

    case "eletric": {
      return "#f7cf2e";
    }

    case "ice": {
      return "#98d5d7";
    }

    case "ground": {
      return "#dfbf69";
    }

    case "flying": {
      return "#a98ff0";
    }

    case "poison": {
      return "#a040a0";
    }

    case "fighting": {
      return "#bf3029";
    }

    case "psychic": {
      return "#f65687";
    }

    case "dark": {
      return "#725847";
    }

    case "rock": {
      return "#b8a137";
    }

    case "bug": {
      return "#a8b720";
    }

    case "ghost": {
      return "#6e5896";
    }

    case "steel": {
      return "#b9b7cf";
    }

    case "dragon": {
      return "#6f38f6";
    }

    case "fairy": {
      return "#f9aec7";
    }

    default:
      return "#a6a877";
  }
}

class PokeApi {
  pokemons = []
  pokemons = [];
  limit = 0;
  offset = 0;

  constructor() {}

  async getPokemons() {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`);
      const result_1 = await res.json();

      return result_1.results;
    } catch (err) {
      return console.log(err);
    }
  }

  async getSinglePokemon(pokemonUrl) {
    try {
      const res = await fetch(pokemonUrl);
      const result = await res.json();
      return result;
    } catch (err) {
      return console.log(err);
    }
  }

  async pokemonObject(pokemonUrl) {
    try {
      const oldModelPokemon = await this.getSinglePokemon(pokemonUrl);
      const typesPokemon = [];

      oldModelPokemon.types.map((type) => {
        typesPokemon.push(type.type.name);
      });

      const newModelPokemon = {
        id: oldModelPokemon.id,
        name: oldModelPokemon.forms[0].name,
        types: typesPokemon,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${oldModelPokemon.id}.svg`,
        color: defineColor(oldModelPokemon.types[0].type.name),
        link: pokemonUrl,
        mainHability: oldModelPokemon.abilities[0].ability.name,
        experience: oldModelPokemon.base_experience,
        height: oldModelPokemon.height,
        weight: oldModelPokemon.weight,
      };

      this.pokemons.push(newModelPokemon);

      return;
    } catch (err) {
      return console.log(err);
    }
  }
}

const pokeApi = new PokeApi();
