(function () {

    // ==========================================
    // PREVENT DUPLICATE ASSISTANT
    // ==========================================

    if (window.__SHIFRA_ASSISTANT_LOADED__) {
        console.log("Shifra Assistant already loaded.");
        return;
    }

    window.__SHIFRA_ASSISTANT_LOADED__ = true;


    // ==========================================
    // USER DATA
    // ==========================================

    const script = document.currentScript;

    const userId = script?.dataset?.userId || "";

    console.log("=================================");
    console.log("Shifra Assistant Starting...");
    console.log("User ID:", userId);
    console.log("=================================");


    const theme = "dark";

    let assistantConfig = null;


    // ==========================================
    // LOAD CSS
    // ==========================================

    const link = document.createElement("link");

    link.rel = "stylesheet";

    link.href =
        "http://localhost:5173/assistant.css";

    document.head.appendChild(link);


    // ==========================================
    // CREATE POPUP
    // ==========================================

    const popup = document.createElement("div");

    popup.className =
        `shifra-popup theme-${theme}`;

    popup.innerHTML = `

        <div class="shifra-overlay"></div>

        <div class="shifra-content">

            <div class="shifra-top">

                <div class="shifra-orb-wrap">

                    <div class="shifra-orb-glow"></div>

                    <div class="shifra-orb"></div>

                </div>


                <h2 class="shifra-title">
                    Hello! I'm Shifra AI
                </h2>


                <p class="shifra-sub">
                    Your smart voice assistant.
                    <br />
                    Ask anything about your website.
                </p>


                <div class="shifra-status">
                    Tap button to Speak
                </div>


                <div class="shifra-wave">

                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>

                </div>


                <!-- USER TEXT -->

                <div class="shifra-user-text">
                </div>


                <!-- AI TEXT -->

                <div class="shifra-ai-text">
                </div>

            </div>


            <div class="shifra-bottom">

                <button
                    type="button"
                    class="shifra-mic"
                >

                    <img
                        src="http://localhost:5173/mic.svg"
                        alt="mic"
                        class="shifra-mic-icon"
                    />

                </button>

            </div>

        </div>

    `;

    document.body.appendChild(popup);


    // ==========================================
    // FLOATING BUTTON
    // ==========================================

    const button = document.createElement("button");

    button.type = "button";

    button.className =
        `shifra-btn theme-${theme}`;

    button.innerHTML = `

        <img
            src="http://localhost:5173/logo.png"
            alt="logo"
        />

    `;

    document.body.appendChild(button);


    // ==========================================
    // POPUP TOGGLE
    // ==========================================

    let open = false;

    button.onclick = () => {

        open = !open;

        popup.style.display =
            open ? "flex" : "none";

    };


    // ==========================================
    // GET ASSISTANT CONFIG
    // ==========================================

    const loadAssistant = async () => {

        try {

            console.log("Loading Assistant Config...");
            console.log("User ID:", userId);


            if (!userId) {

                console.warn(
                    "Shifra Assistant: User ID missing."
                );

                return;

            }


            const res = await fetch(
                `http://localhost:8000/api/assistant/config/${userId}`
            );


            const data = await res.json();


            console.log(
                "Assistant Config Response:",
                data
            );


            if (res.ok && data) {

                assistantConfig = data.user;

                applyConfig();

            } else {

                console.warn(
                    "Assistant config could not be loaded."
                );

            }

        } catch (error) {

            console.error(
                "Assistant Load Error:",
                error
            );

        }

    };


    // ==========================================
    // APPLY CONFIG
    // ==========================================

    const applyConfig = () => {

        if (!assistantConfig) {
            return;
        }


        // Theme

        if (assistantConfig.theme) {

            popup.className =
                `shifra-popup theme-${assistantConfig.theme}`;

            button.className =
                `shifra-btn theme-${assistantConfig.theme}`;

        }


        // Assistant name

        const title =
            popup.querySelector(
                ".shifra-title"
            );


        if (title) {

            title.innerText =
                `Hello! I'm ${
                    assistantConfig.assistantName ||
                    "Shifra AI"
                }`;

        }


        // Business name

        const subTitle =
            popup.querySelector(
                ".shifra-sub"
            );


        if (subTitle) {

            subTitle.innerHTML = `

                Welcome to
                ${
                    assistantConfig.businessName ||
                    "our website"
                }.

                <br />

                Ask anything about your website.

            `;

        }

    };


    // Load configuration

    loadAssistant();


    // ==========================================
    // ELEMENTS
    // ==========================================

    const status =
        popup.querySelector(
            ".shifra-status"
        );


    const wave =
        popup.querySelector(
            ".shifra-wave"
        );


    const userText =
        popup.querySelector(
            ".shifra-user-text"
        );


    const aiText =
        popup.querySelector(
            ".shifra-ai-text"
        );


    const mic =
        popup.querySelector(
            ".shifra-mic"
        );


    // ==========================================
    // SPEAK FUNCTION
    // ==========================================

    const speak = (text) => {

        if (!text) {
            return;
        }


        // Stop previous speech

        window.speechSynthesis.cancel();


        // Show AI response

        aiText.innerText = text;


        status.innerText =
            "AI Speaking...";


        wave.style.opacity =
            "1";


        const speech =
            new SpeechSynthesisUtterance(text);


        speech.lang =
            "hi-IN";


        speech.rate = 1;

        speech.pitch = 1;

        speech.volume = 1;


        // Speech finished

        speech.onend = () => {

            status.innerText =
                "Tap button to Speak";

            wave.style.opacity =
                "0";

        };


        // Speech error

        speech.onerror = () => {

            status.innerText =
                "Tap button to Speak";

            wave.style.opacity =
                "0";

        };


        window.speechSynthesis.speak(
            speech
        );

    };


    // ==========================================
    // SPEECH RECOGNITION
    // ==========================================

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        status.innerText =
            "Speech Recognition not supported";

        console.warn(
            "Speech Recognition is not supported."
        );

        return;

    }


    const recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-US";


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    // ==========================================
    // MICROPHONE CLICK
    // ==========================================

    mic.onclick = () => {

        try {

            window.speechSynthesis.cancel();


            wave.style.opacity =
                "1";


            status.innerText =
                "Listening...";


            userText.innerText =
                "";


            aiText.innerText =
                "";


            recognition.start();

        } catch (error) {

            console.log(
                "Recognition Start Error:",
                error
            );

        }

    };


    // ==========================================
    // SPEECH RESULT
    // ==========================================

    recognition.onresult = (e) => {

        const text =
            e.results[0][0].transcript;


        console.log(
            "User Voice:",
            text
        );


        userText.innerText =
            "You: " + text;


        try {
            recognition.stop();
        } catch (error) {
            console.log(error);
        }


        // ======================================
        // SEND TO BACKEND
        // ======================================

        setTimeout(async () => {

            try {

                status.innerText =
                    "Thinking...";


                console.log(
                    "Sending Assistant Request..."
                );


                console.log(
                    "Message:",
                    text
                );


                console.log(
                    "User ID:",
                    userId
                );


                const res =
                    await fetch(
                        "http://localhost:8000/api/assistant/ask",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify({
                                message: text,
                                userId: userId
                            })
                        }
                    );


                const data =
                    await res.json();


                console.log(
                    "================================="
                );

                console.log(
                    "ASSISTANT RESPONSE:",
                    data
                );

                console.log(
                    "Action:",
                    data.action
                );

                console.log(
                    "Path:",
                    data.path
                );

                console.log(
                    "Response:",
                    data.response
                );

                console.log(
                    "AI Response:",
                    data.aiResponse
                );

                console.log(
                    "================================="
                );


                // ==================================
                // BACKEND ERROR
                // ==================================

                if (!data.success) {

                    speak(
                        data.message ||
                        "Sorry, I could not process your request."
                    );

                    return;

                }


                // ==================================
                // NAVIGATION
                // ==================================

                if (
                    data.action ===
                    "navigate"
                ) {

                    console.log(
                        "Navigation requested."
                    );


                    // Check path

                    if (!data.path) {

                        console.error(
                            "Navigation path missing:",
                            data
                        );


                        speak(
                            "I could not find that page."
                        );


                        return;

                    }


                    const responseText =
                        data.aiResponse ||
                        data.response ||
                        "Opening the page...";


                    // Speak first

                    speak(
                        responseText
                    );


                    // Navigate after speech starts

                    setTimeout(() => {

                        console.log(
                            "Navigating to:",
                            data.path
                        );


                        try {

                            window.location.href =
                                data.path;

                        } catch (error) {

                            console.error(
                                "Navigation Error:",
                                error
                            );

                        }

                    }, 1500);


                    return;

                }


                // ==================================
                // NORMAL AI RESPONSE
                // ==================================

                speak(
                    data.aiResponse ||
                    data.response ||
                    "I received your request."
                );


            } catch (error) {

                console.error(
                    "Assistant API Error:",
                    error
                );


                speak(
                    "AI Server Error. Please try again."
                );

            }

        }, 1000);

    };


    // ==========================================
    // SPEECH ERROR
    // ==========================================

    recognition.onerror = (event) => {

        console.log(
            "Speech Recognition Error:",
            event
        );


        status.innerText =
            "Tap button to Speak";


        wave.style.opacity =
            "0";

    };


    // ==========================================
    // SPEECH END
    // ==========================================

    recognition.onend = () => {

        if (
            status.innerText ===
            "Listening..."
        ) {

            status.innerText =
                "Tap button to Speak";

        }

    };


})();