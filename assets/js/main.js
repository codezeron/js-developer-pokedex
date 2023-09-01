function toggleModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none"; // Feche a modal
}
document.addEventListener('DOMContentLoaded', async () => {
  const pokemonList = document.getElementById('pokemonList')
  const loadMoreButton = document.getElementById('loadMoreButton')



  const maxRecords = 151
  const limit = 10
  let offset = 0;

  let pokemonsdata = []; // Defina a variável para armazenar os pokemons

  async function showStatus(pokemonName) {
    const modal = document.getElementById("myModal");
    const modalContent = document.getElementById("modalContent");
    const modalImage = document.getElementById("modalImage");
    
    const pokemonDetail = pokemonsdata.find(element => element.name === pokemonName);
  
    const statusHtml = `
      <p>Altura: ${pokemonDetail.height}</p>
      <p>Peso: ${pokemonDetail.weight}</p>
      <p>Força: ${pokemonDetail.status.attack}</p>
      <p>Defesa: ${pokemonDetail.status.defense}</p>
      <p>Vida: ${pokemonDetail.status.hp}</p>
      <p>Velocidade: ${pokemonDetail.status.speed}</p>
    `;
  
    //modalContent.style.backgroundColor = `var(--${pokemonDetail.type})`;
    modalContent.classList = `modal-content ${pokemonDetail.type}`;
    modalImage.src = pokemonDetail.photo;
    document.getElementById("statusContent").innerHTML = statusHtml;
  
    modal.style.display = "block"; // Abra a modal
    
  }
  

  function attachStatusButtonListeners() {
    const statusButtons = document.querySelectorAll('.status-button');
    statusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pokemonName = button.getAttribute('data-pokemon');
            showStatus(pokemonName);
        });
    });
}

  function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail hidden">
        <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        <button class="status-button" data-pokemon="${pokemon.name}">Status</button>
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <div id="status-${pokemon.name}" class="hidden"></div>
        </div>
        </li>
        `;
  }




  function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      pokemonsdata = pokemons; // Armazene os pokemons na variável
      const newHtml = pokemons.map(convertPokemonToLi).join('')
      pokemonList.innerHTML += newHtml
      attachStatusButtonListeners();
    })
  }


  loadPokemonItens(offset, limit)

  loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
      const newLimit = maxRecords - offset
      loadPokemonItens(offset, newLimit)

      loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
      loadPokemonItens(offset, limit)
    }
  })




});