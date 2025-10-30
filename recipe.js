const details = document.querySelector(".details");
const input = document.querySelector(".input");
const searchbtn = document.querySelector(".search-btn");
const container = document.querySelector(".container");
const recipecontent = document.querySelector(".recipe-content");
const closebutton = document.querySelector(".close-button");

const recipe = async (value) => {
    try{
  container.innerHTML = "loading...";
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
  const data = await response.json();

  container.innerHTML = "";
  data.meals.forEach(meal => {
    const food = document.createElement('div');
    food.classList.add('recipe');
    food.innerHTML = `
      <img src=${meal.strMealThumb}>
      <h1>${meal.strMeal}</h1>
      <h2>${meal.strArea} dish</h2>
    `;

    const button = document.createElement('button');
    button.textContent = "View Recipe";
    button.classList.add('btn');
    food.appendChild(button);

    button.addEventListener('click', () => {
      openRecipe(meal);
    });

    container.appendChild(food);
  });
    
}
catch(error){
    container.innerHTML=`<p>"No results found. Please try another item."</p`

}
}
const ingredients = (meal) => {
  console.log(meal);

  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

const openRecipe = (meal) => {
  recipecontent.innerHTML = `
    <h3>Dish Name: ${meal.strMeal}</h3>
    <h4>Ingredients</h4>
    <ul>${ingredients(meal)}</ul>
    <h5>Instruction:</h5>
    <h6>${meal.strInstructions}</h6>
  `;
  recipecontent.parentElement.style.display = "block";
};

searchbtn.addEventListener('click', (e) => {
  
    e.preventDefault(); 
    const inputValue = input.value.trim();
    recipe(inputValue)
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); 
    const inputValue = input.value.trim();
    recipe(inputValue);
  }
})
closebutton.addEventListener('click', () => {
   details.style.display = "none"; 
  recipecontent.innerHTML = "";    
});
