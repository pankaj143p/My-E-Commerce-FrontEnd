// feting products using json data 
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    
    const response = await fetch('http://localhost:8080/products') 
    const data = await response.json()
    resolve({data})
  }
  );
}

//fetching same type products by id from the server using filter 
export function fetchProductsByFilters(filter,sort) {
  // filter = {"category":"smartphone"}
 
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  
  // itrate itams which is sort  array and add '&' to make string valid
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
    // queryString += `${key}=${filter[key]}&`
  }

  return new Promise(async (resolve) =>{
 
    const response = await fetch('http://localhost:8080/products?'+queryString) 
    const data = await response.json()
    resolve({data})
  }
  );
}