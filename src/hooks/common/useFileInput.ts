import { ChangeEvent, useCallback, useState } from 'react';

export const useFileInput = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileInputChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        const file = event.target.files[0];
        setFile(file);
    }, []);
    
    return { handleFileInputChange, file };
}
