
import { Pipe, PipeTransform } from '@angular/core';
import { Volunteer, VOLUNTEER_GENDER } from './volunteer.class';

@Pipe({
    name: 'volunteerFilter',
    pure: false
})
export class VolunteerFilterPipe implements PipeTransform {
    transform(volunteers: Volunteer[], filterObj): any {

        if (!volunteers || !filterObj) {
            return volunteers;
        }

        function _genderString(id) {
            return (id === VOLUNTEER_GENDER.FEMALE ? "female" : "male");

        }

        function filter(volunteer) {

            return (filterObj.fields.length == 0 || filterObj.fields.includes(volunteer.field))
                && (filterObj.institutes.length == 0 || filterObj.institutes.includes(volunteer.institute))
                && (filterObj.towns.length == 0 || filterObj.towns.includes(volunteer.town))
                && (filterObj.gender.length == 0 || filterObj.gender.includes(_genderString(volunteer.gender)));
        }

        return volunteers.filter(filter);
    }
}