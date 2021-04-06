export class UsefulLink {
    title: string;
    description: string;
    category: string;
    contributer: string;
    url: string;

    public constructor(init?: Partial<UsefulLink>) {
        Object.assign(this, init);
    }
}

export class UsefulLinksGroup {
    title: string;
    links: UsefulLink[];

    public constructor(init?: Partial<UsefulLink>) {
        Object.assign(this, init);
        this.links = [];
    }

    public addLink(link: UsefulLink) {
        this.links.push(link);
    }
}