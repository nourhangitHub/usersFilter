import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ChaneFormate' })
export class ChaneFormatePipe implements PipeTransform {
    months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    newDate: Date;
    houre
    day;
    month;
    year;

    transform(value: string): any {
        this.newDate = new Date(value);
        this.houre = this.newDate.getHours();
        if(this.houre === 0){
            this.houre = '12:00 AM'
        }else if(this.houre < 12){
            this.houre =`${this.houre}:00 AM`;
        }else if(this.houre === 12){
            this.houre =`${this.houre}:00 PM`;
        }else{
            this.houre =`${this.houre - 12}:00 PM`;
        }
        this.day = this.newDate.getDate();
        this.month = this.months[this.newDate.getMonth()];
        this.year = this.newDate.getFullYear();
        return `${this.day}-${this.month}-${this.year} ${this.houre}`;
    }
}