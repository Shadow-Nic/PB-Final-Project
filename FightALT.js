import readline from 'readline-sync';
import { returnStats } from './gameStart.js';
import { generateBox } from './textfunc.js';

const randomNumber = () => Math.random() * (1 - 0.5) + 0.5; // Multiplier Player attack
const randomNumberNPC = () => Math.random() * (1.5 - 0.75) + 0.75; // Multiplier NPC attack

class Player {
    constructor(name, hp, mp, str) {
        this.name = name;
        this.str = str;
        this.hp = hp;
        this.mp = mp;
        this.kp = 50;
        this.Inventory = [
            { name: 'Mana Potion', typ: 'MP', Points: 50, quantity: 5 },
            { name: 'HP Potion', typ: 'HP', Points: 100, quantity: 3 },
            { name: 'Strengh Potion', typ: 'STR', Points: 5, quantity: 3 },
        ];
        this.Attacks = [
            { name: 'Normal Attack', mpCost: 0, multiplier: 1 },
            { name: 'Heavy Attack', mpCost: 10, multiplier: 2.5 },
            { name: 'Lighting Strike', mpCost: 80, multiplier: 8 },
        ];
        this.equipped = [];
    }
}

class NPC {
    constructor(name, hp, str) {
        this.name = name;
        this.hp = hp;
        this.str = str;
        this.droptable = [];
    }
}

const player1 = new Player('Champ', 100, 100, 20);
const npc1 = new NPC('Org', 100, 10);

function printTop(player, npc) {
    console.clear();

    generateBox(
        'center',
        20,
        3,
        `        ${npc.name}
        HP: ${npc.hp}`
    );

    returnStats();
}

// fight(player1, npc1);

export function fight(player, npc) {
    printTop(player, npc);
    console.log('1.Attack   2.Inventory ');
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
                console.log('Du hast keine items im Inventar');
                readline.question('Weiter...', { hideEchoBack: true, mask: '' });
                return;
            }
        //#####################################################################################
        default:
            fight(player, npc);
            break;
    }
}
function playerAttack(player, npc) {
    console.log('Player Attacks:');
    player.Attacks.forEach((attack, index) => {
        console.log(`${index + 1}. ${attack.name} - Manacost: ${attack.mpCost}`);
    });

    const playerChoice = readline.keyIn('Wähle deine Attacke: ', { limit: `$<1-${player.Attacks.length}>` });
    const selectedAttack = player.Attacks[playerChoice - 1];

    printTop(player, npc);
    if (selectedAttack.mpCost > player.mp) {
        console.log('Dein Mana reicht nicht aus, wähle einen anderen Angriff.');

        readline.question('Weiter...', { hideEchoBack: true, mask: '' });
        fight(player, npc);
    } else {
        const damage = Math.floor(player.str * selectedAttack.multiplier * randomNumber());
        npc.hp -= damage;

        console.log(`Player uses ${selectedAttack.name} on NPC! ${damage} damage`);

        player.mp -= selectedAttack.mpCost;
        if (npc.hp <= 0) {
            console.log('Player Gewinnt!');
            readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            console.clear();
            return;
        }

        NPCAttack(player, npc);
    }
}
function NPCAttack(player, npc) {
    let npcDamage = Math.floor(npc.str * randomNumberNPC());
    player.hp -= npcDamage;
    console.log(`NPC attacks Player! ${npcDamage} damage`);

    if (player.hp <= 0) {
        console.log(`${npc.name} Gewinnt!`);
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
    console.log('Wähle ein Item aus:');
    player.Inventory.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - ${item.typ}: +${item.Points} - Qty: ${item.quantity} `);
    });

    let playerChoice = readline.keyIn('Select your item: ', { limit: `$<1-${player.Inventory.length}>` });
    const selectedItem = player.Inventory[parseInt(playerChoice) - 1];
    //#####################################################################################################
    switch (playerChoice) {
        case '1':
            if (selectedItem.typ === 'MP') {
                player.mp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'HP') {
                player.hp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'STR') {
                player.str += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.quantity === 0) {
                player.Inventory.splice(parseInt(playerChoice) - 1, 1);
            }
            return;

        case '2':
            if (selectedItem.typ === 'MP') {
                player.mp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'HP') {
                player.hp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'STR') {
                player.str += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.quantity === 0) {
                player.Inventory.splice(parseInt(playerChoice) - 1, 1);
            }
            return;
        case '3':
            if (selectedItem.typ === 'MP') {
                player.mp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'HP') {
                player.hp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'STR') {
                player.str += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.quantity === 0) {
                player.Inventory.splice(parseInt(playerChoice) - 1, 1);
            }
            return;
        case '4':
            if (selectedItem.typ === 'MP') {
                player.mp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'HP') {
                player.hp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'STR') {
                player.str += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.quantity === 0) {
                player.Inventory.splice(parseInt(playerChoice) - 1, 1);
            }
            return;
        case '5':
            if (selectedItem.typ === 'MP') {
                player.mp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'HP') {
                player.hp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'STR') {
                player.str += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.quantity === 0) {
                player.Inventory.splice(parseInt(playerChoice) - 1, 1);
            }
            return;
        case '6':
            if (selectedItem.typ === 'MP') {
                player.mp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'HP') {
                player.hp += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.typ === 'STR') {
                player.str += selectedItem.Points;
                selectedItem.quantity--;
                console.log(`${selectedItem.name} wurde getrunken `);
            }
            if (selectedItem.quantity === 0) {
                player.Inventory.splice(parseInt(playerChoice) - 1, 1);
            }
            return;
        //####################################################################################################
        default:
            playerUseInventory(player, npc);
            break;
    }

    readline.question('Weiter...', { hideEchoBack: true, mask: '' });
    fight(player, npc);
}
