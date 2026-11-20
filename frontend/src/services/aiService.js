
import {
  uploadFile,
  generateNotesStream,
  generateQuiz,
  generateFlashcards,
} from "./api";

// Upload document and extract text
async function extractDocumentText(file) {
  if (!file) {
    throw new Error("Please select a file first.");
  }

  const uploadResult = await uploadFile(file);

  if (!uploadResult.extracted_text?.trim()) {
    throw new Error("No readable text found in the uploaded file.");
  }

  return {
    sourceText: uploadResult.extracted_text,
    originalFilename: uploadResult.original_filename,
    savedFilename: uploadResult.saved_filename,
  };
}

// Generate detailed notes
export async function generateStudyMaterial(file, onChunk) {
  const uploadResult = await extractDocumentText(file);

  let generatedContent = "";

  const notesResult = await generateNotesStream(
    uploadResult.sourceText,
    (chunk, completeText) => {
      generatedContent = completeText;

      if (onChunk) {
        onChunk(chunk, completeText);
      }
    }
  );

  const finalContent = notesResult || generatedContent;

  if (
    !finalContent.trim() ||
    finalContent.includes("[GENERATION_ERROR]")
  ) {
    throw new Error(
      "Gemini is temporarily unavailable. Please try again later."
    );
  }

  return {
    title: file.name.replace(/\.[^/.]+$/, ""),
    originalFilename: uploadResult.originalFilename,
    savedFilename: uploadResult.savedFilename,
    content: finalContent,
    status: "success",
  };
}

// Generate Quiz / MCQs
export async function generateQuizMaterial(
  file,
  questionCount = 5,
  difficulty = "Medium",
  learningLevel = "University Student",
  language = "English"
) {
  const uploadResult = await extractDocumentText(file);

  const result = await generateQuiz(
    uploadResult.sourceText,
    questionCount,
    difficulty,
    learningLevel,
    language
  );

  return {
    title: result.quiz?.title || "Generated Quiz",
    originalFilename: uploadResult.originalFilename,
    quiz: result.quiz,
    status: "success",
  };
}

// Generate Flashcards
export async function generateFlashcardMaterial(
  file,
  flashcardCount = 5,
  difficulty = "Medium",
  learningLevel = "University Student",
  language = "English"
) {
  const uploadResult = await extractDocumentText(file);

  const result = await generateFlashcards(
    uploadResult.sourceText,
    flashcardCount,
    difficulty,
    learningLevel,
    language
  );

  return {
    title: result.flashcards?.title || "Generated Flashcards",
    originalFilename: uploadResult.originalFilename,
    flashcards: result.flashcards?.flashcards || [],
    status: "success",
  };
}
