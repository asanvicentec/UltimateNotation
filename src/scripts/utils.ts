//#region Copy to clipboard
export async function copyTextToClipboard(text: string) {
    await navigator.clipboard.writeText(text).then(function () {
        console.log("Copied successfully!");
    }, function (err) {
        console.error("Could not copy text: ", err);
    });
}
//#endregion