class NoteManager {
    constructor() {
        if (localStorage.getItem("noteKeeperKeys")) {
            this.keys = JSON.parse(localStorage.getItem("noteKeeperKeys"));
        } else {
            this.keys = [];
            this.storeKeys();
        }
    }

    count() {
        return this.keys.length;
    }

    createNote(title, body) {
        let now = Date.now();
        let newNote = {
            key: now,
            title: title,
            body: body,
            edited: now
        };
        localStorage.setItem(`noteKeeper${now}`, JSON.stringify(newNote));
        this.keys.unshift(now);
        this.storeKeys();
        
        return now;
    }

    getNote(key) {
        return JSON.parse(localStorage.getItem(`noteKeeper${key}`));
    }

    getAllNotes() {
        return this.keys.map((key) => this.getNote(key));
    }

    editNote(key, title, body) {
        let note = JSON.parse(localStorage.getItem(`noteKeeper${key}`));
        note.title = title;
        note.body = body;
        note.edited = Date.now();
        this.storeNote(note);
    }

    deleteNote(key) {
        localStorage.removeItem(`noteKeeper${key}`);
        this.keys.splice(this.keys.indexOf(key), 1);
    }

    deleteAllNotes() {
        localStorage.clear();
        this.keys = [];
        this.storeKeys();
    }

    storeNote(note) {
        localStorage.setItem(`noteKeeper${note.key}`, JSON.stringify(note));
    }

    storeKeys() {
        localStorage.setItem("noteKeeperKeys", JSON.stringify(this.keys));
    }
}