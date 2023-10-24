import fs from 'fs';
import Box from 'cli-box';
import readline from 'readline-sync';

const jsonData = fs.readFileSync('./config.json', 'utf8');
const fullStory = JSON.parse(jsonData);



class StoryPage {
    constructor(id, storyText, optionA, optionB) {
        this.id = id,
            this.storyText = storyText,
            this.optionA = optionA,
            this.optionB = optionB
    }
    generateText() {
        generateBox(`
        ${breakExpression(quickStory.storyText)}
        
        
        Was wollt ihr tun?
        `);

        let optis = [quickStory.optionA, quickStory.optionB]
        let labels = optis.map(option => option.optionText);
        let pathOption = readline.keyInSelect(labels, '-->', { cancel: false })
        console.clear();

        let snippet = new Option();
        Object.assign(snippet,optis[pathOption] )
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
    geneateFollowUp(){
        generateBox(breakExpression(this.effectText));
        readline.question('Weiter...', {hideEchoBack: true, mask: ''});
        console.clear();
        let nextStory =  generateStory(this.nextStep);
        console.clear();
        nextStory.generateText();


       
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
    }, text,
    );
    console.log(storyBox.stringify());
}

function generateStory(pageId) {
    let snippet = new StoryPage()
    Object.assign(snippet, fullStory.storyPages.find(x => x.id === pageId))

    snippet.optionA = fullStory.options.find(x => x.id === snippet.optionA)
    snippet.optionB = fullStory.options.find(x => x.id === snippet.optionB)

    //onsole.log(snippet)
    return snippet;
}


let quickStory = generateStory(1);


quickStory.generateText();
