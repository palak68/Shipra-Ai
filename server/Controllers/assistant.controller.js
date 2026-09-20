import { generateGeminiResponse } from "../Configs/gemini.js";
import User from "../Models/user.model.js";


// ==========================================
// GET ASSISTANT CONFIG
// ==========================================

export const getAssistantConfig = async (req, res) => {
    try {

        const { userId } = req.params;

        const user = await User.findById(userId).select("-geminiApiKey");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Failed to get user"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Assistant Config data",
            user
        });

    } catch (error) {

        console.log("Assistant Config Error:", error);

        return res.status(500).json({
            success: false,
            message: `Assistant Config failed: ${error.message}`
        });
    }
};


// ==========================================
// ASK ASSISTANT
// ==========================================

export const askAssistant = async (req, res) => {

    try {

        // ==========================================
        // GET DATA FROM FRONTEND
        // ==========================================

        const {
            message,
            userId,
            currentPath
        } = req.body;


        console.log("=================================");
        console.log("ASK ASSISTANT CONTROLLER HIT");
        console.log("BODY:", req.body);
        console.log("=================================");


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!message || !userId) {

            return res.status(400).json({
                success: false,
                message: "Message and UserId are required"
            });
        }


        // ==========================================
        // IMPORTANT
        // cleanMessage MUST BE HERE
        // BEFORE USING IT ANYWHERE
        // ==========================================

        const cleanMessage = message
            .toLowerCase()
            .trim();


        console.log("CLEAN MESSAGE:", cleanMessage);


        // ==========================================
        // FIND USER
        // ==========================================

        const user = await User.findById(userId);


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User is not found"
            });
        }


        // ==========================================
        // GEMINI API KEY CHECK
        // ==========================================

        if (!user.geminiApiKey) {

            return res.status(400).json({
                success: false,
                message: "Gemini API key is not added"
            });
        }


        // ==========================================
        // FREE PLAN LIMIT
        // ==========================================

        if (
            user.plan === "free" &&
            user.totalMessages >= user.requestLimit
        ) {

            return res.status(400).json({
                success: false,
                message: "Free limit reached"
            });
        }


        // ==========================================
        // PRO PLAN EXPIRY
        // ==========================================

        if (
            user.plan === "pro" &&
            user.proExpiresAt &&
            new Date(user.proExpiresAt) < new Date()
        ) {

            user.plan = "free";

            await user.save();

            return res.status(400).json({
                success: false,
                message: "Pro plan expired"
            });
        }


        // ==========================================
        // WEBSITE NAVIGATION
        // ==========================================

        if (
            user.enableNavigation === true &&
            user.pages &&
            user.pages.length > 0
        ) {

            console.log("Navigation Enabled:", user.enableNavigation);
            console.log("User Pages:", user.pages);


            // ==========================================
            // FIND MATCHING PAGE
            // ==========================================

            const matchedPage = user.pages.find((page) => {

                if (
                    !page.keywords ||
                    page.keywords.length === 0
                ) {
                    return false;
                }


                return page.keywords.some((keyword) => {

                    if (!keyword) {
                        return false;
                    }

                    return cleanMessage.includes(
                        keyword.toLowerCase().trim()
                    );

                });

            });


            console.log("MATCHED PAGE:", matchedPage);


            // ==========================================
            // PAGE FOUND
            // ==========================================

            if (matchedPage) {

                console.log("MATCHED PAGE NAME:", matchedPage.name);
                console.log("MATCHED PATH:", matchedPage.path);
                console.log("CURRENT PATH:", currentPath);


                // ==========================================
                // ALREADY ON SAME PAGE
                // ==========================================

                if (
                    currentPath &&
                    currentPath === matchedPage.path
                ) {

                    return res.json({
                        success: true,
                        action: "none",
                        path: matchedPage.path,
                        response: `${matchedPage.name} is already open`,
                        aiResponse: `${matchedPage.name} is already open`
                    });
                }


                // ==========================================
                // NAVIGATE TO PAGE
                // ==========================================

                return res.json({
                    success: true,
                    action: "navigate",
                    path: matchedPage.path,
                    response: `Opening ${matchedPage.name}`,
                    aiResponse: `Opening ${matchedPage.name}`
                });

            }

        }


        // ==========================================
        // GEMINI AI FALLBACK
        // ==========================================

        console.log("No navigation page matched.");
        console.log("Sending request to Gemini...");


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
Reply in the SAME language as the user's message.
- If user speaks Hindi, reply in Hindi.
- If user speaks Hinglish, reply in Hinglish.
- If user speaks English, reply in English.
- Keep replies under 15 words
- Give fast direct responses
- Talk naturally
- Behave like smart voice assistant
- Avoid long explanations
- Keep responses short for quick voice playback

User Question:
${message}

`;


        const aiResponse = await generateGeminiResponse({
            prompt,
            apikey: user.geminiApiKey,
            user
        });


        // ==========================================
        // INCREMENT FREE USER MESSAGE COUNT
        // ==========================================

        if (user.plan === "free") {

            user.totalMessages += 1;

            await user.save();
        }


        // ==========================================
        // GEMINI RESPONSE
        // ==========================================

        return res.json({
            success: true,
            action: "none",
            response: aiResponse,
            aiResponse
        });


    } catch (error) {

        console.log("=================================");
        console.log("Assistant AI Error:", error);
        console.log("=================================");


        return res.status(500).json({
            success: false,
            message: "Assistant AI Error",
            error: error.message
        });
    }
};