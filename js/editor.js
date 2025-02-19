let editing = 0;
let titleEdited = false;
let bodyEdited = false;
let changesSaved = false;

function openEditor(key) {
    if (key) {
        editing = key;
        titleInput.value = makePrintable(noteManager.getNote(key).title);
        let body = noteManager.getNote(key).body;
        bodyTextarea.innerHTML = body.slice(1).reduce(
            (acc, curr) => acc + "\n" + curr,
            body[0]
        );
    } else {
        titleInput.value = "(Title)";
        bodyTextarea.value = "(Text)";
    }
    viewEditor();
}

function save() {
    if (editing) {
        noteManager.editNote(editing, titleInput.value, bodyTextarea.value.split("\n"));
    } else {
        editing = noteManager.createNote(titleInput.value, bodyTextarea.value.split("\n"));
    }
    changesSaved = true;
}

function clearEditor() {
    editing = 0;
    titleEdited = false;
    bodyEdited = false;
    changesSaved = false;
    titleInput.value = "";
    bodyTextarea.innerHTML = "";
}