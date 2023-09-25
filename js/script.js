let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const fetchR = async (id) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/region/${id}`
  );

  if (APIResponse.status === 200) {
    const region = await APIResponse.json();
    return region;
  }
};

const searchRegion = (id) => {
  if (id > 151 && id < 251) return 2;
  if (id > 251 && id < 386) return 3;
  if (id > 386 && id < 493) return 4;
  if (id > 493 && id < 649) return 5;
  if (id > 649 && id < 721) return 6;
  if (id > 721 && id < 808) return 7;
  if (id > 808 && id < 903) return 8;
  if (id > 903 && id < 1006) return 9;
  return 1;
};

const renderPokemon = async (pokemon) => {
  document.querySelector(".pokemon_name").innerHTML = "Loading...";
  document.querySelector(".pokemon_number").innerHTML = "?";

  const data = await fetchPokemon(pokemon);
  const region = await fetchR(searchRegion(data.id));
  var type = data.types.map((type) => type.type.name);

  if (data && region) {
    document.querySelector(".pokemon_image").style.display = "block";
    document.querySelector(".pokemon_name").innerHTML = data.name;
    document.querySelector(".pokemon_number").innerHTML = data.id;
    document.querySelector(".pokemon_image").src = data["sprites"]["front_default"];
    document.querySelector(".input_search").value = "";
    searchPokemon = data.id;

    document.querySelector(".modal_id").innerHTML = data.id;
    document.querySelector(".modal_name").innerHTML = data.name;
    document.querySelector(".weight").innerHTML = `Weight: ${data.weight}lbs`;
    document.querySelector(".height").innerHTML = `Height: ${data.height} feet`;
    document.querySelector(".modal_image").src = data["sprites"]["front_default"];
    document.querySelector(".xp").innerHTML = `Base Exp: ${data["base_experience"]}XP`;
    document.querySelector(".gen").innerHTML = `Region: ${region.name.toUpperCase()}`;

    if (type.length == 2) {
      document.querySelector(".modal_type").innerHTML = `Type: ${type[0].toUpperCase()} | ${type[1].toUpperCase()}`;
    } else {
      document.querySelector(".modal_type").innerHTML = `Type: ${type[0].toUpperCase()}`;
    }
  } else {
    document.querySelector(".pokemon_name").innerHTML = "Not found";
    document.querySelector(".pokemon_number").innerHTML = "???";
    document.querySelector(".pokemon_image").style.display = "none";
    document.querySelector(".input_search").value = "";
  }
};

document.querySelector(".form").addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(document.querySelector(".input_search").value.toLowerCase());
});

document.querySelector(".btn-next").addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

document.querySelector(".btn-prev").addEventListener("click", () => {
  searchPokemon -= 1;
  renderPokemon(searchPokemon);
  if (!searchPokemon) {
    searchPokemon = 1;
    renderPokemon(searchPokemon);
  }
});

const openModalButton = document.querySelector(".information");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
  renderPokemon(searchPokemon);
};

[openModalButton, closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModal());
});

renderPokemon(searchPokemon);
