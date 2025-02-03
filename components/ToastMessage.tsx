import React, { useState, useImperativeHandle, forwardRef, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

interface ToastParams {
    message: string;
    duration?: number;
}

export interface ToastMessageHandle {
    show: (params: ToastParams) => void;
}

const ToastMessage = forwardRef<ToastMessageHandle>((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current; // animação de opacidade
    const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null);

    useImperativeHandle(ref, () => ({
        show({ message, duration = 3000 }: ToastParams) {
            setMessage(message);
            setVisible(true);

            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            if (toastTimeout) {
                clearTimeout(toastTimeout);
            }

            const timeout = setTimeout(() => hideToast(), duration);
            setToastTimeout(timeout);
        }
    }));

    const hideToast = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };

    if (!visible) {
        return null;
    }

    return (
        <Animated.View
            style={[
                styles.toast,
                { opacity: fadeAnim } // aplica a animação de fade
            ]}
        >
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        zIndex: 999,
        alignItems: 'center'
    },
    toastText: {
        color: 'white',
        fontSize: 16
    }
});

export default ToastMessage;