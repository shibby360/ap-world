function reading(unit_,topic_) {
    let content = $('#readingTemplate');
    let amscoStuff = content.find('#amscoDiv')
    let amscoUrl = baseUrl+'/unit'+unit_+'/topic'+topic_+'/Amsco_'+unit_+'.'+topic_+'.pdf'
    amscoStuff.find('a').attr('href', amscoUrl);
    amscoStuff.find('iframe').attr('src', amscoUrl);
    amscoStuff.find('a').text("Amsco "+unit_+"."+topic_+" Reading");
    let wtwaStuff = content.find('#wtwaDiv')
    let pages = wtwaPages["unit"+unit_]
    for(let page of pages) {
        let li = $('<li>' + page + '</li>')
        wtwaStuff.find('ul').append(li)
    }
    return content.html();
}
function notes(unit_, topic_) {
    let content = $('#notesTemplate');
    let notesUrl = baseUrl+'/unit'+unit_+'/topic'+topic_+'/notes'+unit_+'.'+topic_+'.pdf'
    if(unit_ !== "1") {
        content.find('a').attr('href', notesUrl);
        content.find('a').text("Notes template for "+unit_+"."+topic_);
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
function learningObjectives(unit_,topic_,div) {
    fetch(baseUrl+'/unit'+unit_+'/learning-objectives').then(function(r) {
        r.text().then(function(text) {
            let objectives = "";
            let objectivesArray = text.replaceAll('\r','').split('\n\n')
            if(topic_ != null) {
                objectives = objectivesArray[topic_-1]   
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
function reviewLinks(unit_,div) {
    fetch(baseUrl+'/unit'+unit_+'/review-links').then(function(r) {
        r.text().then(function(text) {
            let paragraph = $(`<p style="font-weight:bold;margin-bottom:2px;">Review links: </p>`);
            div.prepend(paragraph);
            let overviewLink = $(`<a href="${overviewPages['unit'+unit_]}" target="_blank">Unit ${unit_} overview page</a>`)
            div.prepend(overviewLink)
            if(text === '') { 
                let txt = $('<p style="margin: 0;">none</p>')
                div.append(txt);
                return
            };
            let newLinksArr = text.replaceAll('\r','').split('\n')
            for(let link of newLinksArr) {
                let splitLink = link.split('|');
                let lnkRef = splitLink[1];
                let lnkTxt = splitLink[0] == "" ? splitLink[1] : splitLink[0];
                let linkEl = $(`<a style="margin:0;" href="${lnkRef}" target="_blank">${lnkTxt}</a>`);
                div.find('div').append(linkEl);
            }
        })
    })
}
if(unit !== null) {
    $('#starter').hide();
    if(topic === null) { // unit overview page
        // style
        $('#body').css('grid-template-rows', '1fr')
        // unit title
        let topicTitle = $('<p id="unittitle">Unit '+unit+": "+unitTitles['unit'+unit]+'</p>')
        $('#header').append(topicTitle)
        // kbat div
        let kbatDiv = $('<div id="kbatDiv" class="content">');
        kbatDiv.html(kbat(unit));
        $('#body').append(kbatDiv);
        learningObjectives(unit,topic,kbatDiv);
        // review links div
        let reviewDiv = $('<div id="reviewDiv" class="content">');
        reviewDiv.html($('#reviewTemplate').html())
        reviewLinks(unit,reviewDiv)
        $('#body').append(reviewDiv);
    } else {
        // topic title
        let topicTitle = $('<p id="topictitle">Topic '+unit+"."+topic+': '+topicTitles['unit'+unit]['topic'+topic]+'</p>')
        $('#header').append(topicTitle)
        // essential question
        let essentialQ = $('<p style="margin: 0;text-align: center;"></p>')
        let eqtext = "EQ: " + eqs["unit"+unit]["topic"+topic]+"?"
        let fontSize = eqtext.length > 50 ? "large" : "larger";
        essentialQ.text(eqtext)
        essentialQ.css('font-size', fontSize)
        $('#header').append(essentialQ)
        // amsco section
        let readingDiv = $('<div id="readingDiv">');
        readingDiv.html(reading(unit,topic));
        $('#body').append(readingDiv);
        // notes section
        let notesDiv = $('<div id="notesDiv" class="content">');
        notesDiv.html(notes(unit,topic));
        $('#body').append(notesDiv);
        // kbat section
        let kbatDiv = $('<div id="kbatDiv" class="content">');
        kbatDiv.html(kbat(unit));
        $('#body').append(kbatDiv);
        learningObjectives(unit,topic,kbatDiv);
        // review section
        let reviewDiv = $('<div id="reviewDiv" class="content">');
        reviewDiv.html($('#reviewTemplate').html());
        reviewLinks(unit,reviewDiv);
        $('#body').append(reviewDiv);
    }
}
