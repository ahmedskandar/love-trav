// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ImageUploadProps } from "../lib/types";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

const ImageUpload = ({ file, setFile }: ImageUploadProps) => {
  return (
    <div className="cursor-pointer">
      <FilePond
        required
        files={file.map((f) => f.file)}
        allowReorder={false}
        acceptedFileTypes={["image/*"]}
        name="image"
        labelFileTypeNotAllowed="Invalid file type. Please upload an image"
        allowMultiple={false}
        onupdatefiles={setFile}
        labelIdle="Drag & Drop or Browse your desired profile image"
      />
    </div>
  );
};

export default ImageUpload;
