import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {
  permutationValue: string;
  permutationsArray;
  permutationsDone: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  findPermutations(permutationValue){
    //not accept empty string
    if(permutationValue === undefined){
      this.permutationsDone = false;
      return
    }else{
      //removed all spaces from string
      permutationValue = permutationValue.replace(/\s/g, '');
    }
    //handel if string is one char
    if (permutationValue.length < 2 ){
      this.permutationsDone = true;
      return permutationValue
    }
    // This array will hold our permutations
    let permutationsArray = [] 
    for (let i = 0; i < permutationValue.length; i++){
      let char = permutationValue[i]
      // if char was used already, skip this time to remove duplicates
      if (permutationValue.indexOf(char) != i)
      continue
      let remainingChars = permutationValue.slice(0, i) + permutationValue.slice(i + 1, permutationValue.length)
      for (let permutation of this.findPermutations(remainingChars)){
        permutationsArray.push(char + permutation) 
      }
    }
    this.permutationsDone = true;
    this.permutationsArray = permutationsArray
    return permutationsArray;
  } 
}
