import { PropsWithChildren, RefObject, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { RootState } from '@store/store';
import { Button, Flex } from 'antd';

type Props = {
  scrollableContainerRef: RefObject<HTMLDivElement>;
};
const DEFAULT_SCROLL_OFFSET = 200;

export const ScrollButtons = ({ children, scrollableContainerRef }: PropsWithChildren<Props>) => {
  const [startDisabled, setStartDisabled] = useState(true);
  const [endDisabled, setEndDisabled] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const { categories } = useSelector((state: RootState) => state.productCategory);

  const handleScroll = (scrollOffset: number) => {
    scrollableContainerRef.current?.scrollBy({ left: scrollOffset, behavior: 'smooth' });
  };

  const calculateScroll = () => {
    const container = scrollableContainerRef.current;

    if (container) {
      const scrollLeft = container.scrollLeft;
      const windowWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;

      setStartDisabled(scrollLeft <= 10);
      setEndDisabled(scrollLeft + windowWidth >= scrollWidth - 10);
      setIsScrollable(scrollWidth > windowWidth);
    }
  };

  useEffect(() => {
    const container = scrollableContainerRef.current;

    if (container) {
      calculateScroll();

      container.addEventListener('scroll', calculateScroll);
      window.addEventListener('resize', calculateScroll);

      return () => {
        container.removeEventListener('scroll', calculateScroll);
        window.removeEventListener('resize', calculateScroll);
      };
    }
  }, []);

  useEffect(() => {
    calculateScroll();
  }, [categories]);

  return (
    <Flex className="w-full">
      {isScrollable ? (
        <Button
          className="w-4"
          type="primary"
          ghost
          disabled={startDisabled}
          onClick={() =>
            handleScroll(
              -(scrollableContainerRef.current
                ? scrollableContainerRef.current?.clientWidth / 2
                : DEFAULT_SCROLL_OFFSET),
            )
          }>
          <LeftOutlined />
        </Button>
      ) : null}
      {children}
      {isScrollable ? (
        <Button
          className="w-5"
          type="primary"
          disabled={endDisabled}
          ghost
          onClick={() =>
            handleScroll(
              scrollableContainerRef.current
                ? scrollableContainerRef.current?.clientWidth / 2
                : DEFAULT_SCROLL_OFFSET,
            )
          }>
          <RightOutlined />
        </Button>
      ) : null}
    </Flex>
  );
};
