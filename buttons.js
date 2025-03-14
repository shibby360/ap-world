let baseUrl = "/ap-world";
if(document.location.host !== "shibby360.github.io") {
    baseUrl = "";
}
const params = new URLSearchParams(window.location.search);
let unit = params.get('unit');
let topic = params.get('topic');
let maxUnit = 8;
// Units
for(i = 1; i <= maxUnit; i++) {
    let link = $(`<a href="${baseUrl+'?unit='+i}" ${i == unit ? "style='color:red;'" : ""}>Unit ${i}</a><span>&nbsp;&nbsp;</span>`)
    $('#unitbuttons').append(link)
}
// topics
if(unit !== null) {
    $('#topicbuttons').html('')
    let link = $(`<a href="${baseUrl+'?unit='+unit}">Unit home</a><span>&nbsp;&nbsp;</span>`)
    $('#topicbuttons').append(link)
    topics = topicsInUnit["unit"+unit]
    for(i = 1; i < topics+1; i++) {
        let link = $(`<a href="${baseUrl+'?unit='+unit+'&topic='+i}" ${i == topic ? "style='color:red;'" : ""}>Topic ${unit}.${i}</a><span>&nbsp;&nbsp;</span>`)
        $('#topicbuttons').append(link)
    }
}