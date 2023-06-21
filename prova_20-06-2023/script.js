async function getRickandMorty() {
  // Obtém os dados dos personagens da API
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const characterData = await response.json();
  const characters = characterData.results.slice(0, 10); // Seleciona apenas os 10 primeiros personagens

  // Obtém as referências dos elementos HTML onde os cards e o formulário serão adicionados
  const cardsContainer = document.getElementById("cards-container");
  const formContainer = document.getElementById("form-container");

  // Cria um card para cada personagem e os adiciona ao container de cards
  characters.forEach((character) => {
    const card = createCard(character);
    cardsContainer.appendChild(card);
  });

  // Cria o formulário e o adiciona ao container de formulário
  const form = createForm();
  formContainer.appendChild(form);
}

function createForm() {
  // Cria um elemento <form>
  const form = document.createElement("form");

  // Define uma lista de inputs com suas respectivas labels e tipos
  const inputs = [
    { label: "Name:", type: "text" },
    { label: "Image URL:", type: "text" },
    { label: "Status:", type: "text" },
    { label: "Species:", type: "text" },
    { label: "Type:", type: "text" },
    { label: "Gender:", type: "text" },
  ];

  // Para cada input, cria uma label e um input correspondente e os adiciona ao formulário
  inputs.forEach((input) => {
    const label = document.createElement("label");
    label.textContent = input.label;

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", input.type);

    form.appendChild(label);
    form.appendChild(inputElement);
  });

  // Cria um botão para adicionar um novo personagem
  const addButton = document.createElement("button");
  addButton.textContent = "Add";
  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Obtém os valores dos inputs e cria um objeto de personagem
    const character = {
      name: form.elements[0].value,
      image: form.elements[1].value,
      status: form.elements[2].value,
      species: form.elements[3].value,
      type: form.elements[4].value,
      gender: form.elements[5].value,
    };
    // Chama a função addCharacter para adicionar o novo personagem
    addCharacter(character);
    form.reset(); // Limpa os valores dos inputs após adicionar o personagem
  });

  form.appendChild(addButton);
  return form;
}

function createCard(character) {
  // Cria um elemento <div> para o card do personagem
  const card = document.createElement("div");
  card.classList.add("card");

  // Cria um elemento <img> para a imagem do personagem
  const image = document.createElement("img");
  image.src = character.image;

  // Cria um elemento <h2> para o nome do personagem
  const nameElement = document.createElement("h2");
  nameElement.textContent = character.name;

  // Cria elementos <p> para exibir o status, espécie, tipo e gênero do personagem
  const statusElement = document.createElement("p");
  statusElement.textContent = `Status: ${character.status}`;

  const speciesElement = document.createElement("p");
  speciesElement.textContent = `Species: ${character.species}`;

  const typeElement = document.createElement("p");
  typeElement.textContent = `Type: ${character.type}`;

  const genderElement = document.createElement("p");
  genderElement.textContent = `Gender: ${character.gender}`;

  // Adiciona os elementos ao card
  card.appendChild(image);
  card.appendChild(nameElement);
  card.appendChild(statusElement);
  card.appendChild(speciesElement);
  card.appendChild(typeElement);
  card.appendChild(genderElement);

  return card;
}

function addCharacter(character) {
  // Obtém o container de cards
  const cardsContainer = document.getElementById("cards-container");
  // Cria um card para o novo personagem e o adiciona ao container
  const card = createCard(character);
  cardsContainer.appendChild(card);
}

// Chama a função para carregar os personagens de Rick and Morty
getRickandMorty();
