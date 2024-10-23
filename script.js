let baseUrl = "/ap-world"
function amsco(unit_,lesson_) {
    let content = $('#amscoTemplate')
    content.find('a').attr('href', baseUrl+'/unit'+unit_+'/lesson'+lesson_+'/Amsco_'+unit_+'.'+lesson_+'.pdf')
    content.find('a').text("Amsco "+lesson_+"."+unit_+" Reading")
    return content.html()
}
const params = new URLSearchParams(window.location.search);
let unit = params.get('unit')
let lesson = params.get('lesson')
if(unit != null) {
    $('#starter').hide()
    if(lesson == null) {

    } else {
        let amscoDiv = $('<div id="amscoDiv">')
        let contentDiv = $('<div id="amscoContentDiv">')
        contentDiv.html(amsco(unit,lesson))
        amscoDiv.append(contentDiv)
        $('#body').append(amscoDiv)
        console.log(amscoDiv)
    }
}