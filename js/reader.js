let reading = -1;

function openReader(key) {
    reading = key;
    titleSpan.innerHTML = noteManager.getNote(reading).title;
    bodyPre.innerHTML = noteManager.getNote(reading).body;
    viewReader();
}

function closeReader() {
    reading = -1;
    titleSpan.innerHTML = "";
    bodyPre.innerHTML = "";
    openList();
}

function viewInfo() {
    let dateCreatedString = getFormattedDate(new Date(noteManager.getNote(reading).key));
    let dateEditedString = getFormattedDate(new Date(noteManager.getNote(reading).edited));

    let info = "<p><b>Created:</b><br>";
    info += `${dateCreatedString}</p>`;
    info += "<p><b>Last edited:</b><br>";
    info += `${dateEditedString}</p>`

    new InformationBox(info).open();
}