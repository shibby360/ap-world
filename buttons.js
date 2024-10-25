let baseUrl = "/ap-world";
if(document.location.host !== "shibby360.github.io") {
    baseUrl = "";
}
const params = new URLSearchParams(window.location.search);
let unit = params.get('unit');
let lesson = params.get('lesson');
// Units
for(i = 1; i < 10; i++) {
    let link = $(`<a href="${baseUrl+'?unit='+i}">Unit ${i}</a><span>&nbsp;&nbsp;</span>`)
    $('#unitbuttons').append(link)
}
// lessons
lessons = lessonsInUnit["unit"+unit]
$('#lessonbuttons').html('')
for(i = 1; i < lessons+1; i++) {
    let link = $(`<a href="${baseUrl+'?unit='+unit+'&lesson='+i}">Lesson ${i}</a><span>&nbsp;&nbsp;</span>`)
    $('#lessonbuttons').append(link)
}