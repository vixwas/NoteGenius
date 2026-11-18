from pathlib import Path
from pypdf import PdfReader
from docx import Document
from pptx import Presentation


def extract_text_from_pdf(file_path: str) -> str:

    try:
        reader = PdfReader(file_path)
        extracted_text = ""

        for page_number, page in enumerate(reader.pages, start=1):

            page_text = page.extract_text()

            if page_text:
                extracted_text += f"\n--- Page {page_number} ---\n"
                extracted_text += page_text

        return extracted_text

    except Exception as error:
        raise Exception(f"PDF extraction failed: {str(error)}")


def extract_text_from_docx(file_path: str) -> str:

    try:
        document = Document(file_path)
        extracted_text = ""

        # Extract paragraphs
        for paragraph in document.paragraphs:

            if paragraph.text.strip():
                extracted_text += paragraph.text + "\n"

        # Extract tables
        for table in document.tables:

            for row in table.rows:

                row_text = []

                for cell in row.cells:
                    row_text.append(cell.text.strip())

                extracted_text += " | ".join(row_text) + "\n"

        return extracted_text

    except Exception as error:
        raise Exception(f"DOCX extraction failed: {str(error)}")


def extract_text_from_pptx(file_path: str) -> str:

    try:
        presentation = Presentation(file_path)
        extracted_text = ""

        # Process slides
        for slide_number, slide in enumerate(presentation.slides, start=1):

            extracted_text += f"\n--- Slide {slide_number} ---\n"

            for shape in slide.shapes:

                if hasattr(shape, "text") and shape.text.strip():
                    extracted_text += shape.text + "\n"

        return extracted_text

    except Exception as error:
        raise Exception(f"PPTX extraction failed: {str(error)}")


def extract_text_from_txt(file_path: str) -> str:

    try:

        with open(file_path, "r", encoding="utf-8") as file:
            extracted_text = file.read()

        return extracted_text

    except Exception as error:
        raise Exception(f"TXT extraction failed: {str(error)}")