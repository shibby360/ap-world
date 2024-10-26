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
    if(unit_ !== "1") {
        content.find('a').attr('href', notesUrl);
        content.find('a').text("Notes template for "+unit_+"."+lesson_);
        content.find('iframe').attr('src', notesUrl);
    } else {
        content.find('a').text("No notes template available");
    }
    return content.html();
}
function kbat(unit_) {
    let content = $('#kbatTemplate');
    let kbatUrl = kbatLinks["unit"+unit_]
    content.find('a').attr('href', kbatUrl);
    content.find('a').text("Unit "+unit_+" KBAT");
    return content.html();
}
function learningObjectives(unit_,lesson_,div) {
    fetch(baseUrl+'/unit'+unit_+'/learning-objectives').then(function(r) {
        r.text().then(function(text) {
            let objectives = "";
            let objectivesArray = text.split('\n\n')
            if(lesson_ != null) {
                objectives = objectivesArray[lesson_-1]   
            } else {
                objectives = text
            }
            let paragraph = $(`<p style="font-weight:bold;margin-bottom:2px;">Learning objectives:</p>`);
            div.append(paragraph);
            let objectivesP = $('<p style="margin:0;">'+objectives.replaceAll('\n','<br>')+'</p>');
            div.append(objectivesP);
        })
    })
}
if(unit !== null) {
    $('#starter').hide();
    if(lesson === null) {
        // unit overview page
        let kbatDiv = $('<div id="kbatDiv" class="content">');
        kbatDiv.html(kbat(unit));
        $('#body').append(kbatDiv);
        learningObjectives(unit,lesson,kbatDiv);
    } else {
        // lesson title
        let lessonTitle = $('<p id="lessontitle">Lesson '+unit+lesson+': '+lessonTitles['unit'+unit]['lesson'+lesson]+'</p>')
        $('#header').append(lessonTitle)
        // amsco section
        let amscoDiv = $('<div id="amscoDiv" class="content">');
        amscoDiv.html(amsco(unit,lesson));
        $('#body').append(amscoDiv);
        // notes section
        let notesDiv = $('<div id="notesDiv" class="content">');
        notesDiv.html(notes(unit,lesson));
        $('#body').append(notesDiv);
        // kbat section
        let kbatDiv = $('<div id="kbatDiv" class="content">');
        kbatDiv.html(kbat(unit));
        $('#body').append(kbatDiv);
        learningObjectives(unit,lesson,kbatDiv);
    }
}