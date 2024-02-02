const modal = document.querySelector('.container');
let pokemonsFromHtml;

function getPokemonsFromHtmlList() {
pokemonsFromHtml = document.querySelectorAll('.pokemon')
    for (let index = 0; index < pokemonsFromHtml.length; index++) {
        pokemonsFromHtml[index].addEventListener('click', () => {
            abrirModal(index + 1);
            
        })
    }
}

window.addEventListener('load', () => {
    setTimeout(getPokemonsFromHtmlList, 150);
})

function abrirModal(index) {
    modal.classList.add('active')
    inserirModal(index);
}

function fecharModal() {
    modal.classList.remove('active')
}

function inserirModal(pokemonNumber) {
    getPokemon(pokemonNumber)

}

function pokemonDetailModal(pokemonDetail) {
    const pokemon = new PokemonDetail()
    pokemon.id = pokemonDetail.id
    pokemon.name = pokemonDetail.name

    const statsNames = pokemonDetail.stats.map((statSlot) => statSlot.stat.name)
    
    pokemon.stats = [statsNames]

    const baseStat = pokemonDetail.stats.map((base) => base.base_stat)
    pokemon.baseStats = [baseStat] 
    
    pokemon.height = pokemonDetail.height

    pokemon.weight = pokemonDetail.weight

    pokemon.type = pokemonDetail.types[0].type.name

    pokemon.image = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon;
}

function pokemonDetailModalToHtml(pokemon) {
   return `
    <div class="modal ${pokemon.type}">
        <h2>${pokemon.name}</h2>
        <div>
        <img src="${pokemon.image}" alt="Pokemon ${pokemon.name}" width="500" height="600">
        </div>
        <span>
        <ul>
            <li>${pokemon.stats[0][0]}: ${pokemon.baseStats[0][0]}</li>
            <li>${pokemon.stats[0][1]}: ${pokemon.baseStats[0][1]}</li>
            <li>${pokemon.stats[0][2]}: ${pokemon.baseStats[0][2]}</li>
            <li>${pokemon.stats[0][3]}: ${pokemon.baseStats[0][3]}</li>
            <li>${pokemon.stats[0][4]}: ${pokemon.baseStats[0][4]}</li>
            <li>${pokemon.stats[0][5]}: ${pokemon.baseStats[0][5]}</li>
        </ul>
        </span>
        <span>
        Altura: ${pokemon.height * 10} cm     Peso: ${pokemon.weight / 10} kg
        </span>
        <button class="btn-close" onclick="fecharModal()">Voltar</button>
    </div>
    `
}

function getPokemon (number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}/`

    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => jsonResponse)
    .then(pokemonDetailModal)
    .then(pokemonDetailModalToHtml)
    .then((pokemon) => modal.innerHTML = pokemon);
}