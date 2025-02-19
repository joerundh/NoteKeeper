let clickManager;

let listDiv, editorDiv, readerDiv, manualDiv;

let listMain;

let titleInput, bodyTextarea;

let titleSpan, bodyDiv;

let noteManager;

function setup() {
    clickManager = new ClickManager();

    listDiv = document.getElementById("list-div");
    editorDiv = document.getElementById("editor-div");
    readerDiv = document.getElementById("reader-div");
    manualDiv = document.getElementById("manual-div")

    listMain = document.getElementById("list-main");

    titleInput = document.getElementById("title-input");
    bodyTextarea = document.getElementById("body-textarea");

    titleSpan = document.getElementById("title-span");
    bodyDiv = document.getElementById("body-div");

    document.getElementById("create-new-button").addEventListener("click", (event) => {
        openEditor();
    });

    document.getElementById("delete-all-button").addEventListener("click", (event) => {
        if (noteManager.count() > 0) {
            promptAlert("Delete all notes?",
                () => {
                    noteManager.deleteAllNotes();
                    updateList();
                    smallAlert("All notes deleted.");
                });
        }
    });

    document.getElementById("how-to-button").addEventListener("click", (event) => {
        viewManual();
    });

    document.getElementById("save-button").addEventListener("click", (event) => {
        save();
        smallAlert("Note saved.");
    });

    document.getElementById("close-button").addEventListener("click", (event) => {
        if (!changesSaved && (titleEdited || bodyEdited)) {
            promptAlert(`Save ${editing === 0 ? "note" : "changes"} before closing?`,
                () => {
                    save();
                    smallAlert("Note saved.");
                },
                () => {},
                () => {
                    clearEditor();
                    openList();
                }
            );
        } else {
            clearEditor();
            openList();
        }
    });

    document.getElementById("delete-edited-button").addEventListener("click", (event) => {
        promptAlert(`Delete ${editing ? "unsaved" : "this"} note?`, () => {
            if (!editing) noteManager.deleteNote(editing);
            clearEditor();
            openList();
            smallAlert("Note deleted.");
        });
    });

    document.getElementById("info-button").addEventListener("click", (event) => {
        viewInfo();
    });

    document.getElementById("edit-button").addEventListener("click", (event) => {
        openEditor(reading);
        clearReader();
    });

    document.getElementById("back-button").addEventListener("click", (event) => {
        clearReader();
        openList();
    });

    document.getElementById("delete-button").addEventListener("click", (event) => {
        promptAlert("Delete this note?", () => {
            noteManager.deleteNote(reading);
            clearReader();
            openList();
            smallAlert("Note deleted.")
        });
    });

    document.getElementById("close-manual-button").addEventListener("click", (event) => {
        openList();
    });

    titleInput.addEventListener("focus", (event) => {
        if (titleInput.value === "(Title)") {
            titleInput.value = "";
        }
    });
    titleInput.addEventListener("blur", (event) => {
        if (titleInput.value === "") {
            titleInput.value = "(Title)";
        }
    });
    titleInput.addEventListener("keypress", (event) => {
        titleEdited = true;
        changesSaved = false;
    });

    bodyTextarea.addEventListener("focus", (event) => {
        if (bodyTextarea.value === "(Text)") {
            bodyTextarea.value = "";
        }
    });
    bodyTextarea.addEventListener("blur", (event) => {
        if (bodyTextarea.value === "") {
            bodyTextarea.value = "(Text)";
        }
    });
    bodyTextarea.addEventListener("keypress", (event) => {
        bodyEdited = true;
        changesSaved = false;
    });

    noteManager = new NoteManager();

    openList();
}

function viewList() {
    editorDiv.style.display = "none";
    readerDiv.style.display = "none";
    manualDiv.style.display = "none";
    listDiv.style.display = "flex";
}

function viewEditor() {
    listDiv.style.display = "none";
    readerDiv.style.display = "none";
    manualDiv.style.display = "none";
    editorDiv.style.display = "flex";
}

function viewReader() {
    listDiv.style.display = "none";
    editorDiv.style.display = "none";
    manualDiv.style.display = "none";
    readerDiv.style.display = "flex";
}

function viewManual() {
    listDiv.style.display = "none";
    editorDiv.style.display = "none";
    readerDiv.style.display = "none";
    manualDiv.style.display = "flex";
}