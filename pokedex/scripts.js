const container = document.querySelector('#pokemon-container')
const loadBtn = document.querySelector('#loadBtn')
const prevBtn = document.querySelector('#prevBtn')
const nextBtn = document.querySelector('#nextBtn')

let offset = 0   // controla a página inicial
const limit = 12 // quantos Pokémon por página

// Mapeamento de cores por tipo
const typeColors = {
  normal: 'bg-gray-200',
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  grass: 'bg-green-400',
  electric: 'bg-yellow-300',
  ice: 'bg-cyan-200',
  fighting: 'bg-orange-500',
  poison: 'bg-purple-400',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-200',
  psychic: 'bg-pink-400',
  bug: 'bg-green-300',
  rock: 'bg-gray-400',
  ghost: 'bg-indigo-700',
  dark: 'bg-gray-700',
  dragon: 'bg-indigo-500',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-200'
}

// Função para buscar Pokémon
const pegarDados = async () => {
  try {
    const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    const pokemons = resposta.data.results

    container.innerHTML = ''

    for (const pokemon of pokemons) {
      const detalhe = await axios.get(pokemon.url)
      const data = detalhe.data

      // Tipo principal
      const primaryType = data.types[0].type.name
      const bgColor = typeColors[primaryType] || 'bg-gray-200'

      const div = document.createElement('div')
      div.className = `${bgColor} p-4 rounded-xl shadow-md flex flex-col items-center text-center hover:scale-105 transition transform`

      // Imagem
      const img = document.createElement('img')
      img.src = data.sprites.front_default
      img.alt = data.name
      img.className = 'w-24 h-24 mb-2'

      // Nome e ID
      const name = document.createElement('h3')
      name.textContent = `#${data.id} ${data.name.toUpperCase()}`
      name.className = 'font-bold text-gray-800 mb-1'

      // Tipos
      const types = document.createElement('p')
      types.textContent = 'Tipo: ' + data.types.map(t => t.type.name).join(', ')
      types.className = 'text-gray-700 mb-1'

      // Altura e peso
      const heightWeight = document.createElement('p')
      heightWeight.textContent = `Altura: ${data.height / 10} m | Peso: ${data.weight / 10} kg`
      heightWeight.className = 'text-gray-600 text-sm mb-1'

      // Habilidades
      const abilities = document.createElement('p')
      abilities.textContent = 'Habilidades: ' + data.abilities.map(a => a.ability.name).join(', ')
      abilities.className = 'text-gray-600 text-sm'

      // Monta o card
      div.appendChild(img)
      div.appendChild(name)
      div.appendChild(types)
      div.appendChild(heightWeight)
      div.appendChild(abilities)

      container.appendChild(div)
    }

  } catch (error) {
    console.log('Erro ao buscar Pokémon:', error)
    container.innerHTML = `<p class="text-red-500 font-bold">Erro: ${error.message}</p>`
  }
}

// Eventos dos botões
loadBtn.addEventListener('click', () => {
  offset = 0
  pegarDados()
})

prevBtn.addEventListener('click', () => {
  if (offset > 0) {
    offset -= limit
    pegarDados()
  }
})

nextBtn.addEventListener('click', () => {
  offset += limit
  pegarDados()
})
