import { useEffect, useMemo, useRef } from 'react';
import { useNavigateWithParams } from '@/utils/navigate-with-params/useNavigateWithParams.ts';
import { useQueryParams } from '@/utils/query-params/useQueryParams.ts';

type StripFns<T> = {
    [K in keyof T as T[K] extends (...args: never[]) => unknown ? never : K]: T[K];
};

// Фабрика
export const createUseStoreWithParams =
    <
        TStore,
        // За замовчуванням query-форма — це "стан без методів"
        TQuery extends object = StripFns<TStore>
    >(
        // useStore мусить мати метод setAll, що приймає Partial<TQuery>
        useStore: () => TStore & { setAll: (partial: Partial<TQuery>) => void }
    ) =>
        (isExtential: boolean = false) => {
            const store = useStore();

            // plain-версія стора для порівняння/навігації
            const plainState = useMemo(
                () => JSON.parse(JSON.stringify(store)) as TQuery,
                [store]
            );
            const stateJson = useMemo(() => JSON.stringify(plainState), [plainState]);

            const navTo = useNavigateWithParams<TQuery & { modal?: string }>();
            const params = useQueryParams<TQuery & { modal?: string }>();

            const isFirstUpdate = useRef(true);
            const prevState = useRef<TQuery>(plainState);
            const prevParams = useRef<Partial<TQuery & { modal?: string }>>(params);

            useEffect(() => {
                if (isFirstUpdate.current) {
                    // 1) ініціалізація: params → store
                    store.setAll(params);
                    isFirstUpdate.current = false;
                    prevState.current = plainState;
                    prevParams.current = params;
                    return;
                }

                const stateChanged = JSON.stringify(prevState.current) !== stateJson;
                const paramsChanged =
                    JSON.stringify(prevParams.current) !== JSON.stringify(params);

                if (stateChanged || paramsChanged) {
                    // 2) оновлюємо URL із актуальним станом
                    navTo('', plainState);
                    prevState.current = plainState;
                    prevParams.current = params;
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [stateJson, JSON.stringify(params)]);

            return {
                ...store,
                ...(isExtential ? { navTo, searchParams: params } : {}),
            } as TStore &
                (typeof isExtential extends true
                    ? { navTo: typeof navTo; searchParams: typeof params }
                    : object);
        };