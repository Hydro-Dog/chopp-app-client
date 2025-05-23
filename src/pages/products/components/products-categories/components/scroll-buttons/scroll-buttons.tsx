import { ReactNode, RefObject, useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

type Props = {
  children: ReactNode;
  scrollableContainerRef: RefObject<HTMLDivElement>;
};

export const ScrollButtons = ({ children, scrollableContainerRef }: Props) => {
  const [isStart, setStart] = useState(true);
  const [isEnd, setEnd] = useState(false);
  const [hasScroll, setScroll] = useState(false);

  const handleScroll = (pixels: number) => {
    scrollableContainerRef.current?.scrollBy({ left: pixels, behavior: 'smooth' });
  };

  const checkScroll = () => {
    const container = scrollableContainerRef.current;
    if (!container) return;
    else {
      const scrollLeft = container.scrollLeft;
      const windowWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;

      setStart(scrollLeft <= 10);
      setEnd(scrollLeft + windowWidth >= scrollWidth - 10);

      setScroll(scrollWidth > windowWidth);
    }
  };
  useEffect(() => {
    const container = scrollableContainerRef.current;
    if (container) {
      checkScroll();

      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);

      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  return (
    <Flex className="w-full">
      {hasScroll ? (
        <Button
          className="w-4"
          type="primary"
          ghost
          disabled={isStart}
          onClick={() =>
            handleScroll(
              -(scrollableContainerRef.current
                ? scrollableContainerRef.current?.clientWidth / 2
                : 200),
            )
          }>
          <LeftOutlined />
        </Button>
      ) : null}
      {children}
      {hasScroll ? (
        <Button
          className="w-5"
          type="primary"
          disabled={isEnd}
          ghost
          onClick={() =>
            handleScroll(
              scrollableContainerRef.current
                ? scrollableContainerRef.current?.clientWidth / 2
                : 200,
            )
          }>
          <RightOutlined />
        </Button>
      ) : null}
    </Flex>
  );
};
