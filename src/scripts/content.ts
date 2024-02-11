import { copyTextToClipboard } from "./utils";
import { CopyType } from "./enum";



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

const articleClone: HTMLElement | undefined = article?.cloneNode(true) as HTMLElement;
// `document.querySelector` may return null if the selector doesn't match anything.

if (articleClone) {

    const song: HTMLElement | null = articleClone.querySelector('pre');
    // Each song line includes it's own chords
    let songLines: HTMLCollection = song!.children;

    for (let i = 0; i < songLines.length; i++) {
        const scores: string[] = <string[]>Array.prototype.map.call(songLines[i].querySelectorAll('[data-name]'), function (tag: HTMLElement) { return tag.textContent; });

        scores.forEach((e: string) => {

            const score: string = e.substring(0, 1);

            // If for whatever reason both conditions fail we set type to undefined
            let regex: RegExp | undefined = undefined;

            /* Not feeling like doing solfegeDictionary[score.toLowerCase() as keyof typeof solfegeDictionary], 
                there has to be a more elegant solution */
            const solfegeRepresentation: string = solfegeDictionary[score.toLowerCase()];

            // Any note that is not SOL
            if (solfegeRepresentation.length == 2) {
                regex = new RegExp(score + '\\w*([\r| ]{1}|$)', 'gmi');
            }
            // SOL Case
            else if (solfegeRepresentation.length == 3) {
                regex = new RegExp(score + '\\w*([\r| ]{2}|$)', 'gmi');
            }

            // Grab original score and replace it with Solfege representation
            let solfege: string = e.replace(score, solfegeRepresentation);

            let inlineChords = songLines[i].children[0].textContent;

            if (inlineChords && regex) {
                //If original score is actually a Solfege, the score has already been replaced, leave as is, otherwise replace it
                songLines[i].children[0].textContent = inlineChords.replaceAll(regex, (originalScore: string) =>
                    solfegeList.includes(originalScore.replace(/\s+/g, '')) ? originalScore : solfege);
            }

        });
    }
    copyTextToClipboard(song.innerText)
    

    chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
        switch (request.copySong) {
            case CopyType.basic:
                transposeBasic(song!);
                break;
            case CopyType.advanced:
                // transposeAdvanced();
                break;
            default:
                sendResponse({ response: "Incorrect copy type!"});
                
        }
        articleClone?.focus()
        
        song === null ? console.log("No song found") : await copyTextToClipboard(song.innerText);
    });
}

async function transposeBasic(song: HTMLElement) {
    await song.querySelectorAll('[data-name]').forEach(e => {
        if (e.textContent !== null) {
            const score = e.textContent.substring(0, 1)
            e.textContent = e.textContent.replace(score, solfegeDictionary[score.toLowerCase()])
        }
    });
}
