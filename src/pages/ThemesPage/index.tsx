import React from 'react';
import { useSelector } from 'react-redux';

import { useDatabase } from 'hooks/database/useDatabase';
import { useMountEffect } from 'hooks/common/useMountEffect';

import { themesSelector } from 'store/selectors/themesSelector';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { useActions } from '../../hooks/useActions';
// import { IState } from '../../types/stateTypes';

export const ThemesPage = () => {
    const { getThemesList } = useDatabase();
    const { list } = useSelector(themesSelector);

    useMountEffect(() => {
        getThemesList();
    });

    return (
        <div>
            <h3>ThemesPage</h3>
            {list.length === 0 && <div>Loading</div>}
            {/* {isLoading && <div>Loading</div>} */}
            {/* {!isLoading && themesList.length && ( */}
                <div>
                    {list.map(theme => (
                        <Link to={`/theme/${theme.id}`}>
                            <div style={{ backgroundColor: '#e7e7e7', marginBottom: '5px' }} key={theme.id}>{theme.name}</div>
                        </Link>
                    ))}
                </div>
            {/* })} */}
        </div>
    );
}