import { useState, useRef } from "react";

function UploadBox({ selectedFiles = [], onFilesSelected }) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  const allowedExtensions = [
    ".pdf",
    ".docx",
    ".pptx",
    ".txt",
    ".png",
    ".jpg",
    ".jpeg",
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10 MB

  // Validate files
  const validateFiles = (incomingFiles) => {
    const validFiles = [];
    const errors = [];

    Array.from(incomingFiles).forEach((file) => {
      const fileName = file.name.toLowerCase();

      const isValidFormat = allowedExtensions.some((ext) =>
        fileName.endsWith(ext)
      );

      if (!isValidFormat) {
        errors.push(`${file.name}: Unsupported file format`);
        return;
      }

      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File exceeds 10 MB`);
        return;
      }

      validFiles.push(file);
    });

    const combinedFiles = [...selectedFiles, ...validFiles];

    // Remove duplicate files
    const uniqueFiles = combinedFiles.filter(
      (file, index, array) =>
        array.findIndex(
          (f) =>
            f.name === file.name &&
            f.size === file.size &&
            f.lastModified === file.lastModified
        ) === index
    );

    // Update parent state
    onFilesSelected(uniqueFiles);

    setErrorMessage(errors.join("\n"));
  };

  // File picker change
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 0) {
      validateFiles(files);
    }

    // Allow selecting same file again
    event.target.value = "";
  };

  // Open file picker
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  // Drag leave
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  // Drop files
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files || []);

    if (files.length > 0) {
      validateFiles(files);
    }
  };

  // Remove one file
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );

    onFilesSelected(updatedFiles);
  };

  // Remove all files
  const handleRemoveAllFiles = () => {
    onFilesSelected([]);
    setErrorMessage("");
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div
      className={`upload-box ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="upload-icon">📄</div>

      <h3>Upload your study material</h3>

      <p>PDF, DOCX, PPTX, TXT or Images</p>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.pptx,.txt,.png,.jpg,.jpeg"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Upload Button */}
      <button
        type="button"
        className="upload-button"
        onClick={openFilePicker}
      >
        📁 Choose Files
      </button>

      <p className="upload-hint">
        Or drag and drop your files here
      </p>

      <p className="upload-hint">
        Maximum file size: 10 MB per file
      </p>

      {/* Error Messages */}
      {errorMessage && (
        <div className="error-message">
          {errorMessage.split("\n").map((error, index) => (
            <div key={index}>⚠️ {error}</div>
          ))}
        </div>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="selected-files">
          <div className="files-header">
            <h4>Selected Files ({selectedFiles.length})</h4>

            <button
              type="button"
              className="remove-all-button"
              onClick={handleRemoveAllFiles}
            >
              Remove All
            </button>
          </div>

          {selectedFiles.map((file, index) => (
            <div
              className="selected-file"
              key={`${file.name}-${file.lastModified}-${index}`}
            >
              <div className="selected-file-info">
                <span className="selected-file-icon">📄</span>

                <div className="selected-file-details">
                  <span className="selected-file-name">
                    {file.name}
                  </span>

                  <span className="selected-file-size">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="remove-file-button"
                onClick={() => handleRemoveFile(index)}
                title="Remove file"
              >
                ✕
              </button>
            </div>
          ))}

          <div className="files-success-message">
            ✅ {selectedFiles.length} file
            {selectedFiles.length !== 1 ? "s" : ""} ready for processing
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadBox;