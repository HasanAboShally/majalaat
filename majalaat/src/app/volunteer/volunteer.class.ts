export const VOLUNTEER_GENDER = Object.freeze({
    FEMALE: 0,
    MALE: 1,
});

export const VOLUNTEER_STATUS = Object.freeze({
    STUDENT: 0,
    RECENT_GRADUATE: 1,
    GRADUATE: 2,
});



export class VolunteerName {

    first: string;
    last: string;

    public constructor(firstname, lastname) {
        this.first = firstname;
        this.last = lastname;
    }
}

export class Volunteer {
    id: string;
    joined: Date;
    email: string;
    name: VolunteerName;
    gender: number;
    town: string;
    bio: string;
    phone: number;
    profileLink: string;
    institute: string;
    field: string;
    photoURL: string;
    graduationYear: number;
    status: number;
    isShow: boolean;
    // currentStatus: string;

    public constructor(init?: Partial<Volunteer>) {
        Object.assign(this, init);
    }


}

// timestamp: Date,
// email: string,
// firstname: string,
// lastname: string,
// gender:number,
// town: string,
// bio: string,
// phone:number,
// profilelink:string,
// institute:string,
// field:string,
// photourl:string,
// graduationyear:number,
// isshow:boolean,