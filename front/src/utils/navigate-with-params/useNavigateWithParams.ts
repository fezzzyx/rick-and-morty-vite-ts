import { useLocation, useNavigate } from "react-router";

export const useNavigateWithParams = <T extends object>() => {
    const navigate = useNavigate()
    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)

    // Отримуємо поточні параметри з URL
    const currentParams = Object.fromEntries(searchParams.entries()) as Partial<Record<keyof T, string>>

    return (path: string, params: Partial<T>, isSafeCurrentParams: boolean = true) => {
        // Фільтруємо параметри: видаляємо порожні, null та undefined
        const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value !== "" && value !== undefined && value !== null)
        )

        // Якщо safe-режим увімкнено, зберігаємо старі параметри, окрім тих, що стали пустими
        const mergedParams = isSafeCurrentParams
            ? { ...currentParams, ...filteredParams }
            : filteredParams

        // Видаляємо збережені параметри, які були передані порожніми
        Object.keys(params).forEach((key) => {
            if (params[key as keyof T] === "" || params[key as keyof T] === undefined) {
                delete mergedParams[key]
            }
        })

        const formattedParams = new URLSearchParams(mergedParams as Record<string, string>)

        // Якщо після видалення параметрів `search` пустий, очищаємо URL
        navigate({ pathname: path, search: formattedParams.toString() || "" })
    };
};


// import { useLocation, navigate-with-params } from "react-router";
//
// export const useNavigateWithParams = <T extends object>() => {
//     const navigate = navigate-with-params();
//     const { search } = useLocation();
//     const searchParams = new URLSearchParams(search);
//
//     // Отримання поточних параметрів із URL
//     const currentParams = Object.fromEntries(searchParams.entries()) as Partial<Record<keyof T, string>>;
//
//     return (path: string, params: Partial<T>, isSafeCurrentParams: boolean = true) => {
//         const mergedParams = {
//             ...(isSafeCurrentParams ? currentParams : {}),
//             ...params
//         };
//
//         // Видаляємо ключі, у яких значення ""
//         Object.keys(mergedParams).forEach((key) => {
//             if (mergedParams[key as keyof T] === "") {
//                 delete mergedParams[key as keyof T]; // Видаляємо параметр
//             }
//         });
//
//         // Формуємо параметри для URL
//         const formattedParams = new URLSearchParams(
//             Object.fromEntries(
//                 Object.entries(mergedParams).filter(([_, value]) => value !== undefined) // Видаляємо `undefined`
//             )
//         );
//
//         navigate({ pathname: path, search: formattedParams.toString() });
//     };
// };