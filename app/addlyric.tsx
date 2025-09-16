import { globalStyles } from "@/constants/globalStyles";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { useRef, useState, useContext } from 'react';
import BackButton from "@/components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalListContext } from "@/global/GlobalListProvider";
import ButtonGPT from '@/components/ButtonGPT'
import ToastMessage, {ToastMessageHandle} from "@/components/ToastMessage";



export default function AddLyric(){
    const [inputLyric, setInputLyric] = useState('');
    const context = useContext(GlobalListContext);
    const toastRef = useRef<ToastMessageHandle | null>(null);

    const showToast = (message: string) => {
        if (toastRef.current) {
            toastRef.current.show({ message, duration: 3000 });
        }
    }

    if(!context){
        throw new Error('AddLyric must be used within a GlobalListProvider');
    }
    const { addItem } = context;

    const handleAddLyric= () => {
        if (inputLyric.trim() !== '') {

            if (inputLyric.length > 0) {
                addItem({ name: 'Letra', lyric: inputLyric, link: "" });
                showToast('Letra adicionada!');
            } else {
                showToast('Nenhum link válido!');
            }
        } 
        else {
            showToast('Letra inválida!');
        }
    };

    return (
    <SafeAreaView style={globalStyles.container}>
        <BackButton></BackButton>
        <Text>Adicione a letra separando as estrofes pulando uma linha</Text>
        <TextInput 
            autoFocus={true}
            style={styles.input}
            placeholder={'Adicionar letra!'}
            value={inputLyric}
            onChangeText={setInputLyric}
            multiline={true}
            numberOfLines={5}
            />
        <View style={styles.btn}>
            <ButtonGPT title="Adicionar" onPress={handleAddLyric} iconName="add"/>
        </View>

        <ToastMessage ref={toastRef}></ToastMessage>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '100%',
        color: '#000',
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#000000',
        borderWidth: 2,
        height: 300,
        
    },
    btn :{
        paddingTop: 20
    }
});