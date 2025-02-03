import { transform } from '@babel/core';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, ViewStyle } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface ShimmerProps {
    style?: ViewStyle; // Tipo do estilo para componentes animados
}


export const Shimmer: React.FC<ShimmerProps> = ({ style }) =>{

    const x = useSharedValue(0);
    useEffect(()=>{
        x.value = 0;
        x.value = withRepeat(withTiming(1, {duration: 1500}), -1, false);
    }, []);

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX : interpolate(x.value, [0, 1], [-width, width])}
        ],
        opacity: interpolate(x.value, [0, 0.5, 1], [0.3, 1, 0.3]) // Suaviza a transição
    }));
    
    return (
        <View style={StyleSheet.flatten([styles.box, style])}>
            <AnimatedLinearGradient
                colors={['#B0B3B8', '#F1F3F4', '#B0B3B8']}
                style={[{... StyleSheet.absoluteFillObject}, rStyle]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    box:{
        width: '90%',
        height: 20,
        borderRadius: 12,
        backgroundColor: '#B0B3B8',
        overflow: 'hidden'
    }
});