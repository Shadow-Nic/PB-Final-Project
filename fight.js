import readline from 'readline-sync';
const randomNumber = () => Math.random() * (1 - 0.5) + 0.5; // Multiplier Player attack
const randomNumberNPC = () => Math.random() * (1.5 - 0.75) + 0.75; // Multiplier NPC attack

class Player {
    constructor(name, hp, mp, str) {
        this.name = name;
        this.hp = hp;
        this.mp = mp;
        this.str = str;
    }
}
const playerAttacks = [
    { name: 'Normal Attack', mpCost: 0, multiplier: 1 },
    { name: 'Heavy Attack', mpCost: 10, multiplier: 2.5 },
    { name: 'Lighting Strike', mpCost: 80, multiplier: 8 },
];
const playerInventory = [
    { name: 'Mana Potion', Points: 50, typ: 1 },
    { name: 'HP Potion', Points: 100, typ: 2 },
];

const player1 = new Player('Player 1', 1000, 100, 20);
const npc1 = new Player('NPC', 1000, 100, 10);

function printTop(player, npc) {
    console.clear();
    console.log(
        `${player.name}         ${npc.name}\nHP: ${player.hp}         HP: ${npc.hp}\nMP: ${player.mp}          \nStr: ${player.str}            \n`
    );
}

fight(player1, npc1);

function fight(player, npc) {
    printTop(player, npc);
    console.log('1.Attack   2.Inventory ');
    let Choice = readline.question('\nEnter your choice: ');

    switch (Choice) {
        case '1':
            console.log('Player Attacken:');
            playerAttacks.forEach((attack, index) => {
                console.log(`${index + 1}. ${attack.name} - Manacost: ${attack.mpCost}`);
            });
            playerAttack(player, npc);
            break;

        case '2':
            console.log('Player Inventory:');
            playerInventory.forEach((item, index) => {
                console.log(`${index + 1}. ${item.name} - effect: +${item.Points}`);
            });
            playerUseInventory(player, npc);

        default:
            fight(player, npc);
            break;
    }
}

function playerAttack(player, npc) {
    const playerChoice = parseInt(readline.question('\nWähle deine Attacke: '));
    const selectedAttack = playerAttacks[playerChoice - 1];
    if (playerChoice < 1 || playerChoice > playerAttacks.length + 1 || isNaN(playerChoice)) {
        console.log('ungültige eingabe, wähle eine der oben genannten attacken');
        playerAttack(player, npc);
    }
    if (selectedAttack.mpCost > player.mp) {
        console.log('Dein Mana ist nicht ausreichend, wähle eine andere Attacke');

        setTimeout(() => {
            fight(player, npc);
        }, 1000);
    }

    if (selectedAttack.mpCost <= player.mp) {
        let damage = Math.floor(player.str * selectedAttack.multiplier * randomNumber());
        npc.hp -= damage;
        console.log(`Player uses ${selectedAttack.name} on NPC! ${damage} damage`);
        player.mp -= selectedAttack.mpCost;

        setTimeout(() => {
            NPCAttack(player1, npc1);
        }, 1000);
    }

    if (npc.hp <= 0) {
        console.log('Player gewinnt!');
        return;
    }
}
function NPCAttack(player, npc) {
    let npcDamage = Math.floor(npc.str * randomNumberNPC());
    player.hp -= npcDamage;
    console.log(`NPC attacks Player! ${npcDamage} damage`);

    if (player.hp <= 0) {
        console.log('NPC wins!');
        return;
    }
    setTimeout(() => {
        console.clear();
        fight(player, npc);
    }, 1000);
}

function playerUseInventory(player, npc) {
    let playerChoice = readline.question('\nWähle dein Item: ');
    const selectedItem = playerInventory[parseInt(playerChoice) - 1];
    if (playerChoice < 1 || playerChoice > playerInventory.length + 1 || isNaN(playerChoice)) {
        console.log('ungültige eingabe, wähle eins der Items');
    }

    switch (playerChoice) {
        case '1':
            player.mp += selectedItem.Points;
            console.log('Mana Trank wurde getrunken');
            break;
        case '2':
            player.hp += selectedItem.Points;
            console.log('Hitpoints Trank wurde getrunken');
            break;
        default:
            playerUseInventory(player, npc);
            break;
    }
    setTimeout(() => {
        fight(player, npc);
    }, 1000);
}
