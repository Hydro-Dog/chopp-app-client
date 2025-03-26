import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import DOMPurify from 'dompurify';

export const DeliveryPage = () => {
  const { clientAppConfig } = useSelector((state: RootState) => state.clientAppConfig);

  const cleanHtml = DOMPurify.sanitize(
    (clientAppConfig?.deliveryAndPaymentsVerbose || '').replace(/\n/g, '<br/>'),
  );

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};
