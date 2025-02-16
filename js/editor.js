let editing = -1;
let titleEdited = false;
let bodyEdited = false;
let changesSaved = false;

function openEditor(key) {
    if (key) {
        editing = key;
        titleInput.value = noteManager.getNote(key).title;
        bodyTextarea.value = noteManager.getNote(key).body;
    } else {
        titleInput.value = "(Title)";
        bodyTextarea.value = "(Text)";
    }
    viewEditor();
}

function save() {
    if (editing === -1) {
        editing = noteManager.createNote(titleInput.value, bodyTextarea.value);
    } else {
        noteManager.editNote(editing, titleInput.value, bodyTextarea.value);
    }
    changesSaved = true;
}

function closeEditor() {
    editing = -1;
    titleEdited = false;
    bodyEdited = false;
    changesSaved = false;
    titleInput.value = "";
    bodyTextarea.value = "";
    openList();
}