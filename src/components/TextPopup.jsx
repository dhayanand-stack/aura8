import React from 'react';
import { X, Edit, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const TextPopup = ({ text, onClose, onSave, isEditing = false }) => {
  const [editText, setEditText] = React.useState(text);
  const [editMode, setEditMode] = React.useState(isEditing);

  const handleSave = () => {
    if (editMode) {
      onSave(editText);
    }
    onClose();
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      {/* Resizable container */}
      <div
        className="resize overflow-auto bg-transparent p-1 rounded-lg"
        style={{
          minWidth: '300px',
          minHeight: '300px',
          maxWidth: '90vw',
          maxHeight: '90vh',
          width: '600px',
          height: '500px',
        }}
      >
        <Card className="bg-slate-800 border-slate-700 w-full h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-white">
              {editMode ? 'Edit Text' : 'View Text'}
            </CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden flex flex-col space-y-4">
            {editMode ? (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                placeholder="Enter your text here..."
              />
            ) : (
              <div className="flex-1 overflow-y-auto bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                <pre className="text-slate-200 whitespace-pre-wrap break-words leading-relaxed w-full h-full">
                  {text || 'No text available'}
                </pre>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
              {editMode ? (
                <>
                  <Button
                    onClick={() => setEditMode(false)}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleEdit}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Text
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextPopup;
