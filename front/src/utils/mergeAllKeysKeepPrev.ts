// helper: чи вважати значення "заданим"
const isProvided = (v: unknown) =>
    v !== undefined && v !== null && !(typeof v === 'string' && v === '');

// універсальне злиття по всіх ключах стора, ігнорує функції
export const mergeAllKeysKeepPrev = <T extends Record<string, unknown>>(
    prev: T,
    patch?: Partial<T>
): T => {
    if (!patch) return prev;
    const next: T = { ...prev };
    (Object.keys(prev) as Array<keyof T>).forEach((k) => {
        // пропускаємо методи
        if (typeof prev[k] === 'function') return;

        // оновлюємо тільки якщо ключ є в patch і значення "задане"
        if (Object.prototype.hasOwnProperty.call(patch, k)) {
            const v = patch[k];
            if (isProvided(v)) {
                (next as Record<string, unknown>)[k as string] = v as unknown;
            }
        }
    });
    return next;
}