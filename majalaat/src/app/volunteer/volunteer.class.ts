export const VOLUNTEER_GENDER = Object.freeze({
    FEMALE: 0,
    MALE: 1,
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
    isShow: boolean;
    currentStatus: string;

    public constructor(init?: Partial<Volunteer>) {
        Object.assign(this, init);
    }

    public static fromRow(row): Volunteer {

        function _extractGender(row) {
            return (row.gender === "أنثى" ? VOLUNTEER_GENDER.FEMALE : VOLUNTEER_GENDER.MALE);
        }

        function _extractIsShown(row) {
            return (row.isshow === "نعم") && (row.approved == "نعم");
        }

        return new Volunteer({
            id: row.volunteerid,
            joined: new Date(row.timestamp),
            email: row.email,
            name: new VolunteerName(row.firstname, row.lastname),
            gender: _extractGender(row),
            town: row.town,
            bio: row.bio,
            phone: row.phone,
            profileLink: row.profilelink,
            institute: row.institute,
            field: row.field,
            photoURL: row.photourl,
            graduationYear: row.graduationyear,
            isShow: _extractIsShown(row)
        });
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