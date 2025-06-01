import React, {useState} from 'react';
import { MatrixState, MatrixAction } from '../types/matrix';
import TextField from '@mui/material/TextField';
import { Button, Divider } from '@mui/material';
import { CiCircleCheck } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  SelectChangeEvent
} from '@mui/material';

interface Props {
  state: MatrixState;
  dispatch: React.Dispatch<MatrixAction>;
  onSave: () => void;
}

export default function MatrixEditor({ state, dispatch, onSave }: Props) {
    const [selectedValue, setSelectedValue] = useState('مصفوفه');
     const [checked, setChecked] = useState(false);
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <>

    <div className='border rounded-md mt-5 shadow-xl p-4 bg-white border-white'>
        <div className='flex items-center gap-5 mb-5'>
         <FormControl  sx={{ width: 200 }}>
      <Select
        labelId="select-label"
        id="select"
        value={selectedValue}
        sx={{borderRadius:"100px"}}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <TbWorld />
          </InputAdornment>
        }
      >
        <MenuItem value="مصفوفه">مصفوفه</MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>

      </Select>
    </FormControl>
                <TextField
                id="question-input"
                placeholder="1- اكتب سؤالك..."
                variant="standard"
                fullWidth
                sx={{ 
                    direction: 'rtl', 
                    backgroundColor: '#f9f9f9', 
                    padding: '18px', 
                    borderRadius: '4px',  
                      '& .MuiInput-underline:before': {
                    borderBottomColor: '#0E0464', 
                    },
                    '& .MuiInput-underline:after': {
                    borderBottomColor: '#0E0464', 
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#0E0464', 
                    },
                }}
                className="mb-4"
                value={state.question}
                onChange={(e) => dispatch({ type: 'SET_QUESTION', payload: e.target.value })}
                />
              
        </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto ">
          <thead className="">
            <tr className="">
             <th><button onClick={() => dispatch({ type: 'ADD_COLUMN' })} className="text-[16px] text-[#041C64] font-meduim">إضافة عمود +</button></th>
              {state.columns.map((col, colIndex) => (
                <th key={colIndex} className="p-2 text-center">
                     {state.columns.length > 1 && (
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_COLUMN', index: colIndex })}
                      className="bg-[#F7F7F7] h-[20px] w-[20px] rounded-md text-[#041C64]" 
                    >
                      x
                    </button>
                  )}
                  <input
                    type="text"
                    value={col}
                    onChange={(e) => dispatch({ type: 'UPDATE_COLUMN', index: colIndex, value: e.target.value })}
                    className="w-full  p-1 text-center"
                  />
                 
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='p-4'>
            {state.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className='bg-[#F7F7F7] border-b border-gray-200 '>
                <td className="p-2">
                  <input
                    type="text"
                    value={row}
                    onChange={(e) => dispatch({ type: 'UPDATE_ROW', index: rowIndex, value: e.target.value })}
                    className="w-full  p-1"
                  />
                  {state.rows.length > 1 && (
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_ROW', index: rowIndex })}
                      className="text-xs text-red-500"
                    >
                      حذف
                    </button>
                  )}
                </td>
                {state.columns.map((_, colIndex) => (
                  <td key={colIndex} className="text-center p-2 ">
                    <div className='bg-white  w-[30px] h-[30px] flex items-center justify-center rounded-full'>
                    <input className='w-[30px] h-[30px] bg-white' type={state.choiceType === 'single' ? 'radio' : 'checkbox'} disabled />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            <div>
            <tr>
              <td ></td>
            </tr>
            </div>
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-5'>

<button onClick={() => dispatch({ type: 'ADD_ROW' })} className="text-blue-600">+ إضافة صف  </button>
      </div>
      <div className="mt-4 flex justify-end  space-x-4">
        <div className='flex flex-col gap-4'>
          <h2 className='font-bold text-2xl'>طريقة عرض السؤال </h2>
        <label className="flex justify-end items-center space-x-2">
          <span>اختيارات متعددة</span>
          <input
            type="checkbox"
              className={`flex justify-end items-center space-x-2 px-2 py-1 rounded 
    ${state.choiceType === 'multiple' ? 'bg-[#0E0464] text-white' : 'bg-transparent text-black'}`}
            checked={state.choiceType === 'multiple'}
            onChange={() => dispatch({ type: 'TOGGLE_CHOICE_TYPE' })}
            />
        </label>
        <label className="flex justify-end items-center space-x-2">
          <span>مطلوب</span>
          <input
            type="checkbox"
            checked={state.required}
            onChange={() => dispatch({ type: 'TOGGLE_REQUIRED' })}
          />
        </label>

            </div>
      </div>
<Divider className='mt-3 mb-3'/>
      <div className="mt-6 flex items-center gap-5">
        <Button onClick={onSave} sx={{width: "158px", height: "46px", borderRadius: "64px", backgroundColor:"#0E0464", fontSize: "16px", color: "#fff"}} endIcon={<CiCircleCheck/>}>
          حفظ السؤال
        </Button>
        <Button variant="outlined" startIcon={<GoPlus />} sx={{width: "158px", height: "46px", borderRadius: "64px", fontSize: "16px", color: "#0E0464", marginLeft: "10px"}} >
          إضاف سؤال آخر
        </Button>
        <div className="w-[48px] h-[48px] rounded-full bg-[#EAF5FF] text-[#0E0464] flex items-center justify-center ">
            <RiDeleteBin4Line className='w-[18px] h-[16px] '/>
        </div>
        <div className="w-[48px] h-[48px] rounded-full bg-[#EAF5FF] text-[#0E0464] flex items-center justify-center  ">
            <FaRegCopy className='w-[18px] h-[16px] '/>
        </div>
      </div>
    </div>
    </>
  );
}