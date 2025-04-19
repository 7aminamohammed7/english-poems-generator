// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Function to display the poem using the typewriter effect
function displayPoem(poemText) {
  console.log("Poem generated");
  new Typewriter("#poem", {
    strings: poemText,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

// Main function to call Gemini API and fetch the poem
async function generatePoem(event) {
  event.preventDefault();

  // Grab user instructions from the form input
  const instructionsInput = document.querySelector(".instructions");
  const apiKey = process.env.GEMINI_API_KEY;
;

  // Construct prompt and context
  const prompt = `User instructions: Generate an English poem about ${instructionsInput.value}`;
  const context =
    "You are a romantic poem expert and love to write short poems in basic HTML and separate each line with a <br />. Make sure to follow the user instructions. Do not include a title to the poem. Sign the poem with 'SheCodes AI' inside a <strong> element at the end of the poem and NOT at the beginning.";

  // Gemini API endpoint
  const apiURL = `http://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`;

  // Request body
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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const poemText = data.candidates[0].content.parts[0].text;
    displayPoem(poemText);
  } catch (error) {
    console.error("Error generating poem:", error);
  }
}

// Event listener to trigger poem generation on form submit
document
  .querySelector("#poem-generator-form")
  .addEventListener("submit", generatePoem);
