function displayPoem(poemText) {
  new Typewriter("#poem", {
    strings: poemText,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

async function generatePoem(event) {
  event.preventDefault();

  const instructionsInput = document.querySelector(".instructions");

  const prompt = `User instructions: Generate an English poem about ${instructionsInput.value}`;
  const context =
    "You are a romantic poem expert and love to write short poems in basic HTML and separate each line with a <br />. Make sure to follow the user instructions. Do not include a title to the poem. Sign the poem with 'SheCodes AI' inside a <strong> element at the end of the poem and NOT at the beginning.";

  const response = await fetch("/.netlify/functions/generatePoem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, context })
  });

  const data = await response.json();
  displayPoem(data.poem);
}

document.querySelector("#poem-generator-form")
  .addEventListener("submit", generatePoem);
