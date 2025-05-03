import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import DOMPurify from 'dompurify';

const DescriptionPage = () => {
  const { clientAppConfig } = useSelector((state: RootState) => state.clientAppConfig);

  const cleanHtml = DOMPurify.sanitize(
    (clientAppConfig?.description || '').replace(/\n/g, '<br/>'),
  );

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export default DescriptionPage;
