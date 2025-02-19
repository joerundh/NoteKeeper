class NoteManager {
    constructor() {
        if (window.localStorage.getItem("noteKeeperKeys")) {
            this.keys = JSON.parse(window.localStorage.getItem("noteKeeperKeys"));
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
        
        window.localStorage.setItem(`noteKeeper${now}`, JSON.stringify(newNote));
        this.keys.unshift(now);
        this.storeKeys();
        
        return now;
    }

    getNote(key) {
        return JSON.parse(window.localStorage.getItem(`noteKeeper${key}`));
    }

    getAllNotes() {
        return this.keys.map((key) => this.getNote(key));
    }

    editNote(key, title, body) {
        let note = this.getNote(key);
        note.title = title;
        note.body = body;
        note.edited = Date.now();
        this.storeNote(note);
    }

    deleteNote(key) {
        window.localStorage.removeItem(`noteKeeper${key}`);
        this.keys.splice(this.keys.indexOf(key), 1);
        this.storeKeys();
    }

    deleteAllNotes() {
        window.localStorage.clear();
        this.keys = [];
        this.storeKeys();
    }

    storeNote(note) {
        window.localStorage.setItem(`noteKeeper${note.key}`, JSON.stringify(note));
    }

    storeKeys() {
        window.localStorage.setItem("noteKeeperKeys", JSON.stringify(this.keys));
    }
}