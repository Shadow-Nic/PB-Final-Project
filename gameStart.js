import fs from 'fs';
import Box from 'cli-box';
import readline from 'readline-sync';
import { Console } from 'console';

const jsonData = fs.readFileSync('./config.json', 'utf8');
const fullStory = JSON.parse(jsonData);

let player = {
    hp: 100,
    karma: 5,
};

let continueStory = true;

class StoryPage {
    constructor(id, storyText, optionIds, question) {
        this.id = id,
            this.storyText = storyText,
            this.optionIds = optionIds,
            this.question = question
    }
    generateText() {
        generateBox(`
        ${this.storyText}
        
        
        ${this.question}
        `);


        let labels = this.optionIds.map(option => option.optionText);
        let pathOption = readline.keyInSelect(labels, '-->', { cancel: false })
        console.clear();

        let snippet = new Option();
        Object.assign(snippet, this.optionIds[pathOption])
        snippet.geneateFollowUp();

    }
}

class Option {
    constructor(id, optionText, event, effectText, nextStep) {
        this.id = id,
            this.optionText = optionText, // text der aktion zb hau auf kopf benutz item 
            this.event = event, // was passiert attack/ defend/ item use / nix / whatever 
            this.effectText = effectText, // text was wirklich passiert bei deiner Option, konsequenzen sozusagen 
            this.nextStep = nextStep // folge der storyPage id
    }
    geneateFollowUp() {
        if (this.event !== "default") {
            continueStory = false;
            eval(this.event)
            continueStory = true;       
        }
        if (this.effectText) {
            generateBox(this.effectText);
            readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            console.clear();
        }
        if(continueStory){
        let nextStory = generateStory(this.nextStep);
        nextStory.generateText();
        }

    }
}

function breakExpression(text) {
    //"\$1\n" is the replacement string. \$1 is a special replacement pattern that inserts the text that was matched by the first
    return text.replace(/([.?!;,"])/g, "\$1\n");
}
function generateBox(text) {
    let storyBox = new Box({
        w: 100,
        h: 20,
        stringify: false,
        marks: {
            nw: '╭',
            n: '─',
            ne: '╮',
            e: '│',
            se: '╯',
            s: '─',
            sw: '╰',
            w: '│'
        },

        hAlign: 'center',
        stretch: true,
        autoEOL: true,
    }, breakExpression(text) + player.karma,
    );
    console.log(storyBox.stringify());
}

function generateStory(pageId) {
    let snippet = new StoryPage()
    Object.assign(snippet, fullStory.storyPages.find(x => x.id === pageId))

    //check if optionIds are already objects or still Numbers
    if (!isNaN(snippet.optionIds[0])) {
        for (let [index, option] of snippet.optionIds.entries()) {
            snippet.optionIds[index] = fullStory.options.find(x => x.id === snippet.optionIds[index])
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
    player.karma += int;

    
}

function shop(id) {
    let shoppingAt = fullStory.shops.find(x => x.id === id)
    console.log("i have this items: " + shoppingAt.itemIds)

    readline.question('Weiter...', { hideEchoBack: true, mask: '' });
  
}
