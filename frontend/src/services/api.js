
const API_BASE_URL = "http://127.0.0.1:8002";

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.detail || `Request failed: ${response.status}`
    );
  }

  return data;
}

// Upload document
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(response);
}

// Generate notes
export async function generateNotes(sourceText) {
  const response = await fetch(
    `${API_BASE_URL}/generate-notes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_text: sourceText,
      }),
    }
  );

  return handleResponse(response);
}

// Generate Quiz
export async function generateQuiz(
  sourceText,
  questionCount = 5,
  difficulty = "Medium",
  learningLevel = "University Student",
  language = "English"
) {
  const response = await fetch(
    `${API_BASE_URL}/generate-quiz`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_text: sourceText,
        question_count: questionCount,
        difficulty,
        learning_level: learningLevel,
        language,
      }),
    }
  );

  return handleResponse(response);
}

// Generate Flashcards
export async function generateFlashcards(
  sourceText,
  flashcardCount = 10,
  difficulty = "Medium",
  learningLevel = "University Student",
  language = "English"
) {
  const response = await fetch(
    `${API_BASE_URL}/generate-flashcards`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_text: sourceText,
        flashcard_count: flashcardCount,
        difficulty,
        learning_level: learningLevel,
        language,
      }),
    }
  );

  return handleResponse(response);
}

// Backend health check
export async function checkBackendHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);
  return handleResponse(response);
}

// Generate streaming notes
export async function generateNotesStream(sourceText, onChunk) {
  const response = await fetch(
    `${API_BASE_URL}/generate-notes-stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_text: sourceText,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "AI generation failed.");
  }

  if (!response.body) {
    throw new Error("Streaming is not supported by this browser.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let generatedNotes = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, {
        stream: true,
      });

      generatedNotes += chunk;

      if (onChunk) {
        onChunk(chunk, generatedNotes);
      }
    }

    generatedNotes += decoder.decode();

    return generatedNotes;
  } finally {
    reader.releaseLock();
  }
}
