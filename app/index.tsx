import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

import * as FileSystem from 'expo-file-system';

import { MusicItem } from '@/components/MusicItem';
import React, { useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import ToastMessage from '@/components/ToastMessage';
import ButtonGPT from '@/components/ButtonGPT'
import { GlobalListContext } from '@/global/GlobalListProvider';
import { fetchLyric, generateSlides } from "@/services/apiService";
import { CustomMessageBox } from '@/components/CustomMessageBox';
import StatusBarSpacing from '@/components/StatusBarSpacing';
import FileBox from '@/components/FileBox';
import { useToast } from '@/utils/toastUtils';
import { handleSave, handleShare, handleCancelShare, download } from '@/utils/handleFile';

export default function HomeScreen() {
  const router = useRouter();
  const context = useContext(GlobalListContext);
  const [isMessageBoxVisible, setMessageBoxVisible] = useState(false);
  const [isFileBoxVisible, setFileBoxVisible] = useState(false);
  const [contentLyricSelected, setContentLyricSelected] = useState('');
  const [titleLyricSelected, setTitleLyricSelected] = useState('');
  const [fileNameGenerated, setFileNameGenerated] = useState('');
  const [fileUriGenerated, setFileUriGenerated] = useState('');
  const [fileUrlGenerated, setFileUrlGenerated] = useState('');
  const [disabledGenerate, setDisableGenerated] = useState(false);

  if(!context){
    throw new Error('HomeScreen must be used within a GlobalListProvider');
  }
  const {musicList, removeItem, moveItem} = context;

  const handlePressAddMusic = () =>{
    router.push('/searchmusic');
  }

  const handlePressAddLinks = () =>{
    router.push('/addlinks');
  }

  const handlePressAddLyric = () =>{
    router.push('/addlyric');
  }

  const { toastRef, showToast } = useToast();

  const handlePressGenerateSlides = async () => {

    setDisableGenerated(true);
    
    if(musicList.length === 0){
      showToast('Adicione músicas antes de gerar slides');
      setDisableGenerated(false);
      return;
    }

    try{
      const MusicListjson = {
        params: musicList.map(({ link, ...rest }) =>
          link && link.trim() !== ""
            ? { ...rest, link }
            : { ...rest }
        )
      };
      console.log('MusicListjson:', JSON.stringify(MusicListjson));
      console.log('Generating slides...');
      showToast('Gerando Slides...');

      var data
      //gerando slides
      try {
        data = await generateSlides(MusicListjson);
        showToast('Slides gerados com sucesso!');
        console.log('Slides generated:', JSON.stringify(data));
      }
      catch (error: any) {
        if (error.message && (error.message.includes('Network Error') || error.message.includes('timeout') || error.message.includes('Failed to fetch'))) {
          showToast('Erro de conexão com o servidor. Verifique sua internet.');
        } else {
          showToast('Erro ao gerar slides');
        }
        console.error('Error generating slides:', error);
      }
      
      const file_url = data.file_url;
      const fileName = data.file_name;
      const file_uri = `${FileSystem.documentDirectory}${fileName}`;

      setFileNameGenerated(fileName);
      setFileUriGenerated(file_uri);
      setFileUrlGenerated(file_url);

      
      download(file_url, file_uri, showToast)
        .then(()=>{
          setFileBoxVisible(true);
          setDisableGenerated(false);
        })
        .catch((e)=>{
          console.error(e.message);
          Alert.alert('Erro ao baixar o arquivo:', e.message);
          setDisableGenerated(false);
        });

      
    }catch(error : any){
      console.error('Error fetching data:', error);
      Alert.alert('Erro ao gerar slides', error.message);

      setDisableGenerated(false);
    }
  };

  const handlePressItem = (title: string, link : string, lyric : string) =>{
          setMessageBoxVisible(true);
          setContentLyricSelected('...');
  
          //set title and link selected
          setTitleLyricSelected(title);

          console.log('link: ', link);
          console.log('lyric: ', lyric);

          if (lyric && lyric.length > 0){
             setContentLyricSelected(lyric);
          }
          else if (link != "Letra Adicionada"){
            fetchLyric(link)
              .then((data) =>{
                  setContentLyricSelected(data);
              })
              .catch((error) =>{
                  console.error('Error fetching lyrics:', error.message);
                  Alert.alert('Error: ', error.message);
            });
          }
          else{
            setContentLyricSelected('Nenhuma letra disponível para esta música.');
          }
      }
  

  const handleCancel = () => {
    setMessageBoxVisible(false);
  };

  const handleMoveItem = (index : number, direction: number) =>{
    console.log('index: ', index);
    console.log('direction: ', direction);

    moveItem(index, direction);
  }

  console.log('IDs:', musicList.map(i => i.id));

   
  return (
    <View style={[styles.container]}>
      <StatusBarSpacing/>
      <FileBox
        fileName={fileNameGenerated}
        onSave={ () => handleSave(fileUriGenerated, fileNameGenerated, fileUrlGenerated, showToast)}
        onShare={() =>handleShare(fileUriGenerated, fileUrlGenerated)}
        onCancel={() =>handleCancelShare(setFileBoxVisible)}
        visible={isFileBoxVisible}
      />
      <Text style={styles.title}>Adicionar Músicas!</Text>
     
      <ButtonGPT title="Pesquisar Música" onPress={handlePressAddMusic} iconName="search"/>
      <View style={styles.btnLink}>
        <ButtonGPT  title="Adicionar Links" onPress={handlePressAddLinks} iconName="link"/>
      </View>
      <View style={styles.btnLink}>
        <ButtonGPT  title="Adicionar Letra" onPress={handlePressAddLyric} iconName="lyrics"/>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.items}>
          {
            musicList.map((item, index) => {
              return <MusicItem 
                        key={item.id}
                        title={item.name}
                        description={item.link ? item.link : 'Letra Adicionada'}
                        lyric ={item.lyric ? item.lyric : ''}
                        itemIndex={index}
                        onPress={handlePressItem}
                        onDelete={() => removeItem(item.id)}
                        onMove={handleMoveItem}
                        />
            })
          }
        </View>
        </ScrollView>
        
        
      <CustomMessageBox 
                        visible={isMessageBoxVisible}
                        title={titleLyricSelected}
                        content={contentLyricSelected}
                        cancelText='OK'
                        onCancel={handleCancel}/>

      <ToastMessage ref={toastRef}></ToastMessage>

      <View style={styles.footer}>
          <ButtonGPT title="Gerar Slides" onPress={handlePressGenerateSlides} iconName="send" disabled={disabledGenerate}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    //backgroundColor: '#E8EAED',
    marginLeft: 20,
    marginRight: 20,
  },
  musicWrapper:{
    paddingHorizontal: 20
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  items:{
    
  },
  writeTaskWrapper : {
    width: '100%',
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '60%',
    color: '#000',
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    
  },
  addText:{
    fontSize: 30,
    fontWeight: 'bold',
    //backgroundColor: 'red',
    height: 45
  },

  scroll:{
    marginTop: 20,
    marginBottom: 100,
  },

  footer:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,

  },
  btnLink:{
    paddingTop: 20
  }

});
