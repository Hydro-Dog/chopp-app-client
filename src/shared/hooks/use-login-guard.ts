import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useRootContext } from '@widgets/root-container/root-provider';

export const useLoginGuard = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { openLoginModal } = useRootContext();

  const loginGuard = (fn: () => void) => {
    if (!currentUser) {
      openLoginModal();
    } else {
      fn();
    }
  };

  return { loginGuard };
};
