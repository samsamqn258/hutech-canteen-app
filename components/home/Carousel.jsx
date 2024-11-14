import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { wp } from '@/helpers/common';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef();

  useEffect(() => {
    let interval = setInterval(() => {
      if (flatlistRef.current) {
        // Kiểm tra nếu flatlistRef đã được gán
        if (Math.round(activeIndex) === carouselData.length - 1) {
          flatlistRef.current.scrollToIndex({
            index: 0,
            animation: true,
          });
        } else {
          flatlistRef.current.scrollToIndex({
            index: Math.round(activeIndex) + 1,
            animation: true,
          });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const getItemLayout = (data, index) => ({
    length: wp(100) - 28,
    offset: index * (wp(100) - 28),
    index,
  });

  const carouselData = [
    {
      id: '01',
      image:
        'https://img.freepik.com/free-vector/flat-design-sale-background_23-2149066479.jpg',
    },
    {
      id: '02',
      image:
        'https://static.vecteezy.com/system/resources/previews/007/076/261/non_2x/hot-sale-flyer-banner-fire-layout-on-red-background-with-discount-percents-off-template-design-for-list-page-mockup-brochure-style-banner-idea-cover-booklet-print-flyer-and-book-free-vector.jpg',
    },
    {
      id: '03',
      image:
        'https://img.freepik.com/free-vector/flash-sale-background-with-discount_23-2148891129.jpg',
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          source={{ uri: item.image }}
          className="h-48 rounded-xl object-cover"
          style={{ width: wp(100) - 28 }}
        />
      </View>
    );
  };

  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    const index = scrollPosition / (wp(100) - 28);
    setActiveIndex(index);
  };

  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => {
      if (Math.round(activeIndex) === index) {
        return (
          <View
            className="bg-black h-[2px] w-6 rounded-full"
            key={index}
          ></View>
        );
      }
      return (
        <View className="bg-white h-[2px] w-6 rounded-full" key={index}></View>
      );
    });
  };

  return (
    <View className="mt-4">
      <FlatList
        ref={flatlistRef}
        data={carouselData}
        renderItem={renderItem}
        horizontal={true}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={handleScroll}
      />
      <View className="flex flex-row gap-3 justify-center absolute bottom-3 left-2/4 -translate-x-2/4">
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default Carousel;
