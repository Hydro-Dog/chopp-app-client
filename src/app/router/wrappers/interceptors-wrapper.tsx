import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PropsWithChildrenOnly } from '@shared/index';
import { AppDispatch, wsConnect, wsDisconnect } from '@store/index';
import { useAxiosInterceptors } from '@store/middleware';

export const InterceptorsWrapper = ({ children }: PropsWithChildrenOnly) => {
  const dispatch = useDispatch<AppDispatch>();

  useAxiosInterceptors();

  useEffect(() => {
    dispatch(
      wsConnect({
        url: `${import.meta.env.VITE_BASE_WS}`,
      }),
    );

    return () => wsDisconnect();
  }, [dispatch]);

  return children;
};
