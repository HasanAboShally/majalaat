
import { Pipe, PipeTransform } from '@angular/core';
import { Volunteer, VOLUNTEER_GENDER } from './volunteer.class';

@Pipe({
    name: 'volunteerFilter',
    // pure: true
    pure: false
})
export class VolunteerFilterPipe implements PipeTransform {
    transform(volunteers: Volunteer[], filterObj): any {

        // console.log(JSON.stringify(filterObj));

        if (!volunteers || !filterObj) {
            return volunteers;
        }

        function filter(volunteer) {

            if (!volunteer) {
                return false;
            }

            return (filterObj.fields.length == 0 || filterObj.fields.includes(volunteer.field))
                && (filterObj.institutes.length == 0 || filterObj.institutes.includes(volunteer.institute))
                && (filterObj.towns.length == 0 || filterObj.towns.includes(volunteer.town))
                && (filterObj.gender.length == 0 || filterObj.gender.includes(volunteer.gender))
                && (filterObj.status.length == 0 || filterObj.status.includes(volunteer.status))
                && (filterObj.favoritesOnly == false || volunteer.isFavorite);
        }

        return volunteers.filter(filter);
    }
}