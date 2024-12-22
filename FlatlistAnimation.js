import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate } from 'react-native-reanimated';

const data = new Array(20).fill().map((x, i) => i + 1);
const cardHeight = 120;
const padding = 10;
const offset = cardHeight + padding;

const AnimatedCard = ({ scrollY, index }) => {
    const inputRange = [offset * index, offset * index + offset];
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(scrollY.value, inputRange, [1, 0], 'clamp')
            },
            {
                translateY: interpolate(scrollY.value, inputRange, [0, offset / 2], 'clamp')
            }
        ],
        opacity: interpolate(scrollY.value, inputRange, [1, 0], 'clamp')
    }));
    return <Animated.View style={[styles.card, animatedStyle]} />;
};

export default function AnimatedScroll1() {
    const scrollY = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {

            console.log('event ===>',event)
            scrollY.value = event.contentOffset.y;
        },
    })



    return (
        <Animated.FlatList
            style={styles.container}
            data={data}
            onScroll={onScroll}
            scrollEventThrottle={16}
            keyExtractor={item => item.toString()}
            renderItem={({ item, index }) => (
                <AnimatedCard scrollY={scrollY} index={index} />
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        paddingVertical: padding / 2,
    },
    card: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: padding / 2,
        minHeight: cardHeight,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
});
