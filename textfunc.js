import Box from 'cli-box';

function splitText(text) {

    let words = text.split(' ');
    let lines = [];
    let line = '';

    for (let [index, word] of words.entries()) {

        if (line.length + word.length > 75 || line.length + word.length > 45 && /[,.?!]$/.test(words[index - 1])) { // adjust this value to control the width of the text
            lines.push(line);
            line = '';
        }
        line += (line ? ' ' : '') + word;
    }

    if (line) {
        lines.push(line);
    }

    const height = () => lines.length + 5 < 18 ? 18 : lines.length + 5;

    return [height(), lines.join('\n')];

}
function countInv(text) {
    let lines = text.split('\n').length;
    const height = () => lines + 5 < 18 ? 18 : lines + 5;

    return [height(), text]
}

export function generateBoxText(text) {
    generateBox('center', 100, ...splitText(text))
}

export function generateInventoryText(text) {
    generateBox('center', 100, ...countInv(text))
}

export function generateBox(direction, w, h, text, returny) {
    let storyBox = new Box({
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
            w: '│'
        },
        stretch: true,
        autoEOL: true,
        hAlign: direction,

    }, text,
    );
    if (returny) {
        return storyBox;
    } else { console.log(storyBox.stringify()); }

}

export function combineBox(box1, box2) {
    let box1Lines = box1.stringify().split('\n');
    let box2Lines = box2.stringify().split('\n');

    for (let i = 0; i < Math.max(box1Lines.length, box2Lines.length); i++) {
        let line1 = box1Lines[i] || '';
        let line2 = box2Lines[i] || '';
        console.log(line1 + line2);
    }

}


/*
      marks: {
          nw: '╔',
          n: '═',
          ne: '╗',
          e: '║',
          se: '╝',
          s: '═',
          sw: '╚',
          w: '║'
      }
  */



//generateBox('center', 100, ...splitText("Großes Leid bestimmt den Alltag der Menschen, die zwischen dem Machtspiel der Götter immer mehr aufgerieben werden. "))
