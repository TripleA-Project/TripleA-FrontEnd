import { toast, cssTransition, type ToastOptions } from 'react-toastify';

export function toastNotify(type: ToastOptions['type'], message: string, containerId?: string) {
  const getTypeColor = (type: ToastOptions['type']) => {
    switch (type) {
      case 'success':
        return '#3be38f';
      case 'error':
        return '#e3493b';
      default:
        return '';
    }
  };

  return toast(message, {
    type,
    style: {
      borderTop: `4px solid ${getTypeColor(type)}`,
      margin: '0 auto 83px',
      maxWidth: '90vw',
    },
    transition: cssTransition({
      enter: 'animate__animated animate__fadeInUp',
      exit: 'animate__animated animate__fadeOutDown',
    }),
    ...(containerId && { containerId }),
  });
}
