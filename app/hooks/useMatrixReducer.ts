import { useReducer } from 'react';
import { MatrixState, MatrixAction } from '../types/matrix';

const initialState: MatrixState = {
  question: '',
  rows: ['المنتج الأول', 'المنتج الثاني'],
  columns: ['ممتاز',   'جيد جداً','جيد','متوسط', 'سئ'],
  choiceType: 'single',
  required: false,
};

function matrixReducer(state: MatrixState, action: MatrixAction): MatrixState {
  switch (action.type) {
    case 'SET_QUESTION':
      return { ...state, question: action.payload };
    case 'ADD_ROW':
      return { ...state, rows: [...state.rows, `العنصر ${state.rows.length + 1}`] };
    case 'REMOVE_ROW':
      return state.rows.length > 1
        ? { ...state, rows: state.rows.filter((_, i) => i !== action.index) }
        : state;
    case 'UPDATE_ROW': {
      const rows = [...state.rows];
      rows[action.index] = action.value;
      return { ...state, rows };
    }
    case 'ADD_COLUMN':
      return { ...state, columns: [...state.columns, `خيار ${state.columns.length + 1}`] };
    case 'REMOVE_COLUMN':
      return state.columns.length > 1
        ? { ...state, columns: state.columns.filter((_, i) => i !== action.index) }
        : state;
    case 'UPDATE_COLUMN': {
      const columns = [...state.columns];
      columns[action.index] = action.value;
      return { ...state, columns };
    }
    case 'TOGGLE_CHOICE_TYPE':
      return { ...state, choiceType: state.choiceType === 'single' ? 'multiple' : 'single' };
    case 'TOGGLE_REQUIRED':
      return { ...state, required: !state.required };
    case 'RESET':
      return action.payload;
    default:
      return state;
  }
}

export function useMatrixReducer() {
  return useReducer(matrixReducer, initialState);
}



export { initialState };