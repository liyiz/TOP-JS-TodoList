
const storageAvailable = (type) => {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuoteaExceededError" &&
            storage &&
            storage.length !== 0
        );
    }
}

export {
    storageAvailable
}