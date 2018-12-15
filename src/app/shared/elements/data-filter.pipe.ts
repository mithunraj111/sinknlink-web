import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "dataFilter"
})

export class DataFilterPipe implements PipeTransform {

    // transform(array: any[], query: string): any {
    //     if (query) {
    //         return _.filter(array, row=>row.name.indexOf(query) > -1);
    //     }
    //     return array;
    transform(items: any[], searchText: any): any {
        if (!items) return [];
        if (!searchText) return items;
        return items.filter(item => {
            for (let key in item) {
                if (("" + item[key]).toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                    return ("" + item[key]).toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
                }
            }
        });
    }
}