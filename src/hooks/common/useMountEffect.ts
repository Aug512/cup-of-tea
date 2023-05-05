import { EffectCallback, useEffect, useRef } from 'react';

export const useMountEffect = (effect: EffectCallback) => {
    const emitted = useRef(false);

    useEffect(() => {
        if (!emitted.current) {
            emitted.current = true
            effect();
        }
    }, []);
}
