"iuse client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void; // Callback function to handle file changes
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      onChange(acceptedFiles);
    },
    [onChange]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="upload file..."
          width={1000}
          height={1000}
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            alt="upload file..."
            width={40}
            height={40}
            className="max-h-[400px] overflow-hidden object-cover"
          />

          <div className="file-upload_label">
            <p>
              <span className="text-green-500">click to upload</span>{" "} or Drag and Drop
            </p>
            <p>SVG, PNG, JPG, or PDF (800 * 400)</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
