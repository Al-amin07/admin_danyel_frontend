import { ILoad } from "@/types/load.type";
import { formatDateToDDMMYY } from "@/utils/formatDate";
import { FaEye, FaDownload, FaTimes, FaTrash } from "react-icons/fa";
import { useState } from "react";
// import { useUpdateLoadMutation } from "@/redux/api/load/loadApi";
import { toast } from "sonner";
import { useUpdateLoadMutation } from "@/store/api/load/loadApi";

const DocumentList = ({
  load,
  refetch,
}: {
  load: ILoad;
  refetch: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [updateLoad, { isLoading }] = useUpdateLoadMutation();

  // Handle selecting multiple files
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]); // append new files
    }
  };

  // Remove single file
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload all selected files
  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("documents", file);
    });
    try {
      const result = await updateLoad({
        id: load?._id,
        data: formData,
      }).unwrap();
      console.log({ result });
      if (result?.success) {
        toast.success("Documents uploaded successfully");
        refetch();
      } else {
        throw Error(result?.message || "Failed to upload documents");
      }
    } catch (error: any) {
      console.log({ error });
      toast.error(
        error?.message || error?.data?.message || "Failed to upload documents"
      );
    } finally {
      setFiles([]);
      setIsModalOpen(false);
    }
  };

  // const downloadFile = async (url: string, filename: string) => {
  //   try {
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     const link = document.createElement("a");
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = filename;
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //     window.URL.revokeObjectURL(link.href);
  //   } catch (error) {
  //     console.error("Download failed", error);
  //   }
  // };

  console.log({ files });
  return (
    <div className="bg-white p-6 rounded-md w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Documents</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-500 font-medium cursor-pointer"
        >
          Upload
        </button>
      </div>

      <div className="mt-4">
        {load?.documents?.map((doc, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white rounded-lg mt-3 shadow-md"
          >
            <div className="flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/PDF_file_icon.svg/600px-PDF_file_icon.svg.png"
                alt="PDF"
                className="w-6 h-6 mr-3"
              />
              <div>
                <p className="font-medium">{doc.type}</p>
                <p className="text-sm text-gray-500">
                  Uploaded {formatDateToDDMMYY(doc?.createdAt as string)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={doc.url}
                target="_blank"
                className="text-gray-500 hover:text-blue-500"
              >
                <FaEye />
              </a>
              <a
                href={doc.url}
                download={doc.type || `document-${index}`} // <-- suggest filename
                className="text-gray-500 hover:text-blue-500"
              >
                <FaDownload />
              </a>
              {/* <button
                onClick={() =>
                  downloadFile(doc.url, doc.type || `document-${index}.pdf`)
                }
                className="text-gray-500 hover:text-blue-500"
              >
                <FaDownload />
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes />
            </button>

            <h2 className="text-lg font-semibold mb-4">Upload Documents</h2>

            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.png"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />

            {files.length > 0 && (
              <ul className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded"
                  >
                    <span className="text-sm">{file.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-end mt-5 gap-3">
              <button
                className="px-4 py-2 rounded-md border border-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={files.length === 0}
                className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              >
                {isLoading ? "Uploading..." : "Upload"}{" "}
                {files.length > 0 && `(${files.length})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
