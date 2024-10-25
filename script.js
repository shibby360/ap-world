function amsco(unit_,lesson_) {
    let content = $('#amscoTemplate');
    let amscoUrl = baseUrl+'/unit'+unit_+'/lesson'+lesson_+'/Amsco_'+unit_+'.'+lesson_+'.pdf'
    content.find('a').attr('href', amscoUrl);
    content.find('iframe').attr('src', amscoUrl);
    content.find('a').text("Amsco "+unit_+"."+lesson_+" Reading");
    return content.html();
}
function notes(unit_, lesson_) {
    let content = $('#notesTemplate');
    let notesUrl = baseUrl+'/unit'+unit_+'/lesson'+lesson_+'/notes'+unit_+'.'+lesson_+'.pdf'
    if(unit_ !== 1) {
        content.find('a').attr('href', notesUrl);
        content.find('a').text("Notes template for "+unit_+"."+lesson_);
        content.find('iframe').attr('src', notesUrl);
    } else {
        content.find('a').text("No notes template available");
    }
    return content.html();
}
if(unit !== null) {
    $('#starter').hide();
    if(lesson === null) {
        
    } else {
        let amscoDiv = $('<div id="amscoDiv" class="content">');
        amscoDiv.html(amsco(unit,lesson));
        $('#body').append(amscoDiv);
        let notesDiv = $('<div id="notesDiv" class="content">');
        notesDiv.html(notes(unit,lesson));
        $('#body').append(notesDiv)
    }
}