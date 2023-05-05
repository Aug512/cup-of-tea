// import React, { FormEvent, useCallback, useRef, useState } from 'react';
// import { useHistory } from 'react-router';
// import cn from 'classnames';
// import { useSelector } from 'react-redux';

// import { useStorage } from 'hooks/storage/useStorage';
// import { useDatabase } from 'hooks/database/useDatabase';
// import { useFileInput } from 'hooks/common/useFileInput';
// import { useActions } from 'hooks/common/useActions';

// import { themeSelector } from 'store/selectors/themesSelector';

// import { TextArea } from 'components/TextArea';
// import { Button } from 'components/Button';
// import { Tumbler } from 'components/Tumbler';

// import { cloneObject, getTrackName } from 'lib';

// import styles from './ThemeEdit.module.css';

// interface IThemeEditProps {
//     className?: string;
//     teamId: number;
// }

export const ThemeEdit = () => null;

// export const ThemeEdit: React.FC<IThemeEditProps> = ({ teamId, className }) => {
//     const { theme } = useSelector(themeSelector);
//     const { uploadTrack, deleteTrack } = useStorage();
//     const { updateThemeData } = useDatabase();
//     const { handleFileInputChange, file } = useFileInput();
//     const { themeRequestSuccess, themeRequestError } = useActions();
//     const history = useHistory();

//     const myTeamData = theme.teams[teamId];
//     const trackName = getTrackName(theme, teamId);

//     const [text, setText] = useState(myTeamData.text);
//     const [isReady, setIsReady] = useState(myTeamData.isReady);

//     const fileInputRef = useRef<HTMLInputElement | null>(null);

//     const handleTextChange = useCallback((text: string) => {
//         setText(text);
//     }, []);

//     const handleDeleteTrack = useCallback(async () => {
//         const updatedTheme = await deleteTrack(theme, teamId, trackName);
//         updatedTheme ? themeRequestSuccess(updatedTheme) : themeRequestError({code: 'uploadFailed', message: 'something went wrong'});
//         return;
//     }, [deleteTrack, teamId, theme, themeRequestError, themeRequestSuccess, trackName]);

//     const handleDownloadTrack = useCallback((trackUrl: string) => {
//         window.open(trackUrl, '_blank');
//     }, []);

//     const handleUploadTrack = useCallback(() => {
//         fileInputRef.current?.click();
//     }, []);

//     const handleSubmit = async (evt: FormEvent) => {
//         evt.preventDefault();

//         const updatedTeamData = {
//             ...myTeamData,
//             text,
//             isReady,
//             track: trackName,
//         }

//         const updatedThemeData = cloneObject(theme);
//         updatedThemeData.teams[teamId] = updatedTeamData;

//         const isUpdated = await updateThemeData(theme.id, updatedThemeData, teamId);

//         if (!isUpdated) {
//             return;
//         }

//         if (file) {
//             const updatedTheme = await uploadTrack(teamId, file);
//             updatedTheme ? themeRequestSuccess(updatedTheme) : themeRequestError({code: 'uploadFailed', message: 'something went wrong'});
//             return;
//         }

//         themeRequestSuccess(updatedThemeData);
//         // history.push('/themes');
//     }

//     return (
//         <div className={cn(styles.container, className)}>
//             <h2 className={styles.title}>Редактирование:</h2>
//             <form
//                 name='uploadForm'
//                 id='uploadForm'
//                 encType='multipart/form-data'
//                 onSubmit={handleSubmit}
//                 className={styles.form}
//             >
//                 <label className={styles.label}>
//                     <h3 className={styles.textAreaTitle}>Текст трека</h3>
//                     <TextArea
//                         id ='text'
//                         name='text'
//                         placeholder='Начинай писать, не забудь сохранить)'
//                         onChange={handleTextChange}
//                         value={text}
//                         className={styles.textArea}
//                     />
//                 </label>
//                 <div className={styles.floatingBlock}>
//                     <h3 className={styles.trackTitle}>Текущий трек</h3>
//                     {myTeamData.track && myTeamData.track !== trackName && (
//                         <div className={styles.trackSection}>
//                             <audio className={styles.trackPlayer} controls src={myTeamData.track}></audio>
//                             <div className={styles.trackButtons}>
//                                 <Button
//                                     className={styles.trackDownloadBtn}
//                                     view="primary"
//                                     onClick={() => handleDownloadTrack(myTeamData.track)}
//                                 >
//                                     Скачать
//                                 </Button>
//                                 <Button
//                                     className={styles.trackDeleteBtn}
//                                     view="secondary"
//                                     onClick={handleDeleteTrack}
//                                 >
//                                     Удалить
//                                 </Button>
//                             </div>
//                         </div>
//                     )}
//                     <Button
//                         className={styles.trackUploadBtn}
//                         view="secondary"
//                         onClick={handleUploadTrack}
//                     >
//                         {file ? 'Загружен' : 'Загрузить'}
//                     </Button>
//                     <label className={styles.readyState}>
//                         <Tumbler value={isReady} onToggle={() => setIsReady(!isReady)} />
//                         <div className={cn(styles.readyDescription, { [styles.checked]: isReady })}>
//                             {isReady ? 'Готов к сдаче' : 'Не готов к сдаче'}
//                         </div>
//                     </label>
//                     <input
//                         className={styles.nativeTrackUploadBtn}
//                         id ='audioLoader'
//                         name='audioLoader'
//                         accept='.mp3'
//                         type='file'
//                         onChange={handleFileInputChange}
//                         ref={fileInputRef}
//                     />
//                     <Button className={styles.submitBtn} type='submit'>Сохранить изменения</Button>
//                 </div>
//             </form>
//         </div>
//     )
// }
