import fs from 'fs';
import Box from 'cli-box';
import readline from 'readline-sync';
import { Console } from 'console';
import { fight } from './FightALT.js';

readline.setDefaultOptions({ encoding: 'utf8' });
const jsonData = fs.readFileSync('./config.json', 'utf8');
const fullStory = JSON.parse(jsonData);

/// tests

class Player {
    constructor(name, hp, mp, str) {
        this.name = name;
        this.str = str;
        this.hp = hp;
        this.mp = mp;
        this.kp = 50;
        this.alive = 1;
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
const player = new Player('Champ', 100, 100, 20);
const npc1 = new NPC('Org', 30, 100);
/// ^ tests

let continueStory = true;

class StoryPage {
    constructor(id, storyText, optionIds, question) {
        (this.id = id), (this.storyText = storyText), (this.optionIds = optionIds), (this.question = question);
    }
    generateText() {
        returnStats();

        generateBox(
            'center',
            100,
            18,
            breakExpression(`
        ${this.storyText}
        
        
        ${this.question}
        `)
        );

        let labels = this.optionIds.map((option) => option.optionText);
        let pathOption = readline.keyInSelect(labels, '', { guide: false, cancel: false });
        console.clear();

        let snippet = new Option();
        Object.assign(snippet, this.optionIds[pathOption]);
        snippet.geneateFollowUp();
    }
}

class Option {
    constructor(id, optionText, event, effectText, nextStep) {
        (this.id = id),
            (this.optionText = optionText), // text der aktion zb hau auf kopf benutz item
            (this.event = event), // was passiert attack/ defend/ item use / nix / whatever
            (this.effectText = effectText), // text was wirklich passiert bei deiner Option, konsequenzen sozusagen
            (this.nextStep = nextStep); // folge der storyPage id
    }
    geneateFollowUp() {
        if (this.event !== 'default') {
            continueStory = false;
            eval(this.event);
            continueStory = true;
        }

        if (this.effectText && continueStory) {
            returnStats();
            generateBox('center', 100, 18, breakExpression(player.alive === 1 ? this.effectText : this.looseText));
            readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            console.clear();
        }
        if (player.alive === 0) {
            this.nextStep -= 1;
            player.alive++;
            player.hp = 100;
        }

        if (continueStory) {
            let nextStory = generateStory(this.nextStep);
            nextStory.generateText();
        }
    }
}

function intro() {}

export function returnStats() {
    return generateBox(
        'left',
        20,
        3,
        ` [HP: ${player.hp}][MP: ${player.mp}]
        
    [KP: ${player.kp}][STR: ${player.str}]
    `
    );
}

function breakExpression(text) {
    //"\$1\n" is the replacement string. \$1 is a special replacement pattern that inserts the text that was matched by the first
    return text.replace(/([.?!;,"])/g, '$1\n');
}
export function generateBox(direction, w, h, text) {
    let storyBox = new Box(
        {
            w: w,
            h: h,
            stringify: false,
            marks: {
                nw: '╭',
                n: '─',
                ne: '╮',
                e: '│',
                se: '╯',
                s: '─',
                sw: '╰',
                w: '│',
            },

            hAlign: direction,
            stretch: true,
            autoEOL: true,
        },
        text
    );
    console.log(storyBox.stringify());
}

function generateStory(pageId) {
    let snippet = new StoryPage();
    Object.assign(
        snippet,
        fullStory.storyPages.find((x) => x.id === pageId)
    );

    //check if optionIds are already objects or still Numbers
    if (!isNaN(snippet.optionIds[0])) {
        for (let [index, option] of snippet.optionIds.entries()) {
            snippet.optionIds[index] = fullStory.options.find((x) => x.id === snippet.optionIds[index]);
        }
    }
    //console.log(snippet)
    return snippet;
}

let quickStory = generateStory(1);
//console.log(quickStory)

quickStory.generateText();

// story Functions

function karma(int) {
    player.kp += int;
}

function shop(id) {
    let shoppingAt = fullStory.shops.find((x) => x.id === id);
    console.log('i have this items: ' + shoppingAt.itemIds);

    readline.question('Weiter...', { hideEchoBack: true, mask: '' });
}
