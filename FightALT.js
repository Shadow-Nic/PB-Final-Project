import readline from 'readline-sync';
import { returnStats } from './index.js';
import { generateBox } from './textfunc.js';

const randomNumber = () => Math.random() * (1.65 - 0.75) + 0.75; // Multiplier Player attack
const randomNumberNPC = () => Math.random() * (1.3 - 0.75) + 0.75; // Multiplier NPC attack

function printTop(player, npc) {
    console.clear();

    generateBox(
        'center',
        30,
        3,
        `        ${npc.name}
        HP: ${npc.hp}`
    );

    returnStats(player);
}

export function fight(player, npc) {
    printTop(player, npc);
    player.str = player.maxStr;
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
                playerUseInventory(player);
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

    let labels = player.Attacks.map((attack) => `${attack.name} - Manacost: ${attack.mpCost})`);

    let playerChoice = readline.keyInSelect(labels, 'Wählt eine Attacke: ', {
        guide: false,
        cancel: 'Attacken verlassen...',
    });

    if (playerChoice === -1) {
        fight(player, npc);
    } else {
        const selectedAttack = player.Attacks[playerChoice];

        printTop(player, npc);
        if (selectedAttack.mpCost > player.mp) {
            console.log('Euer Mana reicht nicht aus, wählt einen anderen Angriff.');

            readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            fight(player, npc);
        } else {
            const damage = Math.floor(player.str * selectedAttack.multiplier * randomNumber());
            npc.hp -= damage;
            generateBox(
                'center',
                100,
                8,
                `Ihr fügt euren Gegner mit ${selectedAttack.name} einen Schaden von ${damage} zu.`,
                false
            );

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
}

function NPCAttack(player, npc) {
    let npcDamage = Math.floor(npc.str * randomNumberNPC());
    player.hp -= npcDamage;
    // console.log(`${npc.name} greift euch an und fügt euch ${npcDamage} Schaden zu.`);

    generateBox('center', 100, 8, `${npc.name} greift euch an und fügt euch ${npcDamage} Schaden zu.`, false);

    if (player.hp <= 0) {
        console.log(`${npc.name} zermalmt euch!`);
        readline.question('Weiter...', { hideEchoBack: true, mask: '' });
        console.clear();
        if (player.str > player.maxStr) {
            player.str = player.maxStr;
        }
        player.alive = 0;
        return;
    }
    readline.question('Weiter...', { hideEchoBack: true, mask: '' });
    console.clear();
    fight(player, npc);
}

function playerUseInventory(player) {
    let labels = player.Inventory.map((item) => `x${item.quantity} ${item.name}  (+${item.Points} ${item.typ})`);

    let playerChoice = readline.keyInSelect(labels, 'Was möchtet ihr benutzen?', {
        guide: false,
        cancel: 'Inventar verlassen...',
    });

    if (playerChoice === -1) {
        return;
    }
    let selectedItem = player.Inventory[playerChoice];

    checkItem(player, selectedItem, playerChoice);

    //#####################################################################################################

    readline.question('Weiter...', { hideEchoBack: true, mask: '' });
    return;
}

function checkItem(player, selectedItem, playerChoice) {
    if (selectedItem.typ === 'MP') {
        if (player.mp === player.maxMp) {
            console.log('Ihr könnt nicht mehr Mana zu euch nehmen ');

            return;
        }
        player.mp += selectedItem.Points;
        selectedItem.quantity--;
        if (player.mp > player.maxMp + 1) {
            player.mp = player.maxMp;
        }
        console.log(`${selectedItem.name} wurde getrunken `);
    }
    if (selectedItem.typ === 'HP') {
        if (player.hp === player.maxHp) {
            console.log('Ihr könnt nicht mehr Leben zu euch nehmen ');

            return;
        }
        player.hp += selectedItem.Points;
        selectedItem.quantity--;
        if (player.hp > player.maxHp + 1) {
            player.hp = player.maxHp;
        }
        console.log(`${selectedItem.name} wurde getrunken `);
    }
    if (selectedItem.typ === 'STR') {
        if (player.str === player.maxStr * 1.5) {
            console.log('SOLL EUER BIZEPS PLATZEN SIR???');

            return;
        }
        player.str += selectedItem.Points;
        selectedItem.quantity--;
        if (player.str > player.maxStr * 1.5) {
            player.str = player.maxStr * 1.5;
        }
        console.log(`${selectedItem.name} wurde getrunken `);
    }
    if (selectedItem.quantity === 0) {
        player.Inventory.splice(parseInt(playerChoice), 1);
    }
}
