import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importando ícones do Expo
import ButtonGPT from '@/components/ButtonGPT';

// Definindo as props do componente
interface FileBoxProps {
  fileName: string; // Nome do arquivo
  onSave: () => void; // Função para salvar o arquivo
  onShare: () => void; // Função para compartilhar o arquivo
  onCancel: () => void;
  visible: boolean;
}

const FileBox: React.FC<FileBoxProps> = ({ fileName, onSave, onShare, onCancel, visible }) => {
  return (
    <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onCancel}
        >
        <View style={styles.overlay}>
            <View style={styles.alertBox}>
                <Text style={styles.title}>Slide Gerado com Sucesso!</Text>
                <TouchableOpacity 
                    style={styles.buttonClose} 
                    onPress={onCancel}
                    activeOpacity={0.7}>
                    <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>
                <MaterialIcons style={styles.icon} name="description" size={24} color="#555" /> 
                <View style={styles.fileInfo}>
                    <Text style={styles.fileName}>{fileName}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <ButtonGPT title='Salvar' iconName='save' onPress={onSave}/>
                    <View style={styles.buttonSpacer} />
                    <ButtonGPT title='Compartilhar' iconName='share' onPress={onShare}/>
                </View>
            </View>
        </View>
    </Modal>
  );
};

// Estilos
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        marginBottom: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
    alertBox: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, //para Android
        position: 'relative'
    },
    container: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        marginVertical: 8,
    },
    icon:{
        fontSize: 100,
        color: '#FD6F01'
    },
    fileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileName: {
        marginLeft: 8,
        fontSize: 14,
        color: '#333',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        //backgroundColor: 'red',
        width: '100%',
        marginTop: 20,
        marginBottom: 10
    },
    buttonSpacer: {
        width: 16, // Espaçamento entre os botões
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 4,
    },
    buttonText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 14,
    },

    buttonClose:{
        position: 'absolute',
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        zIndex: 1000
    }
});

export default FileBox;