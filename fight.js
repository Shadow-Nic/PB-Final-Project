import readline from 'readline-sync';
const randomNumber = Math.random() * (1 - 0.5) + 0.5;
const randomNumberNPC = () => Math.random() * (1.5 - 0.75) + 0.75;

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
    { name: 'Heavy Attack', mpCost: 10, multiplier: 2 },
];
const player1 = new Player('Player 1', 1000, 100, 20);
const npc1 = new Player('NPC', 1000, 100, 10);

fight(player1, npc1);

function fight(player, npc) {
    console.clear();
    console.log(
        `${player.name}         ${npc.name}\nHP: ${player.hp}         HP: ${npc.hp}\nMP: ${player.mp}          \nStr: ${player.str}            \n`
    );
    console.log('Player Attacks:');
    playerAttacks.forEach((attack, index) => {
        console.log(`${index + 1}. ${attack.name} - Manacost: ${attack.mpCost}`);
    });

    playerAttack(player, npc);
}

function playerAttack(player, npc) {
    const playerChoice = parseInt(readline.question('Choose your attack (1 or 2):'));
    if (playerChoice < 1 || playerChoice > 2 || isNaN(playerChoice)) {
        console.log('Invalid choice. Please try again.');
    }
    const selectedAttack = playerAttacks[playerChoice - 1];
    let damage = Math.floor(player.str * selectedAttack.multiplier * randomNumber);
    npc.hp -= damage;
    console.log(`Player uses ${selectedAttack.name} on NPC! ${damage} damage`);

    if (npc.hp <= 0) {
        console.log('Player wins!');
        return;
    }
    setTimeout(() => {
        NPCAttack(player1, npc1);
    }, 1000);
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
