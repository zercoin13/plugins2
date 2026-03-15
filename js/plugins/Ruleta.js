(function() {
    var minNumber = 0; // Número mínimo de la ruleta francesa
    var maxNumber = 35; // Número máximo de la ruleta francesa
    var betAmount = 100; // Dinero apostado por el jugador

    function playRoulette() {
        if ($gameParty.gold() < betAmount) {
            $gameMessage.add("No tienes suficiente dinero para jugar.");
            return;
        }

        $gameMessage.add("Elige tu tipo de apuesta:");
        var choices = ["Número", "Par/Impar", "Rojo/Negro"];
        $gameMessage.setChoices(choices, 0, -1);
        $gameMessage.setChoiceCallback(function(betType) {
            setTimeout(function() {
                handleBetSelection(betType);
            }, 10);
        });
    }

    function handleBetSelection(betType) {
        if (betType === 0) { // Número
            var numberChoices = [];
            for (var i = minNumber; i <= maxNumber; i++) {
                numberChoices.push(i.toString());
            }
            $gameMessage.add("Elige un número entre " + minNumber + " y " + maxNumber + ":");
            $gameMessage.setChoices(numberChoices, 0, -1);
            $gameMessage.setChoiceCallback(function(choiceIndex) {
                setTimeout(function() {
                    var playerChoice = parseInt(numberChoices[choiceIndex], 10);
                    processRoulette(betType, playerChoice);
                }, 10);
            });
        } else if (betType === 1) { // Par/Impar
            $gameMessage.add("Elige Par o Impar:");
            $gameMessage.setChoices(["Par", "Impar"], 0, -1);
            $gameMessage.setChoiceCallback(function(choice) {
                setTimeout(function() {
                    processRoulette(betType, choice);
                }, 10);
            });
        } else if (betType === 2) { // Rojo/Negro
            $gameMessage.add("Elige Rojo o Negro:");
            $gameMessage.setChoices(["Rojo", "Negro"], 0, -1);
            $gameMessage.setChoiceCallback(function(choice) {
                setTimeout(function() {
                    processRoulette(betType, choice);
                }, 10);
            });
        }
    }

    function processRoulette(betType, playerChoice) {
        var rouletteResult = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        $gameMessage.add("La ruleta gira... y el número es: " + rouletteResult);

        $gameParty.loseGold(betAmount); // Restar la apuesta

        setTimeout(function() {
            if (betType === 0 && playerChoice === rouletteResult) {
                var prizeAmount = betAmount * 35; // Pagos típicos de la ruleta francesa
                $gameMessage.add("¡Felicidades! Has ganado " + prizeAmount + " monedas.");
                $gameParty.gainGold(prizeAmount);
            } else if ((betType === 1 && playerChoice === 0 && rouletteResult % 2 === 0 && rouletteResult !== 0) ||
                       (betType === 1 && playerChoice === 1 && rouletteResult % 2 !== 0)) {
                var prizeAmount = betAmount * 2;
                $gameMessage.add("¡Has ganado " + prizeAmount + " monedas con tu apuesta par/impar!");
                $gameParty.gainGold(prizeAmount);
            } else if ((betType === 2 && playerChoice === 0 && [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34].includes(rouletteResult)) ||
                       (betType === 2 && playerChoice === 1 && [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35].includes(rouletteResult))) {
                var prizeAmount = betAmount * 2;
                $gameMessage.add("¡Has ganado " + prizeAmount + " monedas con tu apuesta rojo/negro!");
                $gameParty.gainGold(prizeAmount);
            } else {
                $gameMessage.add("Lo siento, has perdido la apuesta.");
            }
        }, 10);
    }

    // Agregar el comando a los eventos comunes de RPG Maker MV
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "PlayRoulette") {
            playRoulette();
        }
    };
})();
