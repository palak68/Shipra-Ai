(function () {

    // ==========================================
    // USER DATA
    // ==========================================

    const script = document.currentScript;

    const userId = script?.dataset?.userId;

    const theme = "dark";

    let assistantConfig = null;


    // ==========================================
    // LOAD CSS
    // ==========================================

    const link = document.createElement("link");

    link.rel = "stylesheet";

    link.href = "http://localhost:5173/assistant.css";

    document.head.appendChild(link);


    // ==========================================
    // CREATE POPUP
    // ==========================================

    const popup = document.createElement("div");

    popup.className = `shifra-popup theme-${theme}`;

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

                <div class="shifra-user-text"></div>


                <!-- AI TEXT -->

                <div class="shifra-ai-text"></div>

            </div>


            <div class="shifra-bottom">

                <button class="shifra-mic">

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

    button.className = `shifra-btn theme-${theme}`;

    button.innerHTML = `
        <img
            src="http://localhost:5173/logo.png"
            alt="logo"
        />
    `;


    document.body.appendChild(button);


    // ==========================================
    // TOGGLE POPUP
    // ==========================================

    let open = false;


    button.onclick = () => {

        open = !open;

        popup.style.display = open
            ? "flex"
            : "none";

    };


    // ==========================================
    // LOAD ASSISTANT CONFIG
    // ==========================================

    const loadAssistant = async () => {

        try {

            console.log("Shifra Assistant Starting...");

            console.log("User ID:", userId);


            if (!userId) {

                console.error(
                    "Shifra Assistant: User ID missing"
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


            if (data?.user) {

                assistantConfig = data.user;

                applyConfig();

            }


        } catch (error) {

            console.log(
                "Assistant Load Error:",
                error
            );

        }

    };


    // ==========================================
    // APPLY CONFIG
    // ==========================================

    const applyConfig = () => {

        if (!assistantConfig) return;


        popup.className =
            `shifra-popup theme-${assistantConfig.theme}`;


        button.className =
            `shifra-btn theme-${assistantConfig.theme}`;


        const title =
            popup.querySelector(".shifra-title");


        title.innerHTML =
            `Hello! I'm ${assistantConfig.assistantName}`;


        const subTitle =
            popup.querySelector(".shifra-sub");


        subTitle.innerHTML = `
            Welcome to
            ${assistantConfig.businessName}.
            <br />
            Ask anything about your website.
        `;

    };


    loadAssistant();


    // ==========================================
    // ELEMENTS
    // ==========================================

    const status =
        popup.querySelector(".shifra-status");


    const wave =
        popup.querySelector(".shifra-wave");


    const userText =
        popup.querySelector(".shifra-user-text");


    const aiText =
        popup.querySelector(".shifra-ai-text");


    const mic =
        popup.querySelector(".shifra-mic");


    // ==========================================
    // TEXT TO SPEECH
    // ==========================================

    const speak = (text) => {

        if (!text) return;


        window.speechSynthesis.cancel();


        // Show AI response

        aiText.innerText = text;


        status.innerText =
            "AI Speaking...";


        const speech =
            new SpeechSynthesisUtterance(text);


        speech.lang = "en-IN";

        speech.rate = 1;

        speech.pitch = 1;

        speech.volume = 1;


        // Voice end

        speech.onend = () => {

            status.innerText =
                "Tap button to Speak";


            wave.style.opacity = "0";

        };


        // Start speaking

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


    if (SpeechRecognition) {

        const recognition =
            new SpeechRecognition();


        recognition.lang = "en-US";

        recognition.continuous = false;

        recognition.interimResults = false;


        // ======================================
        // MICROPHONE CLICK
        // ======================================

        mic.onclick = () => {

            try {

                wave.style.opacity = "1";


                status.innerText =
                    "Listening...";


                userText.innerText = "";

                aiText.innerText = "";


                recognition.start();

            } catch (error) {

                console.log(
                    "Recognition Start Error:",
                    error
                );

            }

        };


        // ======================================
        // SPEECH RESULT
        // ======================================

        recognition.onresult = (e) => {

            const text =
                e.results[0][0].transcript;


            console.log(
                "User Voice:",
                text
            );


            userText.innerText =
                "You: " + text;


            recognition.stop();


            setTimeout(async () => {

                try {

                    status.innerText =
                        "Thinking...";


                    // ==================================
                    // CURRENT PAGE PATH
                    // ==================================

                    const currentPath =
                        window.location.pathname;


                    console.log(
                        "Current Path:",
                        currentPath
                    );


                    // ==================================
                    // SEND REQUEST TO BACKEND
                    // ==================================

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


                    const res = await fetch(
                        "http://localhost:8000/api/assistant/ask",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                message: text,

                                userId: userId,

                                currentPath:
                                    currentPath

                            })
                        }
                    );


                    const data =
                        await res.json();


                    // ==================================
                    // DEBUG RESPONSE
                    // ==================================

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
                    // SUCCESS RESPONSE
                    // ==================================

                    if (data.success) {


                        // ==================================
                        // NAVIGATION
                        // ==================================

                        if (
                            data.action ===
                            "navigate"
                        ) {

                            const responseText =
                                data.aiResponse ||
                                data.response ||
                                "Opening the page.";


                            speak(responseText);


                            setTimeout(() => {

                                if (data.path) {

                                    console.log(
                                        "Navigating to:",
                                        data.path
                                    );


                                    window.location.href =
                                        data.path;

                                } else {

                                    console.error(
                                        "Navigation path is missing"
                                    );

                                }

                            }, 1500);


                        }


                        // ==================================
                        // NORMAL AI RESPONSE
                        // ==================================

                        else {

                            speak(
                                data.aiResponse ||
                                data.response ||
                                "I could not process that request."
                            );

                        }

                    }


                    // ==================================
                    // BACKEND ERROR
                    // ==================================

                    else {

                        speak(
                            data.message ||
                            "Response error. Please check your plan."
                        );

                    }


                } catch (error) {

                    console.log(
                        "Assistant Request Error:",
                        error
                    );


                    speak(
                        "AI server error."
                    );

                }

            }, 600);

        };


        // ======================================
        // SPEECH ERROR
        // ======================================

        recognition.onerror = (error) => {

            console.log(
                "Speech Recognition Error:",
                error
            );


            status.innerText =
                "Tap button to Speak";


            wave.style.opacity = "0";

        };


        // ======================================
        // SPEECH END
        // ======================================

        recognition.onend = () => {

            if (
                status.innerText ===
                "Listening..."
            ) {

                status.innerText =
                    "Tap button to Speak";

            }

        };

    }


    // ==========================================
    // SPEECH NOT SUPPORTED
    // ==========================================

    else {

        status.innerText =
            "Speech Recognition not supported";

    }


})();