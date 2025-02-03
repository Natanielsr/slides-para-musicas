import React  from "react";
import { Modal, View, Text, StyleSheet, ScrollView } from 'react-native';
import ButtonGPT from '@/components/ButtonGPT'

interface CustomMessageBoxProps{
    visible: boolean;
    title: string;
    content : string;
    onCancel: () => void;
    onConfirm?: () => void;
    cancelText? : string;
    confirmText?: string;
}

export const CustomMessageBox: React.FC<CustomMessageBoxProps> = ({
    visible,
    title,
    content,
    onCancel,
    onConfirm,
    cancelText = 'Cancelar',
    confirmText = 'Ok'

}) =>{
    return (
    <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={onCancel}
    >
        <View style={styles.overlay}>
            <View style={styles.alertBox}>
                <Text style={styles.title}>{title}</Text>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.message}>{content}</Text>
                </ScrollView>
                <View style={styles.buttonContainer}>

                    <ButtonGPT title={cancelText} onPress={onCancel} iconName='cancel'/>

                    { onConfirm && 
                    (
                        <ButtonGPT title={confirmText} onPress={onConfirm} iconName='check'/>
                    )}
                </View>
            </View>
        </View>

    </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertBox: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, //para Android
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: 'center',
        textAlign: 'center'
    },
    message:{
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
      //  backgroundColor: 'red'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button:{
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#007bff',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3, //para android

    },
    buttonText:{
        color: 'white',
        fontSize: 16
    },
    scrollView: {
        width: '100%',
        height: 500,
        marginBottom: 20,
      //  backgroundColor: 'green'
    }

})
