//#region Copy to clipboard
// Helped by: https://stackoverflow.com/a/30810322
export async function copyTextToClipboard(text: string) {
    await navigator.clipboard.writeText(text).then(function () {
        console.log("Copying to clipboard was successful!");
    }, function (err) {
        console.error("Could not copy text: ", err);
    });
}
//#endregion