import { useLocation } from "react-router";

export const useQueryParams = <T extends object>(defaultParams?: T) => {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    // Створюємо об'єкт, що включає передані параметри за замовчуванням
    const params: Record<string, string | number> = { ...(defaultParams || {}) };

    // Додаємо всі параметри з URL
    searchParams.forEach((value, key) => {
        params[key] = isNaN(Number(value)) ? value : Number(value);
    });

    return params as T;
};