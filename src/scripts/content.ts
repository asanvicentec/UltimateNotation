const solfegeDictionary = {
    c: "DO",
    d: "RE",
    e: "MI",
    f: "FA",
    g: "SOL",
    a: "LA",
    b: "SI",
};
const solfegeList: string[] = ["DO", "RE", "MI", "FA", "SOL", "LA", "SI"];

const article: HTMLElement | null = document.querySelector('code');
// Cloning node so we don't mess with the dom
const articleClone: Node | undefined = article?.cloneNode(true)
// `document.querySelector` may return null if the selector doesn't match anything.
if (articleClone) {

    const song = articleClone.querySelector('pre')
    // Each song line includes it's own chords
    let songLines = song.children

    for (let i = 0; i < songLines.length; i++) {
        const scores: string[] = <string[]>Array.prototype.map.call(songLines[i].querySelectorAll('[data-name]'), function(t) { return t.textContent; })

        scores.forEach((e: string) => {
            
            const score = e.substring(0, 1)
            if (score !== undefined && score !== null) {

                // If for whatever reason both conditions fail we set type to undefined
                let regex: RegExp | undefined = undefined;
                // Any score that is not SOL
                if (solfegeDictionary[score.toLowerCase()].length == 2) {
                    regex = new RegExp(score + '\\w*([\r| ]{1}|$)', 'gmi');
                }
                // SOL Case
                else if (solfegeDictionary[score.toLowerCase()].length == 3) {
                    regex = new RegExp(score + '\\w*([\r| ]{1}|$)', 'gmi');
                }

                // Grab original score and replace it with Solfege representation
                let solfege: string = e.replace(score, solfegeDictionary[score.toLowerCase()]);
                
                //if(e === "Dm") debugger
                //If original score is actually a Solfege, the score has already been replaced, leave as is, otherwise replace it
                songLines[i].children[0].textContent = songLines[i].children[0].textContent
                    .replaceAll(regex, (originalScore: string) => solfegeList.includes(originalScore.replace(/\s+/g, '')) ? originalScore : solfege);


                //e = e.replace(score, solfegeDictionary[score.toLowerCase()])
            }

        })


        /*
        t[i].querySelectorAll('[data-name]').forEach(e => {
            const score = e.textContent.substring(0, 1)
            if (score !== undefined && score !== null) {

                let firstRegex = new RegExp('\\w*' + score + '\\w*(?<! )$', 'gi');

                let reg;
                if (solfegeDictionary[score.toLowerCase()].length == 2) {
                    reg = new RegExp('\\w*' + score + '\\w* ', 'gi');
                }
                else if (solfegeDictionary[score.toLowerCase()].length == 3) {
                    reg = new RegExp('\\w*' + score + '\\w*  ', 'gi');
                }

                let r = e.textContent.replace(score, solfegeDictionary[score.toLowerCase()]);
                console.log("score: " + r);

                console.log("original   : " + t[i].children[0].innerText);
                console.log("transformed: " + t[i].children[0].innerText.replace(reg, r));



                t[i].children[0].textContent = t[i].children[0].textContent.replace(reg, r);


                e.textContent = e.textContent.replace(score, solfegeDictionary[score.toLowerCase()])
            }
        });*/
        
    }
    console.log(song.innerText);
    copyTextToClipboard(song.innerText);
}

//#region Copy to clipboard
// Helped by: https://stackoverflow.com/a/30810322
function copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}
//#endregion