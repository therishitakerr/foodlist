import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
class food {
  name: any;
  calories: any;
  image: any;
  quantity: number;
  constructor(n: any, c: any, i: any, q = 1) {
    this.calories = c;
    this.name = n;
    this.image = i;
    this.quantity = q;
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foodlist';
  searchfood: any;
  foodform = false;
  foodItems: food[] = new Array();
  favFoodItems: number[] = new Array();
  newQuantity: any;
  totalCalories = 0;

  showFoodForm() {
    if (this.foodform == false)
      this.foodform = true;
    else
      this.hideFoodForm();
  }

  hideFoodForm() { this.foodform = false; }

  addFood(i: NgForm) {
    let index = this.foodItems.findIndex(x => x.name === i.value.name);
    let obj = new food(i.value.name, i.value.calories, i.value.image);
    if (index < 0)
      this.foodItems.push(obj);
    else
      this.foodItems.fill(obj, index, index + 1);
    this.foodform = !this.foodform;
    console.log(this.foodItems);
    i.reset();
  }
  getIndex(i: any) {
    return this.foodItems.findIndex(x => x.name === i.name);
  }
  getfavfooditems() {
    return this.favFoodItems.map((item) => this.foodItems[item]);
  }
  getfooditems() {
    if (!this.searchfood && this.foodItems)
      return this.foodItems;
    else if (!this.searchfood)
      return null;
    else
      return this.foodItems.filter(x => x.name.includes(this.searchfood));
  }

  addQuantity(i: any) {
    let index = this.foodItems.findIndex(x => x.name === i.name);
    this.foodItems[index].quantity += Number(this.newQuantity);
    this.newQuantity = "";
    this.totalCalories = this.getfavfooditems().reduce((acc, curr) => acc + (curr.calories * curr.quantity), 0);
  }
  addFavorites(i: any) {
    let index = this.getIndex(i);
    console.log("index: " + index);
    if (!(this.favFoodItems.includes(index)))
      this.favFoodItems.push(index);
    console.log(this.favFoodItems);
    this.totalCalories = this.getfavfooditems().reduce((acc, curr) => acc + (curr.calories * curr.quantity), 0);
  }
}
