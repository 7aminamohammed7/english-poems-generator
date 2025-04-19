export async function handler(event) {
  const { prompt, context } = JSON.parse(event.body);
  const apiKey = process.env.GEMINI_API_KEY;

  const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    system_instruction: {
      parts: [{ text: context }]
    }
  };

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    const poem = data.candidates?.[0]?.content?.parts?.[0]?.text || "No poem returned";

    return {
      statusCode: 200,
      body: JSON.stringify({ poem })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error generating poem", details: error.message })
    };
  }
}
