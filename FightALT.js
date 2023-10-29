import readline from 'readline-sync';
import { returnStats } from './gameStart.js';
import { generateBox } from './textfunc.js';

const randomNumber = () => Math.random() * (1.75 - 0.75) + 0.75; // Multiplier Player attack
const randomNumberNPC = () => Math.random() * (1.3 - 0.75) + 0.75; // Multiplier NPC attack

function printTop(player, npc) {
    console.clear();

    generateBox(
        'center',
        20,
        3,
        `        ${npc.name}
        HP: ${npc.hp}`
    );

    returnStats(player);
}

export function fight(player, npc) {
    printTop(player, npc);
    console.log('1.Attacken   2.Inventar ');
    let Choice = readline.keyIn('Auswahl: ', { limit: '$<1-2>' });

    switch (Choice) {
        case '1':
            printTop(player, npc);
            playerAttack(player, npc);
            break;
        //####################################################################################
        case '2':
            printTop(player, npc);
            if (player.Inventory.length > 0) {
                playerUseInventory(player, npc);
            } else {
                console.log('Ihr habt nichts in eurem Rucksack');
                readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            }
        //#####################################################################################
        default:
            fight(player, npc);
            break;
    }
}
function playerAttack(player, npc) {
    console.log('Spieler Attacken:');
    player.Attacks.forEach((attack, index) => {
        console.log(`${index + 1}. ${attack.name} - Manacost: ${attack.mpCost}`);
    });

    const playerChoice = readline.keyIn('Wählt eine Attacke: ', { limit: `$<1-${player.Attacks.length}>` });
    const selectedAttack = player.Attacks[playerChoice - 1];

    printTop(player, npc);
    if (selectedAttack.mpCost > player.mp) {
        console.log('Euer Mana reicht nicht aus, wählt einen anderen Angriff.');

        readline.question('Weiter...', { hideEchoBack: true, mask: '' });
        fight(player, npc);
    } else {
        const damage = Math.floor(player.str * selectedAttack.multiplier * randomNumber());
        npc.hp -= damage;

        console.log(`Ihr fügt euren Gegner mit ${selectedAttack.name} einen Schaden von${damage} zu.`);

        player.mp -= selectedAttack.mpCost;
        if (npc.hp <= 0) {
            console.log('Ihr seid Siegreich!');
            readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            if (player.str > player.maxStr) {
                player.str = player.maxStr;
            }
            player.hp += Math.ceil((player.maxHp / 100) * 25);
            if (player.hp > player.maxHp) {
                player.hp = player.maxHp;
            }
            player.mp += Math.ceil((player.maxMp / 100) * 20);
            if (player.mp > player.maxMp) {
                player.mp = player.maxMp;
            }
            console.clear();
            return;
        }

        NPCAttack(player, npc);
    }
}
function NPCAttack(player, npc) {
    let npcDamage = Math.floor(npc.str * randomNumberNPC());
    player.hp -= npcDamage;
    console.log(`${npc.name} greift euch an und fügt euch ${npcDamage} Schaden zu.`);

    if (player.hp <= 0) {
        console.log(`${npc.name} zermalmt euch!`);
        readline.question('Weiter...', { hideEchoBack: true, mask: '' });
        console.clear();
        player.alive = 0;
        return;
    }
    readline.question('Weiter...', { hideEchoBack: true, mask: '' });
    console.clear();
    fight(player, npc);
}

function playerUseInventory(player, npc) {
    player.Inventory.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - ${item.typ}: +${item.Points} - Anzahl: ${item.quantity} `);
    });

    let playerChoice = readline.keyIn('\nWählt einen Gegenstand: ', { limit: `$<1-${player.Inventory.length}>` });
    const selectedItem = player.Inventory[parseInt(playerChoice) - 1];
    //#####################################################################################################
    switch (playerChoice) {
        case '1':
            checkItem(player, selectedItem, playerChoice);
            return;
        case '2':
            checkItem(player, selectedItem, playerChoice);
            return;
        case '3':
            checkItem(player, selectedItem, playerChoice);
            return;
        case '4':
            checkItem(player, selectedItem, playerChoice);
            return;
        case '5':
            checkItem(player, selectedItem, playerChoice);
            return;
        case '6':
            checkItem(player, selectedItem, playerChoice);
            return;
        case '7':
            checkItem(player, selectedItem, playerChoice);
            return;
        case '8':
            checkItem(player, selectedItem, playerChoice);
            return;
        case '9':
            checkItem(player, selectedItem, playerChoice);
            return;
        case '10':
            checkItem(player, selectedItem, playerChoice);
            return;
        //####################################################################################################
        default:
            playerUseInventory(player, npc);
            break;
    }

    readline.question('Weiter...', { hideEchoBack: true, mask: '' });
    fight(player, npc);
}

function checkItem(player, selectedItem, playerChoice) {
    if (selectedItem.typ === 'MP') {
        if (player.mp === player.maxMp) {
            console.log('Ihr könnt nicht mehr Mana zu euch nehmen ');
            readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            return;
        }
        player.mp += selectedItem.Points;
        selectedItem.quantity--;
        if (player.mp > player.maxMp + 1) {
            player.mp = player.maxMp;
        }
        console.log(`${selectedItem.name} wurde getrunken `);
        readline.question('Weiter...', { hideEchoBack: true, mask: '' });
    }
    if (selectedItem.typ === 'HP') {
        if (player.hp === player.maxHp) {
            console.log('Ihr könnt nicht mehr Leben zu euch nehmen ');
            readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            return;
        }
        player.hp += selectedItem.Points;
        selectedItem.quantity--;
        if (player.hp > player.maxHp + 1) {
            player.hp = player.maxHp;
        }
        console.log(`${selectedItem.name} wurde getrunken `);
        readline.question('Weiter...', { hideEchoBack: true, mask: '' });
    }
    if (selectedItem.typ === 'STR') {
        if (player.str === player.maxStr * 1.5) {
            console.log('SOLL EUER BIZEPS PLATZEN SIR???');
            readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            return;
        }
        player.str += selectedItem.Points;
        selectedItem.quantity--;
        if (player.str > player.maxStr * 1.5) {
            player.str = player.maxStr * 1.5;
        }
        console.log(`${selectedItem.name} wurde getrunken `);
        readline.question('Weiter...', { hideEchoBack: true, mask: '' });
    }
    if (selectedItem.quantity === 0) {
        player.Inventory.splice(parseInt(playerChoice) - 1, 1);
    }
}
