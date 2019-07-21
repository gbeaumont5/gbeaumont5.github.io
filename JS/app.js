$(() => {

    /// Food search button variable
    const handleFoodData = (data) => {
        
        

        // Loop runs through all the food items assoicated with the name
        const $targetDiv = $('#food');
        for (let i =0; i < data.hints.length; i++){
            
            
            
            //Gets image of the food, appends it to the food div
            
            if (data.hints[i].food.image) {
                //creates 
                const $foodContainer = $('<div>');
                $foodContainer.addClass('foodContainer');
                const $imageTable = $('<div>');
                $imageTable.addClass('imageTable')
                $foodContainer.append($imageTable);

                ///creates h2 and gives it the food name. Appends to food div
                const foodName = $('<h2>')
                foodName.addClass('foodName');
                foodName.text(data.hints[i].food.label);
              
                
                foodName.insertBefore($imageTable);

                const foodImage = $(`<img src="${data.hints[i].food.image}" alt="${foodName}">`);
                // console.log(data.hints[i].food.image)
                $imageTable.append(foodImage);

                // const $itemBtn = $('<button>');
                // $itemBtn.text('See Recipes');
                // $foodContainer.append($itemBtn);

                $targetDiv.append($foodContainer);

                ///////////////////////
                //Nutrient table:
                ////////////////////////

                const $table = $('<table>');
                $table.addClass('nutrientTable')
                $caption = $('<caption>');
                $caption.text('per 100 grams');
                $table.prepend($caption);
                
                //Row for table header
                const $titleRow = $('<td align="center" colspan="2">');
                $table.append($titleRow);
                //table header
                const $tableTitle = $('<th align="center">');
                $tableTitle.text('Nutrition Information');
                $tableTitle.addClass('tableTitle')
                $titleRow.append($tableTitle);
                
                //Nutrient Category Row Calories
                const $nutrientCategoryCalories = $('<tr>');
                $table.append($nutrientCategoryCalories);
                //Nutrient Category Row Fat
                const $nutrientCategoryFat = $('<tr>');
                $table.append($nutrientCategoryFat);
                //Nutrient Category Row Carbs
                const $nutrientCategoryCarbs = $('<tr>');
                $table.append($nutrientCategoryCarbs);
                //Nutrient Category Row Fiber
                const $nutrientCategoryFiber = $('<tr>');
                $table.append($nutrientCategoryFiber); 
                //Nutrient Category Row Protein
                const $nutrientCategoryProtein = $('<tr>');
                $table.append($nutrientCategoryProtein);    

                //Row category calories
                const $nutrientCalories = $('<td>');
                $nutrientCalories.text('Calories');
                $nutrientCategoryCalories.append($nutrientCalories);
                //Actual calorie count
                const $calorieCount = $('<td>');
                let $calorieRound = data.hints[i].food.nutrients.ENERC_KCAL
                if ($calorieRound){
                $calorieCount.text($calorieRound.toFixed(2));
                $nutrientCategoryCalories.append($calorieCount);
                } else {
                    $calorieCount.text('N/A');
                    $nutrientCategoryCalories.append($calorieCount);
                }

                // Row category fat
                const $nutrientFat = $('<td>');
                $nutrientFat.text('Fat');
                $nutrientCategoryFat.append($nutrientFat);
                //Actual fat count
                const $fatCount = $('<td>');
                let $fatRound = data.hints[i].food.nutrients.FAT
                if ($fatRound){
                    $fatCount.text($fatRound.toFixed(2));
                    $nutrientCategoryFat.append($fatCount);
                } else {
                    $fatCount.text('N/A')
                    $nutrientCategoryFat.append($fatCount);
                }
                
                //Row category carbs
                const $nutrientCarbs = $('<td>');
                $nutrientCarbs.text('Carbohydrates');
                $nutrientCategoryCarbs.append($nutrientCarbs);
                //Actual carb count
                const $carbsCount = $('<td>');
                let $carbsRound = data.hints[i].food.nutrients.CHOCDF
                if ($carbsRound){
                    $carbsCount.text($carbsRound.toFixed(2));
                    $nutrientCategoryCarbs.append($carbsCount);
                } else {
                    $carbsCount.text('N/A');
                    $nutrientCategoryCarbs.append($carbsCount);
                }


                //Row category fiber 
                const $nutrientFiber = $('<td>');
                $nutrientFiber.text('Fiber');
                $nutrientCategoryFiber.append($nutrientFiber);
                //Actual fiber count
                const $fiberCount = $('<td>');
                let $fiberRound = data.hints[i].food.nutrients.FIBTG
                if ($fiberRound){
                    $fiberCount.text($fiberRound.toFixed(2));
                    $nutrientCategoryFiber.append($fiberCount);
                }   else {
                    $fiberCount.text('N/A');
                    $nutrientCategoryFiber.append($fiberCount);
                }


                //Row category protein
                const $nutrientProtein= $('<td>');
                $nutrientProtein.text('Protein');
                $nutrientCategoryProtein.append($nutrientProtein);
                //Actual protein count
                const $proteinCount = $('<td>');
                let $proteinRound = (data.hints[i].food.nutrients.PROCNT);
                if ($proteinRound){
                    $proteinCount.text($proteinRound.toFixed(2));
                    $nutrientCategoryProtein.append($proteinCount);
                } else {
                    $proteinCount.text('N/A');
                    $nutrientCategoryProtein.append($proteinCount);
                }

                //append table
                $imageTable.append($table);
                
            } else { console.log('no image') }

        }
        
    };

  

    $('#foodButton').on('click', () =>{

        $('.foodContainer').empty();
        $('.recipeContainer').empty();
        //pulls the value from the search bar
        let searchBar = $('#searchBar').val();
        console.log(searchBar);

        //adds URI encoding to text in search bar 
        let uri = encodeURI(searchBar);
        console.log(uri);

        //gets api data and searchs using the value from the search input variable searchBar endcoded in URI with the variable uri
        const endpoint = `https://api.edamam.com/api/food-database/parser?ingr=${uri}&app_id=d3fffd5d&app_key=00e87c777fc94342a9cf888e21dfbcf3`

        console.log(endpoint);

        $.ajax({ url: endpoint}).then(handleFoodData)

        $('#food').css('height', '100vh');

})

//// function runs when recipe button is clicked
    const handleRecipeData = (data) => {

        

    
        // for loop runs through each recipe for a search
        for (let i = 0; i < 6; i++){

             //creates a div for the recipe
            const recipeContainer = $('<div>');
            recipeContainer.addClass('recipeContainer');
            $('#food').append(recipeContainer);

            ///container for image and ingredient list
            const recipeAndImage = $('<div>');
            recipeAndImage.addClass('recipeAndImageContainer');
            recipeContainer.append(recipeAndImage);
            
            const recipeName = $('<h2>');
            recipeName.text(data.hits[i].recipe.label);
            recipeName.insertBefore(recipeAndImage);
            

            console.log(recipeName);

            const recipeImage = $(`<img src="${data.hits[i].recipe.image}" alt="${recipeName}">`);
            recipeImage.addClass('recipeImage');
            $(recipeAndImage).append(recipeImage);

            //ul for ingredient list 
            const $ingredientList = $('<ul>');
            $ingredientList.addClass('ingredientList');
            $(recipeAndImage).append($ingredientList);

            // Loop to go through ingredient array from api
            if (data.hits[i].recipe.ingredients) {
                
                for (let j = 0; j < data.hits[i].recipe.ingredients.length; j++){

                    const ingredientLi = $('<li>')
                    ingredientLi.addClass('ingredientLi')
                    ingredientLi.text(data.hits[i].recipe.ingredients[j].text)
                    $ingredientList.append(ingredientLi);
            } }
            
            



    }
    
    console.log(data);

   

    
    }


    //// code to run when recipe button is clicked on
    $('#recipeButton').on('click', () => {

        $('.foodContainer').empty();
        $('.recipeContainer').empty();
        let searchBar = $('#searchBar').val();
        let uri = encodeURI(searchBar);

        const endpoint =`https://api.edamam.com/search?q=${uri}&app_id=9b8f8d0a&app_key=c71c8ce8420aa2708914b431afb12acc`;

        console.log(endpoint);

        $.ajax({ url: endpoint}).then(handleRecipeData);

        $('#food').css('height', '100vh');
    })

    /////modal about button
    const $aboutBtn = $('#about');
    const $modal = $('#modal');
    const $closeBtn = $('#close');

    /// open modal box
    const openModal = () => {
        $modal.css('display', 'block');
    }
    $aboutBtn.on('click', openModal);

    //close modal box
    const closeModal = () => {
        $modal.css("display", 'none');
    }
    $closeBtn.on('click', closeModal);




})

