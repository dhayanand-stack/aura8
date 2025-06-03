


import React, { useState, useRef } from 'react';
import ImageViewer from './ImageViewer';
import { Upload, Image as ImageIcon, Eye } from 'lucide-react';

const ImageUpload = ({ label, image, onImageChange }) => {
  const [showViewer, setShowViewer] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const handleFileSelect = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    handleFileSelect(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handlePaste = (e) => {
    if (!focused) return;
    
    const items = e.clipboardData.items;
    for (let item of items) {
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        handleFileSelect(blob);
        break;
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [focused]);

  const handleContainerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (image) {
      // If image exists, show viewer
      setShowViewer(true);
    } else {
      // If no image, just focus the container (don't open file dialog)
      e.currentTarget.focus();
    }
  };

  const handleUploadButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <>
      <div
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg transition-all duration-300 min-h-[120px]
          ${image 
            ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500' 
            : dragOver 
              ? 'bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/20'
              : focused 
                ? 'bg-slate-700/30 border-blue-500 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/20'
                : 'bg-slate-700/20 border-slate-600 hover:bg-slate-700/30 hover:border-slate-500'
          }
        `}
        tabIndex={0}
      >
        {image ? (
          <div className="flex flex-col items-center justify-center space-y-3 text-center p-6">
            <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
              <ImageIcon className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <p className="text-green-300 font-medium">Image Uploaded</p>
              <div className="flex items-center justify-center space-x-4 mt-3">
                <button
                  onClick={handleContainerClick}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Image
                </button>
                <button
                  onClick={handleUploadButtonClick}
                  className="flex items-center justify-center px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors text-sm"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Replace
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div 
            onClick={handleContainerClick}
            className="flex flex-col items-center justify-center space-y-3 text-center p-6 cursor-pointer"
          >
            <div className={`p-3 rounded-lg transition-colors ${
              dragOver ? 'bg-blue-500/30' : focused ? 'bg-slate-600/70' : 'bg-slate-600/50'
            }`}>
              <Upload className={`w-8 h-8 transition-colors ${
                dragOver ? 'text-blue-400' : focused ? 'text-slate-300' : 'text-slate-400'
              }`} />
            </div>
            <div>
              <p className="text-slate-300 font-medium">{label}</p>
              <p className="text-slate-500 text-xs mt-1">
                {focused ? 'Now you can paste an image or click upload below' : 'Click to select, then paste or upload'}
              </p>
              {focused && (
                <button
                  onClick={handleUploadButtonClick}
                  className="mt-3 flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm mx-auto"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Click to Upload
                </button>
              )}
            </div>
          </div>
        )}

        {dragOver && (
          <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 rounded-lg flex items-center justify-center pointer-events-none">
            <p className="text-blue-400 font-medium">Drop image here</p>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      {showViewer && image && (
        <ImageViewer 
          imageUrl={image} 
          onClose={() => setShowViewer(false)} 
        />
      )}
    </>
  );
};

export default ImageUpload;
