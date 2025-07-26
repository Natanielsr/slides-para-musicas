import { globalStyles } from "@/constants/globalStyles";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { useRef, useState, useContext } from 'react';
import BackButton from "@/components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalListContext } from "@/global/GlobalListProvider";
import ButtonGPT from '@/components/ButtonGPT'
import ToastMessage, {ToastMessageHandle} from "@/components/ToastMessage";



export default function SearchMusic(){
    const [inputLink, setInputLink] = useState('');
    const context = useContext(GlobalListContext);
    const toastRef = useRef<ToastMessageHandle | null>(null);

    const showToast = (message: string) => {
        if (toastRef.current) {
            toastRef.current.show({ message, duration: 3000 });
        }
    }

    if(!context){
        throw new Error('SearchMusic must be used within a GlobalListProvider');
    }
    const { addItem } = context;

    const handleAddLink = () => {
        if (inputLink.trim() !== '') {
            const linksSeparados = inputLink.split(',')
                                            .map(link => link.trim())
                                            .filter(link => link.length > 0);

            if (linksSeparados.length > 0) {
                linksSeparados.forEach(link => {
                    addItem({ name: 'link', link });
                });
                showToast('Links adicionados!');
            } else {
                showToast('Nenhum link válido!');
            }
        } 
        else {
            showToast('Link inválido!');
        }
    };

    return (
    <SafeAreaView style={globalStyles.container}>
        <BackButton></BackButton>
        <Text>Adicione os links separados por virgula ex: www.link.com/, www.link2.com</Text>
        <TextInput 
            autoFocus={true}
            style={styles.input}
            placeholder={'Adicionar um Link!'}
            value={inputLink}
            onChangeText={setInputLink}
            multiline={true}
            numberOfLines={5}
            />
        <View style={styles.btn}>
            <ButtonGPT title="Adicionar" onPress={handleAddLink} iconName="add"/>
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