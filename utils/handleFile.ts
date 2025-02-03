import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { Platform } from 'react-native';

export const download = async (file_url: string, file_uri: string, showToast: (message: string) => void) => {
  showToast('Baixando Slide!');
  const download = await FileSystem.downloadAsync(file_url, file_uri);
  console.log('Slide downloaded successfully: ', download.uri);
  showToast('Slides baixados com sucesso!');
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

export const handleSave = (fileUriGenerated: string, fileNameGenerated: string, showToast: (message: string) => void) => {
  save(fileUriGenerated, fileNameGenerated, showToast);
};

export const handleShare = (fileUriGenerated: string) => {
  shareAsync(fileUriGenerated);
};

export const handleCancelShare = (setFileBoxVisible: (visible: boolean) => void) => {
  setFileBoxVisible(false);
};
