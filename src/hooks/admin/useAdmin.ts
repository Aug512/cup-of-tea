import { useSelector } from 'react-redux';

import { themesSelector } from 'store/selectors/themesSelector';

export const useAdmin = () => {
    const { list } = useSelector(themesSelector);
    
    return {
        themesList: list,
    }
}
