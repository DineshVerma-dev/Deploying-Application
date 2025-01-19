// raw but with s3 link,code-1

// import { useRef, useState } from 'react';
// import '../App.css';
// import { getSignedUrls } from '../service/api';

// const Home = () => {

//     const MAX_FILE_SIZE = 50 * 1024 * 1024; // 5 MB in bytes
//     const [progress, setProgress] = useState({}); // Tracks upload progress for each file
//     const [files, setFiles] = useState([]); // Stores selected files
//     const [uploadedFiles, setUploadedFiles] = useState([]); // Stores uploaded file info
//     const [error, setError] = useState(''); // Stores error message
//     const fileInputRef = useRef(null); // Ref for hidden file input

//     // Handles file selection
//     const handleFileChange = (event) => {
//         // setFiles(event.target.files);
//         const selectedFiles = Array.from(event.target.files);
//         const oversizedFiles = selectedFiles.filter(file => file.size > MAX_FILE_SIZE);

//         if (oversizedFiles.length > 0) {
//             setError(`Some files exceed the maximum size of 50 MB and cannot be uploaded.`);
//             return;
//         }

//         setFiles(selectedFiles);
//         setError(''); // Clear any previous errors
 
//     };

//     // Handles file upload to S3
//     const handleUpload = async () => {
//         if (files.length === 0) {
//             alert('Please select files to upload!');
//             return;
//         }

//         const fileArray = Array.from(files).map((file) => ({
//             fileName: file.name,
//             fileType: file.type,
//         }));

//         try {
//             // Fetch signed URLs from backend
//             const signedUrls = await getSignedUrls(fileArray);

//             // Upload files using signed URLs
//             const uploaded = await Promise.all(
//                 signedUrls.map(async ({ signedUrl, objectUrl }, index) => {
//                     const file = files[index];

//             return new Promise((resolve, reject) => {
//                 const xhr = new XMLHttpRequest();

//                 xhr.upload.addEventListener('progress', (event) => {
//                     if (event.lengthComputable) {
//                         const percentage = Math.round((event.loaded / event.total) * 100);
//                         setProgress((prev) => ({
//                             ...prev,
//                             [file.name]: percentage,
//                         }));
//                     }
//                 });

//                 xhr.open('PUT', signedUrl);
//                 xhr.setRequestHeader('Content-Type', file.type);

//                 xhr.onload = () => {
//                     if (xhr.status === 200) {
//                         resolve({ name: file.name, link: objectUrl });
//                     } else {
//                         reject(new Error(`Failed to upload ${file.name}`));
//                     }
//                 };

//                 xhr.onerror = () => {
//                     reject(new Error(`Network error while uploading ${file.name}`));
//                 };

//                 xhr.send(file);
//             });
//         })
//     );

//             // Update uploaded files state and reset input
//             setUploadedFiles(uploaded);
//             alert('Files uploaded successfully!');
//             fileInputRef.current.value = '';
//             setFiles([]);
//         } catch (error) {
//             console.error('Error uploading files:', error);
//             alert('Failed to upload files. Please try again.');
//         }
//     };

//     return (
//         <div className='container'>
//             <h1>FileTransferHub</h1>
//             <p>
//                 FileTransferHub is a simple file sharing service that allows you to upload files
//                 and share them with others. It is an open-source project and is free to use. Try it
//                 out today!
//             </p>
//             <p>Convenient file sharing in three steps without registration:</p>

//             <ol>
//                 <li>
//                     <span>1</span> 
//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleFileChange}
//                         style={{ display: 'none' }}
//                         ref={fileInputRef}
//                     />
//                     <button onClick={() => fileInputRef.current.click()}>Select files to upload</button>
//                     &nbsp;or drag-and-drop files into this browser window.
//                 </li>
//                 <li>
//                     <span>2</span> Wait until the file uploads are complete.

//                     <ul>
//                         {files.map((file, index) => (
//                             <li key={index}>
//                                 {file.name}
//                                 {progress[file.name] !== undefined && (
//                                     <span> - {progress[file.name]}%</span>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>

//                 </li>
//                 <li>
//                     <span>3</span> The files will be available at:
//                     {uploadedFiles.length > 0 && (
//                         <ul>
//                             {uploadedFiles.map((file, index) => (
//                                 <li key={index}>
//                                     <a href={file.link} target="_blank" rel="noopener noreferrer">
//                                         {file.link}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </li>
//             </ol>
//             {error && <p className="error">{error}</p>}

//             <p className='info'>
//                 The file uploads will cancel if you move away from this page before they complete.
//                 Uploaded files can be deleted manually at any time and will be deleted automatically
//                 after 6 days.
//             </p>

//             <button onClick={handleUpload} disabled={files.length === 0}>
//                 Upload Files
//             </button>

