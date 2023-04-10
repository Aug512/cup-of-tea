interface setCookieProps {
    name: string;
    value: string;
    options?: Record<string, any>;
}

type ISetCookeiesFunc = (params: setCookieProps) => void;

type IGetCookeiesFunc = (...names: string[]) => string[];

export const useCookies = () => {
    const setCookie: ISetCookeiesFunc = ({ name, value, options = {} }) =>  {
        options = {
            ...options
        };
      
        if (!(options.expires instanceof Date)) {
            options.expires = undefined;
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
      
        document.cookie = updatedCookie;
    }

    const deleteCookies = () =>  {
        const cookies = document.cookie.split(';');
        cookies.forEach(item => {
            const eqPos = item.indexOf("=");
            const name = eqPos > -1 ? item.substr(0, eqPos) : item;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        })
    }

    const getCookies: IGetCookeiesFunc = (...names) =>
        names.map(name => {
            const valuesArr = document.cookie.split('; ');
            return valuesArr.reduce((res, str) => {
                const [ key, value ] = str.split('=');

                if (key === name) {
                    res = value;
                }

                return res;
            }, '');
        }, {});

    return {
        setCookie,
        getCookies,
        deleteCookies,
    }
}
