const btn = document.getElementById("btn");
const result = document.getElementById("result");
const input = document.getElementById("inputt");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const dictionaryAudio = new Audio();

async function searchWord() {
    const word = input.value.trim();
    if (!word) return;

    result.innerHTML = `<div class="placeholder-text"><i class="fa-solid fa-spinner fa-spin"></i><p>Fetching knowledge...</p></div>`;

    try {
        const response = await fetch(`${url}${word}`);
        const data = await response.json();

        if (!response.ok) throw new Error("Not found");

        const definition = data[0].meanings[0].definitions[0];
        const audioUrl = data[0].phonetics.find(p => p.audio)?.audio;

        result.innerHTML = `
            <div class="fade-in">
                <div class="result-header">
                    <h2 class="word-title">${data[0].word}</h2>
                    <button class="audio-btn" id="play-audio" ${audioUrl ? "" : "disabled"}>
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="meta-info">
                    <span class="pos-badge">${data[0].meanings[0].partOfSpeech}</span>
                    <span class="phonetic">${data[0].phonetic || ""}</span>
                </div>
                <p class="definition">${definition.definition}</p>
                ${definition.example ? `
                    <div class="example-box">
                        <p>"${definition.example}"</p>
                    </div>
                ` : ""}
            </div>
        `;

        if (audioUrl) {
            dictionaryAudio.src = audioUrl;
            document.getElementById("play-audio").onclick = () => dictionaryAudio.play();
        }

    } catch (error) {
        result.innerHTML = `
            <div class="error fade-in">
                <h3 style="color: #f87171; text-align: center; margin-top: 20px;">Word not found</h3>
                <p style="color: var(--text-muted); text-align: center;">Try checking your spelling or search another term.</p>
            </div>
        `;
    }
}

btn.addEventListener("click", searchWord);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchWord();
});
