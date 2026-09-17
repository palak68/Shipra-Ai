

const Gemini_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const generateGeminiResponse = async ({
    prompt,
    apikey,
    user
}) => {
    try {
        if (!apikey) {
            throw new Error("Gemini API key missing");
        }

        const maxRetries = 3;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response = await fetch(
                    `${Gemini_URL}?key=${apikey}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            contents: [
                                {
                                    parts: [
                                        {
                                            text: prompt,
                                        },
                                    ],
                                },
                            ],
                        }),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error(
                        `Gemini API Error (Attempt ${attempt}):`,
                        JSON.stringify(data, null, 2)
                    );

                    // Invalid API Key
                    if (
                        response.status === 400 ||
                        response.status === 401
                    ) {
                        user.geminiStatus = "invalid";
                        await user.save();

                        throw new Error(
                            data?.error?.message ||
                            `Gemini API Error: ${response.status}`
                        );
                    }

                    // Quota exceeded
                    if (response.status === 429) {
                        user.geminiStatus = "quota_exceeded";
                        await user.save();

                        throw new Error(
                            data?.error?.message ||
                            `Gemini API Error: ${response.status}`
                        );
                    }

                    // Gemini temporarily unavailable
                    if (response.status === 503) {
                        if (attempt < maxRetries) {
                            console.log(
                                `Gemini is temporarily unavailable. Retrying in ${
                                    attempt * 2
                                } seconds...`
                            );

                            await delay(attempt * 2000);
                            continue;
                        }
                    }

                    throw new Error(
                        data?.error?.message ||
                        `Gemini API Error: ${response.status}`
                    );
                }

                // Gemini request successful
                user.geminiStatus = "active";
                await user.save();

                const text =
                    data.candidates?.[0]?.content?.parts?.[0]?.text;

                if (!text) {
                    throw new Error("No text returned from Gemini");
                }

                return text.trim();

            } catch (error) {
                if (attempt === maxRetries) {
                    throw error;
                }

                console.error(
                    `Gemini attempt ${attempt} failed:`,
                    error.message
                );

                await delay(attempt * 2000);
            }
        }

    } catch (error) {
        console.error(
            "Gemini Fetch Error:",
            error.message
        );

        throw error;
    }
};

