import { ToastMessageHandle } from '@/components/ToastMessage';
import { useRef } from 'react';

export const useToast = () => {
  const toastRef = useRef<ToastMessageHandle | null>(null);

  const showToast = (message: string) => {
    if (!toastRef.current) {
      throw new Error('toastRef.current is null');
    }

    toastRef.current.show({ message, duration: 3000 });
  };

  return { toastRef, showToast };
};
