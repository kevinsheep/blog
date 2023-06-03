type SidebarObject = Record<
    string,
    {
        text: string;
        items: {
            title: string;
            text: string;
            link: string;
        }[];
    }[]
>;

type BannerType = {
    banner?: string;
    link?: string;
    nav?: string;
};

type Formatters = {
    data: {
        title: string;
    } & BannerType;
};
