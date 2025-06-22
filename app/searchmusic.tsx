import { globalStyles } from "@/constants/globalStyles";
import { View, Text, StyleSheet, TextInput, ScrollView, Alert} from "react-native";
import { useRef, useState, useContext } from 'react';
import { MusicSearch } from "@/components/MusicSearch";
import { fetchLyric, fetchSearchResults } from "@/services/apiService";
import { CustomMessageBox } from "@/components/CustomMessageBox";
import ToastMessage, {ToastMessageHandle} from "@/components/ToastMessage";
import { GlobalListContext } from "@/global/GlobalListProvider";
import BackButton from "@/components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";

interface Result{
    link: string,
    name: string
}

export default function SearchMusic(){
    const [searchInputValue, setSearchInputValue ] = useState<string>('');
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const [result, setResults] = useState<Result[]>([]);
    const [isTyping, setIsTyping] = useState(false); 
    const [isSearching, setIsSearching] = useState(false); 
    const [isZeroResults, setIsZeroResults] = useState(false); 
    const [isMessageBoxVisible, setMessageBoxVisible] = useState(false);
    const [contentLyricSelected, setContentLyricSelected] = useState('');
    const [titleLyricSelected, setTitleLyricSelected] = useState('');
    const [linkSelected, setLinkSelected] = useState('');
    const toastRef = useRef<ToastMessageHandle | null>(null);
    const context = useContext(GlobalListContext);
    

    if(!context){
        throw new Error('SearchMusic must be used within a GlobalListProvider');
    }
    const { addItem } = context;

    const handleInputSearchChange = (text : string) =>{
        console.log('Typing... ',text);
        setSearchInputValue(text);
        setResults([]);
        setIsTyping(true);
        setIsZeroResults(false);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        if(isSearching)
            return;

        setTypingTimeout(
            setTimeout(() => {
              executeAfterTypingStops(text);
            }, 3000) // Wait 3 seconds after last input
        );
    }

    const executeAfterTypingStops = (text: string) => {

        if(text === ''){
            setIsTyping(false);
            return;
        }

        console.log('Searching... ',text);
        setIsSearching(true);
        fetchSearchResults(text)
            .then((data) => {
                console.log('Results fetched successfully for: ',text);
                setIsTyping(false);
                setIsSearching(false);
                if(data.length <= 0)
                    setIsZeroResults(true);

                if(noResultsArray(data)){
                    console.log("No results array");
                    setIsZeroResults(true);
                }
                else
                    setResults(data);
            })
            .catch((error) => {
                console.error('Error ao buscar resultados dados:', error.message);
                Alert.alert("Não foi possível se conectar ao servidor");
                setIsTyping(false);
                setIsSearching(false);
            });
    };

    const noResultsArray = (arr: any): boolean => {
        return Array.isArray(arr) && arr.length === 1 && arr[0] === "Nenhum resultado encontrado.";
    };

    const handlePressItem = (title: string, link : string) =>{
        setMessageBoxVisible(true);
        setContentLyricSelected('...');

        //set title and link selected
        setTitleLyricSelected(title)
        setLinkSelected(link);

        fetchLyric(link)
            .then((data) =>{
                setContentLyricSelected(data);
            })
            .catch((error) =>{
                console.error('Error ao buscar letra da música:', error);
                Alert.alert('error: ',error.message);
            });

    }

    const handlePressAddItem = (title: string, link: string) => {
        setTitleLyricSelected(title);
        addItem({'name': title, 'link': link});
        showToast(`'${title}' Adicionado a lista de músicas`);
    }

    const handleCancel = () => {
        setMessageBoxVisible(false);
    };

    const handleConfirm = () => {
        setMessageBoxVisible(false);

        addItem({'name': titleLyricSelected, 'link': linkSelected});
        showToast(`'${titleLyricSelected}' Adicionado a lista de músicas`)
    }

    
    const showToast = (message: string) => {
        if (toastRef.current) {
            toastRef.current.show({ message, duration: 3000 });
        }
    }


    return (
    <SafeAreaView style={globalStyles.container}>
        <BackButton></BackButton>
        <TextInput 
            autoFocus={true}
            style={styles.input}
            placeholder={'Pesquisar uma Música'}
            value={searchInputValue}
            onChangeText={text => handleInputSearchChange(text)}/>


        {!isTyping && isZeroResults && <Text style={styles.zeroResults}>Nenhum Resultado Encontrado</Text>}
        
        
        <ScrollView style={styles.scroll}>
            <View>
            {
                isTyping ? 
                    Array.from({length: 6}).map((_, index) => (
                    <MusicSearch 
                        key={index}
                        title='Carregando...' 
                        link='Carregando...' 
                        onPress={()=>{}} 
                        onPressAdd={()=>{}} 
                        isLoading={true}></MusicSearch>)) : 
                    
                    result.map((item, index) => {
                        return <MusicSearch 
                                    key={index}
                                    title={item.name}
                                    link={item.link}
                                    onPress={handlePressItem}
                                    onPressAdd={handlePressAddItem} />
                    })
            }
            </View>
        </ScrollView>
        <CustomMessageBox 
                  visible={isMessageBoxVisible}
                  title={titleLyricSelected}
                  content={contentLyricSelected}
                  confirmText='Adicionar'
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}/>

        <ToastMessage ref={toastRef}></ToastMessage>
        
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container : {
      //  backgroundColor: '#fff',
      //  height: '100%'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '100%',
        color: '#000',
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#000000',
        borderWidth: 2,
    },
    scroll:{
        paddingTop: 20,
        height: 550
    },
    searching:{
        fontSize: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    zeroResults:{
        fontSize: 16,
        justifyContent: 'center',
        paddingTop: 20,
        alignItems: 'center',
        textAlign: 'center',
    },
    shimmerContainer:{
        backgroundColor: 'red'
    },
    shimmer: {
        marginBottom: 10,
        height: 20,
        width: '100%',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});