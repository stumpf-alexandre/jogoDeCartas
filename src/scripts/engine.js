/**definindo as states do jogo*/
const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    actions:{
        button:document.getElementById("next-duel"),
    },
};

const playerSides = {
    player: "player-cards",
    computer: "computer-cards"
};

const pathImage = "./src/assets/icons/";

const cardData = [
    {
        id:0,
        name:"Blue Eyes White Dragon",
        type:"Paper",
        img:pathImage + "dragon.png",
        WinOf:[1],
        LoseOf:[2],
    },
    {
        id:1,
        name:"Dark Magician",
        type:"Rock",
        img:pathImage + "magician.png",
        WinOf:[2],
        LoseOf:[1],
    },
    {
        id:2,
        name:"Exodia",
        type:"Scissors",
        img:pathImage + "exodia.png",
        WinOf:[0],
        LoseOf:[1],
    }
];

/**função que cria um numero randomico para o id da carta */
async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

/**função que seta a imagem aos cards dos jogadores conforme o id */
async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", pathImage + "card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if(fieldSide === playerSides.player) {
        /**selecionando a card para a batalha */
        cardImage.addEventListener("click", () => {
            setCardField(cardImage.getAttribute("data-id"))
        });

        /**mostrando a carta no container esquerdo */
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(idCard);
        });
    }
    return cardImage
}

/**função para setar minha carta e a do oponente */
async function setCardField(cardId) {
    /**remove as cartas que não forão selecionadas para não alterarem o combate */
    await removeAllCardsImages();

    /**seleciona uma carta aleatoria para o computador */
    let computerCardId = await getRandomCardId();
    
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    /**seta as aimagens no campo de batalha */
    state.fieldCards.player.src = cardData(cardId).img;
    state.fieldCards.computer.src = cardData(computerCardId).img;

    /**checa o resultado pelo id */
    let duelResults = await checkDuelResults(cardId, computerCardId);

    /**atualizar a pontuação */
    await updateScore();

    /**desenhar o botão conforme o resultado */
    await drawButton();
}

/**função de mouse over quando passar o mouse na carta */
async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Atribute: " + cardData[index].type;
}

/**função que distribui cartas randomicamente para os jogadores */
async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

/**função principal de iniciar as outras funções */
function init() {
    drawCards(5, playerSides.player);
    drawCards(5, playerSides.computer);
}

init();