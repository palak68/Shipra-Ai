import { generateGeminiResponse } from "../Configs/gemini.js";
import User from "../Models/user.model.js";


// ==========================================
// GET ASSISTANT CONFIG
// ==========================================

export const getAssistantConfig = async (req, res) => {

    try {

        const { userId } = req.params;

        const user = await User.findById(userId)
            .select("-geminiApiKey");

        if (!user) {

            return res.status(404).json({
                message: "failed to get user"
            });

        }

        return res.status(200).json({
            message: "Assistant Config data ",
            user
        });

    } catch (error) {

        console.log(
            "Assistant Config Error:",
            error
        );

        return res.status(500).json({
            message: `Assistant Config failed ${error}`
        });

    }

};


// ==========================================
// ASK ASSISTANT
// ==========================================

export const askAssistant = async (req, res) => {

    try {

        const { message, userId, currentPath } = req.body;


        // ==================================
        // VALIDATION
        // ==================================

        if (!message || !userId) {

            return res.status(400).json({
                message:
                    "Message and UserId are required"
            });

        }


        // ==================================
        // FIND USER
        // ==================================

        const user =
            await User.findById(userId);


        if (!user) {

            return res.status(404).json({
                message:
                    "User is not found"
            });

        }


        // ==================================
        // GEMINI API KEY
        // ==================================

        if (!user.geminiApiKey) {

            return res.status(400).json({
                message:
                    "gemini apikey is not added"
            });

        }


        // ==================================
        // FREE PLAN LIMIT
        // ==================================

        if (
            user.plan === "free" &&
            user.totalMessages >= user.requestLimit
        ) {

            return res.status(400).json({
                message:
                    "Free limit reached"
            });

        }


        // ==================================
        // PRO PLAN EXPIRY
        // ==================================

        if (
            user.plan === "pro" &&
            user.proExpiresAt &&
            new Date(user.proExpiresAt) < new Date()
        ) {

            user.plan = "free";

            await user.save();

            return res.status(400).json({
                message:
                    "Pro plan expired"
            });

        }


        // ==================================
        // CLEAN MESSAGE
        // ==================================

        const cleanMessage =
            message.toLowerCase().trim();


        console.log(
            "User Message:",
            cleanMessage
        );


        // ==================================
        // NAVIGATION
        // ==================================

        if (user.enableNavigation) {


            // --------------------------------
            // Navigation trigger words
            // --------------------------------

            const navigationWords = [

                "open",
                "go",
                "start",
                "show",
                "navigate",
                "take me",
                "visit",
                "view",
                "access",
                "billing",
                "dashboard",
                "profile",
                "settings",
                "home",
                "about",
                "contact",
                "pricing",
                "login",
                "register",
                "signup",
                "sign up",
                "logout",
                "log out"

            ];


            // --------------------------------
            // Check navigation intent
            // --------------------------------

            const wantsNavigation =
                navigationWords.some((word) =>
                    cleanMessage.includes(word)
                );


            console.log(
                "Wants Navigation:",
                wantsNavigation
            );


            // --------------------------------
            // Find matching page
            // --------------------------------

            if (wantsNavigation) {

                const matchedPage =
                    user.pages?.find((page) => {

                        if (!page.keywords) {
                            return false;
                        }

                        return page.keywords.some(
                            (keyword) =>
                                cleanMessage.includes(
                                    keyword.toLowerCase().trim()
                                )
                        );

                    });


                console.log(
                    "Matched Page:",
                    matchedPage
                );


                // --------------------------------
                // PAGE FOUND
                // --------------------------------

                if (matchedPage) {


                    // ----------------------------
                    // Already on page
                    // ----------------------------

                    if (
                        currentPath &&
                        currentPath ===
                        matchedPage.path
                    ) {

                        return res.json({

                            success: true,

                            action: "none",

                            response:
                                `${matchedPage.name} is already open.`

                        });

                    }


                    // ----------------------------
                    // Navigate
                    // ----------------------------

                    console.log(
                        "Navigating to:",
                        matchedPage.name
                    );

                    console.log(
                        "Navigation Path:",
                        matchedPage.path
                    );


                    return res.json({

                        success: true,

                        action: "navigate",

                        path:
                            matchedPage.path,

                        aiResponse:
                            `Opening ${matchedPage.name}`,

                        response:
                            `Opening ${matchedPage.name}`

                    });

                }

            }

        }


        // ==========================================
        // NORMAL GEMINI AI RESPONSE
        // ==========================================

        const prompt = `

You are ${user.assistantName}.

Business Name:
${user.businessName}

Business Type:
${user.businessType}

Business Description:
${user.businessDescription}

Assistant Tone:
${user.tone}


Rules:

- Keep replies under 15 words
- Give fast direct responses
- Talk naturally
- Behave like a smart voice assistant
- Avoid long explanations
- Keep responses short for quick voice playback


User Question:
${message}

`;


        const aiResponse =
            await generateGeminiResponse({

                prompt,

                apikey:
                    user.geminiApiKey,

                user

            });


        // ==========================================
        // INCREASE FREE PLAN MESSAGE COUNT
        // ==========================================

        if (user.plan === "free") {

            user.totalMessages += 1;

            await user.save();

        }


        // ==========================================
        // NORMAL RESPONSE
        // ==========================================

        return res.json({

            success: true,

            aiResponse

        });


    } catch (error) {

        console.log(
            "Ask Assistant Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Assistant AI Error"

        });

    }

};