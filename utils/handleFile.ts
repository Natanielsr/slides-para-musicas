import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { Platform } from 'react-native';

export const download = async (file_url: string, file_uri: string, showToast: (message: string) => void) => {

  if  (Platform.OS === 'web') {
    downloadWeb(file_url, showToast);
  }
  else{
    try {
      const download = await FileSystem.downloadAsync(file_url, file_uri);
      console.log('Slide downloaded successfully:', download.uri);
      showToast('Slides baixados com sucesso!');
    } catch (error) {
      console.error('Erro ao baixar slide:', error);
      showToast('Erro ao baixar slide.');
    }
  }
};

export const save = async (uri: string, filename: string, showToast: (message: string) => void) => {
  showToast('Salvando Arquivo...');
  if (Platform.OS === 'android') {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      try {
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimeType);
        await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });
        showToast(`Arquivo '${filename}' salvo com sucesso`);
      } catch (error : any) {
        console.error('Error saving file:', error.message);
      }
    } else {
      shareAsync(uri);
    }
  } else {
    shareAsync(uri);
  }
};

export const handleSave = (fileUriGenerated: string, fileNameGenerated: string, file_url: string, showToast: (message: string) => void) => {
  if  (Platform.OS === 'web') {
    downloadWeb(file_url, showToast);
  }
  else{
    save(fileUriGenerated, fileNameGenerated, showToast);
  }
    
};

export const handleShare = (fileUriGenerated: string, file_url: string) => {
  if (Platform.OS === 'web') {
    shareAsync(file_url);
  }else{
    shareAsync(fileUriGenerated);
  }
  
};

export const handleCancelShare = (setFileBoxVisible: (visible: boolean) => void) => {
  setFileBoxVisible(false);
};

export const downloadWeb = (file_url: string, showToast: (message: string) => void) => {

  const link = document.createElement('a');
  link.href = file_url;
  link.download = "slides.pptx";
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Download iniciado no navegador.!');

}