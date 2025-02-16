let clickManager;

let listDiv, editorDiv, readerDiv, guideDiv;

let listMain;

let titleInput, bodyTextarea;

let titleSpan, bodyPre;

let noteManager;

function setup() {
    clickManager = new ClickManager();

    listDiv = document.getElementById("list-div");
    editorDiv = document.getElementById("editor-div");
    readerDiv = document.getElementById("reader-div");
    guideDiv = document.getElementById("guide-div")

    listMain = document.getElementById("list-main");

    titleInput = document.getElementById("title-input");
    bodyTextarea = document.getElementById("body-textarea");

    titleSpan = document.getElementById("title-span");
    bodyPre = document.getElementById("body-pre");

    document.getElementById("create-new-button").addEventListener("click", (event) => {
        openEditor();
    });

    document.getElementById("delete-all-button").addEventListener("click", (event) => {
        if (noteManager.count() > 0) {
            new YesNoPromptBox("Are you sure you want to delete all notes?", () => {
                noteManager.deleteAllNotes();
                updateList();
            }, () => {}).run();
        }
    });

    document.getElementById("close-editor-button").addEventListener("click", (event) => {
        if (!changesSaved && (titleEdited || bodyEdited)) {
            new YesNoPromptBox(`Save ${editing === -1 ? "note" : "changes"} before closing?`, () => {
                save();
                closeEditor();
            }, () => {
                closeEditor();
            }).run();
        } else {
            closeEditor();
        }
    });

    document.getElementById("delete-edited-button").addEventListener("click", (event) => {
        if (editing === -1) {
            new YesNoPromptBox("Close without saving?", () => {
                closeEditor();
            }, () => {}).run();
        } else {
            new YesNoPromptBox("Delete this note?", () => {
                noteManager.deleteNote(editing);
                closeEditor();
            }, () => {}).run();
        }
    });

    document.getElementById("open-in-editor-button").addEventListener("click", (event) => {
        editing = reading;
        openEditor(editing);
    });

    document.getElementById("delete-read-button").addEventListener("click", () => {
        new YesNoPromptBox("Are you sure you want to delete this note?", () => {
            noteManager.deleteNote(reading);
            closeReader();
        }, () => {}).run();
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

    //localStorage.clear();

    openList();
}

function viewList() {
    editorDiv.style.display = "none";
    readerDiv.style.display = "none";
    guideDiv.style.display = "none";
    listDiv.style.display = "flex";
}

function viewEditor() {
    listDiv.style.display = "none";
    readerDiv.style.display = "none";
    guideDiv.style.display = "none";
    editorDiv.style.display = "flex";
}

function viewReader() {
    listDiv.style.display = "none";
    editorDiv.style.display = "none";
    guideDiv.style.display = "none";
    readerDiv.style.display = "flex";
}

function viewGuide() {
    listDiv.style.display = "none";
    editorDiv.style.display = "none";
    readerDiv.style.display = "none";
    guideDiv.style.display = "flex";
}