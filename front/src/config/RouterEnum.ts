
export const RouterEnum = {
    MAIN: '/',
    CHARACTERS: "/characters",
    CHARACTER: "/characters/:id",
    LOCATIONS: "/locations",
    LOCATION: "/locations/:id",
    EPISODES: "/episodes",
    EPISODE: "/episodes/:id"
}

export type RouterEnum = typeof RouterEnum[keyof typeof RouterEnum];