//             {uploadedFiles.length > 0 && (
//                 <div>
//                     <h2>Uploaded Files:</h2>
//                     <ul>
//                         {uploadedFiles.map((file, index) => (
//                             <li key={index}>
//                                 <a href={file.link} target="_blank" rel="noopener noreferrer">
//                                     {file.name}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Home;



///////////////////////////////////////////////////////////////////////
// card code-2 


// import { useRef, useState } from 'react';
// import '../App.css';
// import { getSignedUrls } from '../service/api';

// const Home = () => {
//     const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB in bytes
//     const [files, setFiles] = useState([]); // Stores selected files
//     const [uploadedFiles, setUploadedFiles] = useState([]); // Stores uploaded file info
//     const [progress, setProgress] = useState({}); // Tracks upload progress for each file
//     const [error, setError] = useState(''); // Stores error message
//     const fileInputRef = useRef(null); // Ref for hidden file input

//     const handleFileChange = (event) => {
//         const selectedFiles = Array.from(event.target.files);
//         const oversizedFiles = selectedFiles.filter(file => file.size > MAX_FILE_SIZE);

//         if (oversizedFiles.length > 0) {
//             setError(`Some files exceed the maximum size of 50 MB and cannot be uploaded.`);
//             return;
//         }

//         setFiles(selectedFiles);
//         setError('');
//     };

//     const handleUpload = async () => {
//         if (files.length === 0) {
//             alert('Please select files to upload!');
//             return;
//         }

//         const fileArray = Array.from(files).map((file) => ({
//             fileName: file.name,
//             fileType: file.type,
//         }));

//         try {
//             const signedUrls = await getSignedUrls(fileArray);

//             const uploaded = await Promise.all(
//                 signedUrls.map(({ signedUrl, objectUrl }, index) => {
//                     const file = files[index];

//                     return new Promise((resolve, reject) => {
//                         const xhr = new XMLHttpRequest();

//                         xhr.upload.addEventListener('progress', (event) => {
//                             if (event.lengthComputable) {
//                                 const percentage = Math.round((event.loaded / event.total) * 100);
//                                 setProgress((prev) => ({
//                                     ...prev,
//                                     [file.name]: percentage,
//                                 }));
//                             }
//                         });

//                         xhr.open('PUT', signedUrl);
//                         xhr.setRequestHeader('Content-Type', file.type);

//                         xhr.onload = () => {
//                             if (xhr.status === 200) {
//                                 resolve({ name: file.name, link: objectUrl });
//                             } else {
//                                 reject(new Error(`Failed to upload ${file.name}`));
//                             }
//                         };

//                         xhr.onerror = () => {
//                             reject(new Error(`Network error while uploading ${file.name}`));
//                         };

//                         xhr.send(file);
//                     });
//                 })
//             );

//             setUploadedFiles(uploaded);
//             alert('Files uploaded successfully!');
//             fileInputRef.current.value = '';
//             setFiles([]);
//             setProgress({});
//         } catch (error) {
//             console.error('Error uploading files:', error);
//             alert('Failed to upload files. Please try again.');
//         }
//     };

//     return (
//         <div className="container">
//             <h1 className="title">📁 FileTransferHub</h1>
//             <p className="subtitle">
//                 Effortlessly upload and share files with a simple and elegant interface.
//             </p>

//             <div className="steps">
//                 <div className="step">
//                     <span className="step-number">1</span>
//                     <button
//                         onClick={() => fileInputRef.current.click()}
//                         className="button"
//                     >
//                         Select files to upload
//                     </button>
//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleFileChange}
//                         style={{ display: 'none' }}
//                         ref={fileInputRef}
//                     />
//                 </div>

//                 <div className="step">
//                     <span className="step-number">2</span>
//                     <span>Monitor upload progress:</span>
//                     <ul className="file-list">
//                         {files.map((file, index) => (
//                             <li key={index} className="file-item">
//                                 <span>{file.name}</span>
//                                 <div className="progress-container">
//                                     <div
//                                         className="progress-bar"
//                                         style={{ width: `${progress[file.name] || 0}%` }}
//                                     ></div>
//                                 </div>
//                                 <span className="progress-text">
//                                     {progress[file.name] ? `${progress[file.name]}%` : '0%'}
//                                 </span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 <div className="step">
//                     <span className="step-number">3</span>
//                     <span>Your uploaded files will be available at:</span>
//                     {uploadedFiles.length > 0 && (
//                         <ul className="file-links">
//                             {uploadedFiles.map((file, index) => (
//                                 <li key={index}>
//                                     <a
//                                         href={file.link}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="link"
//                                     >
//                                         {file.name}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             </div>

//             {error && <p className="error">{error}</p>}

