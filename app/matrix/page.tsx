'use client';

import React, { useState } from 'react';
import { useMatrixReducer, initialState } from '../hooks/useMatrixReducer';
import MatrixEditor from '../components/MatrixEditor';
import MatrixPreview from '../components/MatrixPreview';
import { Button } from '@mui/material';
import { GoPlus } from "react-icons/go";

export default function MatrixBuilderPage() {
  const [state, dispatch] = useMatrixReducer();
  const [isEditMode, setEditMode] = useState(true);

  const handleAddNewQuestion = () => {
    dispatch({ type: 'RESET', payload: initialState }); 
    setEditMode(true); 
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{isEditMode ? 'إنشاء سؤال مصفوفة' : 'عرض السؤال'}</h1>
        <button className="text-sm text-blue-600 underline" onClick={() => setEditMode(!isEditMode)}>
          {isEditMode ? 'معاينة' : 'تعديل'}
        </button>
      </div>

      {isEditMode ? (
        <MatrixEditor state={state} dispatch={dispatch} onSave={() => setEditMode(false)} />
      ) : (
        <div>
          <MatrixPreview state={state} />
      
             <Button
             onClick={handleAddNewQuestion}
             variant="outlined" startIcon={<GoPlus />} sx={{marginTop: "20px", width: "158px", height: "46px", borderRadius: "64px", fontSize: "16px", color: "#0E0464", marginLeft: "10px"}} >
                    إضاف سؤال آخر
                  </Button>
        </div>
      )}
    </div>
  );
}

