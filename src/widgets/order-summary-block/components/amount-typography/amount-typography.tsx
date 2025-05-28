import { Typography, Flex } from 'antd';

const { Title } = Typography;

type Props = {
  title: string;
  amount: number;
};

export const AmountTypography = ({ title, amount }: Props) => {
  return (
    <Flex justify="space-between" align="center">
      <Title level={5} type="secondary" className="!m-0">
        {title}
      </Title>
      <Title level={5} className="!m-0 !font-extrabold">
        {amount}₽
      </Title>
    </Flex>
  );
};
