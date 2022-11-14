import { useState, useEffect } from "react";

function App() {
    const [currentStorage, SyncWithLocalStorage] = useState(localStorage || {});
    const eventListenerFun = e => {
        console.log("localStorage", { ...localStorage });
        SyncWithLocalStorage({ ...localStorage }); //<----spread it which will cause refrence to change
    };
    useEffect(() => {
        window.addEventListener("storage", eventListenerFun);

        return () => window.removeEventListener("storage", eventListenerFun);
    }, []);

    return (
        <div className="App">
            <button
                onClick={() =>
                    AddNoteToLocalStorage({ id: Date.now(), input: "hello" })
                }
            >
                add note{" "}
            </button>
            <div>
                hi
                {currentStorage &&
                    Object.keys(currentStorage).map(key => (
                        <div key={key}>{currentStorage[key]}</div>
                    ))}
            </div>
        </div>
    );
}

function AddNoteToLocalStorage(note) {
    const { id, input } = note;
    localStorage.setItem(id, input);
    window.dispatchEvent(new Event("storage"));
}

export default App;