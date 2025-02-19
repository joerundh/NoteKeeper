let reading = 0;

function openReader(key) {
    reading = key;
    titleSpan.innerHTML = makePrintable(noteManager.getNote(reading).title);
    let body = noteManager.getNote(reading).body;
    bodyDiv.innerHTML += body.slice(1).reduce(
        (acc, curr) => acc + "<br>" + curr,
        body[0]);
    viewReader();
}

function clearReader() {
    titleSpan.innerHTML = "";
    bodyDiv.innerHTML = "";
}

function viewInfo() {
    let dateCreatedString = getFormattedDate(new Date(noteManager.getNote(reading).key));
    let dateEditedString = getFormattedDate(new Date(noteManager.getNote(reading).edited));

    let info = "<p><b>Created:</b><br>";
    info += `${dateCreatedString}</p>`;
    info += "<p><b>Last edited:</b><br>";
    info += `${dateEditedString}</p>`

    informationBox(info);
}