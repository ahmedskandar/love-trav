// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePondFile } from "filepond";
import { useState } from "react";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

const ImageUpload = () => {
  const [file, setFile] = useState<FilePondFile[]>([]);
  return (
    <FilePond
      files={file.map((f) => f.file)}
      allowReorder={false}
      acceptedFileTypes={["image/*"]}
      name="image"
      labelFileTypeNotAllowed="Invalid file type. Please upload an image"
      allowMultiple={false}
      onupdatefiles={setFile}
      labelIdle="Drag & Drop or Browse your desired profile image"
    />
  );
};

export default ImageUpload;
