
import { useRef, useState } from 'react';
import '../App.css';
import { getSignedUrls } from '../service/api';

const Home = () => {
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 50 MB in bytes
    const [files, setFiles] = useState([]); // Stores selected files
    const [uploadedFiles, setUploadedFiles] = useState([]); // Stores uploaded file info
    const [progress, setProgress] = useState({}); // Tracks upload progress for each file
    const [error, setError] = useState(''); // Stores error message
    const fileInputRef = useRef(null); // Ref for hidden file input

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const oversizedFiles = selectedFiles.filter(file => file.size > MAX_FILE_SIZE);

        if (oversizedFiles.length > 0) {
            setError("Some files exceed the maximum size of 50 MB and cannot be uploaded.");
            return;
        }

        setFiles(selectedFiles);
        setError('');
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('Please select files to upload!');
            return;
        }

        const fileArray = Array.from(files).map((file) => ({
            fileName: file.name,
            fileType: file.type,
        }));

        try {
            const signedUrls = await getSignedUrls(fileArray);

            const uploaded = await Promise.all(
                signedUrls.map(({ signedUrl, objectUrl }, index) => {
                    const file = files[index];

                    return new Promise((resolve, reject) => {
                        const xhr = new XMLHttpRequest();

                        xhr.upload.addEventListener('progress', (event) => {
                            if (event.lengthComputable) {
                                const percentage = Math.round((event.loaded / event.total) * 100);
                                setProgress((prev) => ({
                                    ...prev,
                                    [file.name]: percentage,
                                }));
                            }
                        });

                        xhr.open('PUT', signedUrl);
                        xhr.setRequestHeader('Content-Type', file.type);

                        xhr.onload = () => {
                            if (xhr.status === 200) {
                                resolve({ name: file.name, link: objectUrl });
                            } else {
                                reject(new Error(`Failed to upload ${file.name}`));
                            }
                        };

                        xhr.onerror = () => {
                            reject(new Error(`Network error while uploading ${file.name}`));
                        };

                        xhr.send(file);
                    });
                })
            );

            setUploadedFiles(uploaded);
            alert('Files uploaded successfully!');
            fileInputRef.current.value = '';
            setFiles([]);
            setProgress({});
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Failed to upload files. Please try again.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">📁 FileTransferHub</h1>
            <p className="subtitle">
                Effortlessly upload and share files with a simple and elegant interface.
            </p>

            <div className="steps">
                <div className="step">
                    <span className="step-number">1</span>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="button"
                    >
                        Select files to upload
                    </button>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                </div>

                <div className="step">
                    <span className="step-number">2</span>
                    <span>Monitor upload progress:</span>
                    <ul className="file-list">
                        {files.map((file, index) => (
                            <li key={index} className="file-item">
                                <span>{file.name}</span>
                                <div className="progress-container">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${progress[file.name] || 0}%` }}
                                    ></div>
                                </div>
                                <span className="progress-text">
                                    {progress[file.name] ? `${progress[file.name]}%` : '0%'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="step">
                    <span className="step-number">3</span>
                    <span>Your uploaded files will be available at:</span>
                    {uploadedFiles.length > 0 && (
                        <ul className="file-links">
                            {uploadedFiles.map((file, index) => (
                                <li key={index}>
                                    <a
                                        href={file.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link"
                                    >
                                        {file.link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {error && <p className="error">{error}</p>}

            <button
                onClick={handleUpload}
                disabled={files.length === 0}
                className={`button ${files.length === 0 ? 'disabled-button' : ''}`}
            >
                Upload Files
            </button>

            <div className="uploaded-section">
                 <h2>Uploaded Files</h2>
                 <ul className="uploaded-list">
                     {uploadedFiles.map((file, index) => (
                        <li key={index} className="uploaded-item">
                            <a
                                href={file.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link"
                            >
                                {file.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>



        </div>
    );
};

export default Home;
