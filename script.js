// ---------------- CONFIG --------------------
const BASE_URL = "https://adolfo-blondish-sublaryngeally.ngrok-free.dev";

// ---------------- LANG LIST -----------------
const languages = {
    "Auto Detect": "auto",
    "Afrikaans": "af",
    "Albanian": "sq",
    "Amharic": "am",
    "Arabic": "ar",
    "Armenian": "hy",
    "Azerbaijani": "az",
    "Basque": "eu",
    "Belarusian": "be",
    "Bengali": "bn",
    "Bosnian": "bs",
    "Bulgarian": "bg",
    "Catalan": "ca",
    "Cebuano": "ceb",
    "Chichewa": "ny",
    "Chinese (Simplified)": "zh-cn",
    "Chinese (Traditional)": "zh-tw",
    "Corsican": "co",
    "Croatian": "hr",
    "Czech": "cs",
    "Danish": "da",
    "Dutch": "nl",
    "English": "en",
    "Esperanto": "eo",
    "Estonian": "et",
    "Filipino": "fil",
    "Finnish": "fi",
    "French": "fr",
    "Frisian": "fy",
    "Galician": "gl",
    "Georgian": "ka",
    "German": "de",
    "Greek": "el",
    "Gujarati": "gu",
    "Haitian Creole": "ht",
    "Hausa": "ha",
    "Hawaiian": "haw",
    "Hebrew": "iw",
    "Hindi": "hi",
    "Hmong": "hmn",
    "Hungarian": "hu",
    "Icelandic": "is",
    "Igbo": "ig",
    "Indonesian": "id",
    "Irish": "ga",
    "Italian": "it",
    "Japanese": "ja",
    "Javanese": "jw",
    "Kannada": "kn",
    "Kazakh": "kk",
    "Khmer": "km",
    "Kinyarwanda": "rw",
    "Korean": "ko",
    "Kurdish (Kurmanji)": "ku",
    "Kyrgyz": "ky",
    "Lao": "lo",
    "Latin": "la",
    "Latvian": "lv",
    "Lithuanian": "lt",
    "Luxembourgish": "lb",
    "Macedonian": "mk",
    "Malagasy": "mg",
    "Malay": "ms",
    "Malayalam": "ml",
    "Maltese": "mt",
    "Maori": "mi",
    "Marathi": "mr",
    "Mongolian": "mn",
    "Myanmar (Burmese)": "my",
    "Nepali": "ne",
    "Norwegian": "no",
    "Nyanja": "ny",
    "Pashto": "ps",
    "Persian": "fa",
    "Polish": "pl",
    "Portuguese (Portugal, Brazil)": "pt",
    "Punjabi": "pa",
    "Romanian": "ro",
    "Russian": "ru",
    "Samoan": "sm",
    "Scots Gaelic": "gd",
    "Serbian": "sr",
    "Sesotho": "st",
    "Shona": "sn",
    "Sindhi": "sd",
    "Sinhala": "si",
    "Slovak": "sk",
    "Slovenian": "sl",
    "Somali": "so",
    "Spanish": "es",
    "Sundanese": "su",
    "Swahili": "sw",
    "Swedish": "sv",
    "Tagalog (Filipino)": "tl",
    "Tajik": "tg",
    "Tamil": "ta",
    "Tatar": "tt",
    "Telugu": "te",
    "Thai": "th",
    "Turkish": "tr",
    "Turkmen": "tk",
    "Ukrainian": "uk",
    "Urdu": "ur",
    "Uyghur": "ug",
    "Uzbek": "uz",
    "Vietnamese": "vi",
    "Welsh": "cy",
    "Xhosa": "xh",
    "Yiddish": "yi",
    "Yoruba": "yo",
    "Zulu": "zu"
};

// Populate dropdowns
const src = document.getElementById("sourceLang");
const tgt = document.getElementById("targetLang");

for (let name in languages) {
    const code = languages[name];
    src.innerHTML += `<option value="${code}">${name}</option>`;
    tgt.innerHTML += `<option value="${code}">${name}</option>`;
}
src.value = "auto";
tgt.value = "hi";

// ----------------- SWAP LANGS ----------------
document.getElementById("swapBtn").onclick = () => {
    let temp = src.value;
    src.value = tgt.value;
    tgt.value = temp;
};

// ----------------- TRANSLATE ------------------
document.getElementById("translateBtn").onclick = async () => {
    let text = document.getElementById("inputText").value;
    if (!text) return alert("Bro enter some text.");

    try {
        const res = await fetch(`${BASE_URL}/translate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: text,
                target_lang: tgt.value
            })
        });

        const data = await res.json();
        document.getElementById("outputText").value =
            data.translated_text || data.error || "Translation failed.";
    } catch (e) {
        document.getElementById("outputText").value = "Error contacting server.";
    }
};

// ----------------- OCR (SERVER) ----------------
document.getElementById("ocrBtn").onclick = async () => {
    const image = document.getElementById("imageInput").files[0];
    if (!image) return alert("Upload an image bro.");

    let form = new FormData();
    form.append("image", image);

    const res = await fetch(`${BASE_URL}/ocr`, {
        method: "POST",
        body: form
    });

    const data = await res.json();
    document.getElementById("inputText").value =
        data.extracted_text || data.error || "OCR failed.";
};

// ----------------- DETECT LANGUAGE -------------
async function detectLang(text) {
    const res = await fetch(`${BASE_URL}/detect_lang`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text })
    });
    const data = await res.json();
    return data.language || "unknown";
}
