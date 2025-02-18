function createListElement(note) {
    let element = document.createElement("div");
    element.className = "list-item";
    clickManager.listenToElement(element,
        () => { openReader(note.key); },
        () => { openEditor(note.key); }
    );

    let header = document.createElement("header");

    let listItemTitleSpan = document.createElement("span");
    listItemTitleSpan.className = "list-item-title-span";
    listItemTitleSpan.innerHTML = note.title;
    header.appendChild(listItemTitleSpan);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#x1f5d1;";
    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        promptAlert("Delete this note?", () => {
            noteManager.deleteNote(note.key);
            updateList();
            smallAlert("Note deleted.")
        });
    });
    header.appendChild(deleteButton);

    element.appendChild(header);

    let main = document.createElement("main");
    main.innerHTML = note.body;
    element.appendChild(main);

    return element;
}

function openList() {
    viewList();
    updateList();
}

function updateList() {
    listMain.innerHTML = "";

    let allNotes = noteManager.getAllNotes().sort((note1, note2) => note2.edited - note1.edited);
    for (let note of allNotes) {
        listMain.appendChild(createListElement(note));
    }
}