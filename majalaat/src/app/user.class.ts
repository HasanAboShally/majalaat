const INITIAL_CONTACT_CREDIT = 5;

export class User {

    remainingCredit: number;
    favoriteVolunteers: object;

    public constructor() {
        this.remainingCredit = INITIAL_CONTACT_CREDIT;
        this.favoriteVolunteers = {};
    }
}