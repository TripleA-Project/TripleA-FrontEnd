import { AppLogos } from '@/components/Icons';
import { toast, cssTransition, type ToastOptions } from 'react-toastify';

export function toastNotify(type: ToastOptions['type'], message: string, containerId?: string) {
  return toast(message, {
    type,
    style: {
      margin: '0 16px 120px',
      background: 'rgba(0,0,0,.8)',
      color: '#fff',
      overflow: 'hidden',
      borderRadius: '50px',
    },
    icon(props) {
      return (
        <div className="flex h-fit w-fit items-center justify-center rounded-[4px] bg-white p-1">
          <AppLogos.Orange className="h-4 w-4 shrink-0" />
        </div>
      );
    },
    transition: cssTransition({
      enter: 'animate__animated animate__fadeInUp',
      exit: 'animate__animated animate__fadeOutDown',
    }),
    ...(containerId && { containerId }),
  });
}
