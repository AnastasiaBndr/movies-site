import toast from 'react-hot-toast';

export const toastSuccess = (text = '') =>
  toast.success(`${text}`, {
    duration: 3000,
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });

export const toastError = text =>
  toast.error(`${text}`, {
    duration: 3000,
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });