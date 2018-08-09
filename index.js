// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let neighborhoodId = 0
class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(del => del.neighborhoodId == this.id)
  }
  customers(){
    return store.customers.filter(cus => cus.neighborhoodId == this.id)
  }
  meals(){
    let mealsArray = []
    // debugger;
    this.deliveries().forEach(function(del){
      // debugger;
      if (!mealsArray.includes(del.meal())){
       mealsArray.push(del.meal())
     }

    }
  )

  return mealsArray
}
}


let customerId = 0
class Customer {
  constructor(name, nId){
    this.name = name
    this.neighborhoodId = nId
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(del => del.customerId == this.id)
  }


  meals(){
    let mealsArray = []
    // debugger;
    this.deliveries().forEach(function(del){
      // if (!mealsArray.includes(del.meal())){
       mealsArray.push(del.meal())
    }
  )

  return mealsArray
}

  reducer(agg, cv){return agg += cv}

  totalSpent(){

    let mealPrices = this.meals().map(meal => meal.price)
    console.log(mealPrices)
  
    return mealPrices.reduce(this.reducer, 0)
  }
}

let mealId = 0
class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(del => del.mealId == this.id)
  }

  customers(){
    let customersArray = []
    // debugger;
    this.deliveries().forEach(function(del){
      // debugger;
      if (!customersArray.includes(del.customer())){
       customersArray.push(del.customer())
     }

    }
  )

  return customersArray
}

static byPrice(){
    return store.meals.sort(function (a,b) {return b.price - a.price})
  }
}


let deliveryId = 0
class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(m => m.id == this.mealId)
  }
  customer(){
    return store.customers.find(c => c.id == this.customerId)
  }
  neighborhood(){
    return store.neighborhoods.find(n => n.id == this.neighborhoodId)
  }
}