//             <button
//                 onClick={handleUpload}
//                 disabled={files.length === 0}
//                 className={`button ${files.length === 0 ? 'disabled-button' : ''}`}
//             >
//                 Upload Files
//             </button>
//             {uploadedFiles.length > 0 && (
//                 <div>
//                     <h2>Uploaded Files:</h2>
//                     <ul>
//                         {uploadedFiles.map((file, index) => (
//                             <li key={index}>
//                                 <a href={file.link} target="_blank" rel="noopener noreferrer">
//                                     {file.name}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Home;

// 3rd one code-----

// // Updated Home Component
// import { useRef, useState } from 'react';
// import '../App.css'; // Ensure styles for progress bars, buttons, and links are included
// import { getSignedUrls } from '../service/api';

// const Home = () => {
//     const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB in bytes
//     const [files, setFiles] = useState([]);
//     const [uploadedFiles, setUploadedFiles] = useState([]);
//     const [progress, setProgress] = useState({});
//     const [error, setError] = useState('');
//     const fileInputRef = useRef(null);

//     const handleFileChange = (event) => {
//         const selectedFiles = Array.from(event.target.files);
//         const oversizedFiles = selectedFiles.filter((file) => file.size > MAX_FILE_SIZE);

//         if (oversizedFiles.length > 0) {
//             setError(`Some files exceed the maximum size of 50 MB and cannot be uploaded.`);
//             return;
//         }

//         setFiles(selectedFiles);
//         setError('');
//     };

//     const handleUpload = async () => {
//         if (files.length === 0) {
//             alert('Please select files to upload!');
//             return;
//         }

//         const fileArray = files.map((file) => ({
//             fileName: file.name,
//             fileType: file.type,
//         }));

//         try {
//             const signedUrls = await getSignedUrls(fileArray);

//             const uploaded = await Promise.all(
//                 signedUrls.map(({ signedUrl, objectUrl }, index) => {
//                     const file = files[index];

//                     return new Promise((resolve, reject) => {
//                         const xhr = new XMLHttpRequest();

//                         xhr.upload.addEventListener('progress', (event) => {
//                             if (event.lengthComputable) {
//                                 const percentage = Math.round((event.loaded / event.total) * 100);
//                                 setProgress((prev) => ({
//                                     ...prev,
//                                     [file.name]: percentage,
//                                 }));
//                             }
//                         });

//                         xhr.open('PUT', signedUrl);
//                         xhr.setRequestHeader('Content-Type', file.type);

//                         xhr.onload = () => {
//                             if (xhr.status === 200) {
//                                 resolve({ name: file.name, link: objectUrl });
//                             } else {
//                                 reject(new Error(`Failed to upload ${file.name}`));
//                             }
//                         };

//                         xhr.onerror = () => {
//                             reject(new Error(`Network error while uploading ${file.name}`));
//                         };

//                         xhr.send(file);
//                     });
//                 })
//             );

//             setUploadedFiles(uploaded);
//             alert('Files uploaded successfully!');
//             fileInputRef.current.value = '';
//             setFiles([]);
//             setProgress({});
//         } catch (error) {
//             console.error('Error uploading files:', error);
//             alert('Failed to upload files. Please try again.');
//         }
//     };

//     return (
//         <div className="container">
//             <h1 className="title">📁 FileTransferHub</h1>
//             <p className="subtitle">Effortlessly upload and share files with ease!</p>

//             <div className="steps">
//                 <div className="step">
//                     <button
//                         onClick={() => fileInputRef.current.click()}
//                         className="button"
//                     >
//                         Select Files
//                     </button>
//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleFileChange}
//                         style={{ display: 'none' }}
//                         ref={fileInputRef}
//                     />
//                 </div>

//                 <ul className="file-list">
//                     {files.map((file, index) => (
//                         <li key={index} className="file-item">
//                             {file.name}
//                             <div className="progress-container">
//                                 <div
//                                     className="progress-bar"
//                                     style={{ width: `${progress[file.name] || 0}%` }}
//                                 ></div>
//                             </div>
//                             <span className="progress-text">
//                                 {progress[file.name] ? `${progress[file.name]}%` : '0%'}
//                             </span>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {error && <p className="error">{error}</p>}

//             <button
//                 onClick={handleUpload}
//                 disabled={files.length === 0}
//                 className="button upload-button"
//             >
//                 Upload Files
//             </button>

//             <div className="uploaded-section">
//                 <h2>Uploaded Files</h2>
//                 <ul className="uploaded-list">
//                     {uploadedFiles.map((file, index) => (
//                         <li key={index} className="uploaded-item">
//                             <a
//                                 href={file.link}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="link"
//                             >
//                                 {file.name}
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Home;


// 4th one code-----


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
