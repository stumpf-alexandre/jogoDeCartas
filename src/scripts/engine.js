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
    playerSides: {
        player: "player-cards",
        playerBox: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBox: document.querySelector("#computer-cards"),
    },
    actions:{
        button:document.getElementById("next-duel"),
    }
};

const pathImage = "./src/assets/icons/";

const cardData = [
    {
        id:0,
        name:"Blue Eyes White Dragon",
        type:"Paper",
        img:`${pathImage}dragon.png`,
        WinOf:[1],
        LoseOf:[2],
    },
    {
        id:1,
        name:"Dark Magician",
        type:"Rock",
        img:`${pathImage}magician.png`,
        WinOf:[2],
        LoseOf:[0],
    },
    {
        id:2,
        name:"Exodia",
        type:"Scissors",
        img:`${pathImage}exodia.png`,
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
    cardImage.setAttribute("src", `${pathImage}card-back.png`);
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if(fieldSide === state.playerSides.player) {
        /**selecionando o card para a batalha */
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });

        /**mostrando a carta no container esquerdo */
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(idCard);
        });
    }
    return cardImage;
}

/**função para setar minha carta e a do oponente */
async function setCardsField(cardId) {
    /**remove as cartas que não forão selecionadas para não alterarem o combate */
    await removeAllCardsImages();

    /**seleciona uma carta aleatoria para o computador */
    let computerCardId = await getRandomCardId();
    
    await showHiddenCardFieldsImages(true);

    await drawCardsInField(cardId, computerCardId);
    
    /**checa o resultado pelo id de quem ganhou*/
    let duelResults = await checkDuelResults(cardId, computerCardId);

    /**atualizar a pontuação */
    await updateScore();

    /**desenhar o botão conforme o resultado */
    await drawButton(duelResults);
}

/**função que incrementa o escore na tela */
async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

/**função que cria o botão e o texto do resultado da batalha na tela*/
async function drawButton(text) {
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
}

/**função que verifica quem ganhou e aumenta a pontuação do escore */
async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = "draw";
    let playerCard = cardData[playerCardId];

    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "win";
        state.score.playerScore++;
    }

    if (playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "lose";
        state.score.computerScore++;
    }

    await playAudio(duelResults);

    return duelResults;
}

/**função que remove todas as cartas, tanto do player quanto do computer, ao iniciar uma jogada*/
async function removeAllCardsImages() {
    let {computerBox, playerBox} = state.playerSides;
    let imgElements = computerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = playerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

/**função de mouse over quando passar o mouse na carta mostra a imagem da carta com seu nome e seu tipo*/
async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = `Atribute: ${cardData[index].type}`;
}

/**função que distribui cartas randomicamente para os jogadores */
async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

/**função que reseta o jogo */
async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "...";
    state.cardSprites.type.innerText = "...";
    state.actions.button.style.display = "none";
    await showHiddenCardFieldsImages(false);

    init();
}

/**função de audio para o jogo */
async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);

    try {
        audio.play();
    } catch {}
}

/**função que mostra imagens ocultas e vice versa */
async function showHiddenCardFieldsImages(value) {
    if (value === true) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    }

    if (value === false) {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

/**função que seta as imagens no campo de batalha */
async function drawCardsInField(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

/**função principal de iniciar as outras funções */
function init() {
    showHiddenCardFieldsImages(false);

    drawCards(5, state.playerSides.player);
    drawCards(5, state.playerSides.computer);
}

init();