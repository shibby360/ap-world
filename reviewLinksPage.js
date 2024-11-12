let baseUrl = "/ap-world";
if(document.location.host !== "shibby360.github.io") {
    baseUrl = "";
}
const params = new URLSearchParams(window.location.search);
let unit = params.get('unit');
let topic = params.get('topic');
let main = $('#links')
function putLinks(text) {
    let newLinksArr = text.replaceAll('\r','').split('\n')
    for(let link of newLinksArr) {
        let splitLink = link.split('|');
        let lnkRef = splitLink[1];
        let lnkTxt = splitLink[0] == "" ? splitLink[1] : splitLink[0];
        let linkDiv = $(`<div>
            <div><a style="margin:0;" href="${lnkRef}" target="_blank">${lnkTxt}</a><iframe src="${lnkRef}"></iframe></div>
            </div>`)
        $('#links').append(linkDiv);
    }
}
fetch(baseUrl+'/unit'+unit_+'/review-links').then(function(r) {
    r.text().then(putLinks)
})
