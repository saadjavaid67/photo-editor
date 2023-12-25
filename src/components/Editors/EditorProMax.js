import React, { useState, useRef } from 'react';
import '@pqina/pintura/pintura.css';
import { getEditorDefaults } from '@pqina/pintura';
import { PinturaEditor } from '@pqina/react-pintura';

const editorConfig = getEditorDefaults();

const downloadFile = (file) => {
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = URL.createObjectURL(file);
    link.download = file.name;

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.parentNode.removeChild(link);
    }, 0);
};

const EditorProMax = () => {
    const [file, setFile] = useState();

    function handleChange(e) {
        let img = URL.createObjectURL(e.target.files[0]);
        setFile(img)
    }

    const editorRef = useRef(null);

    const handleEditorProcess = (imageState) => {
        downloadFile(imageState.dest);
    };
    return (
        <div className="App" style={{ height: '80vh' }}>
            {file ? <PinturaEditor
                {...editorConfig}
                src={file}
                onProcess={handleEditorProcess}
                imageCropAspectRatio={1}
            ></PinturaEditor> :
                (<div className="my-4 d-flex flex-column justify-content-center">
                    <span className="fw-bold me-2">Select your image:</span>
                    <input type="file" onChange={handleChange} />
                </div>)
            }
        </div>
    );
}

export default EditorProMax;
