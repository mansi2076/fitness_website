import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');

  // Sample recipes data matching the Diet component
  const sampleRecipes = [
    {
      _id: '1',
      title: 'Green Power Smoothie',
      description: 'Nutrient-packed smoothie with spinach, banana, and protein powder for post-workout recovery',
      category: 'shakes',
      ingredients: [
        '1 cup fresh spinach',
        '1 ripe banana',
        '1 scoop vanilla protein powder',
        '1 cup almond milk',
        '1 tbsp almond butter',
        '1 tsp honey',
        'Ice cubes'
      ],
      instructions: [
        'Add all ingredients to a high-speed blender',
        'Blend on high for 60-90 seconds until smooth',
        'Add more almond milk if needed for desired consistency',
        'Pour into a glass and serve immediately'
      ],
      image: 'https://s.lightorangebean.com/media/20240914152712/Green-Power-Smoothie_done.png.webp',
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      calories: 280,
      protein: 25,
      carbs: 35,
      fat: 8,
      createdBy: { name: 'Sarah Wilson' },
      likes: 124,
    },
    {
      _id: '2',
      title: 'Mediterranean Quinoa Bowl',
      description: 'Fresh and colorful bowl with quinoa, chickpeas, vegetables, and tahini dressing',
      category: 'veg',
      ingredients: [
        '1 cup cooked quinoa',
        '1/2 cup chickpeas, drained',
        '1 cucumber, diced',
        '1 cup cherry tomatoes, halved',
        '1/4 red onion, thinly sliced',
        '2 tbsp tahini',
        '1 lemon, juiced',
        '2 tbsp olive oil',
        'Fresh parsley',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Cook quinoa according to package instructions and let cool',
        'Prepare all vegetables and arrange in a bowl',
        'Whisk together tahini, lemon juice, olive oil, salt, and pepper',
        'Combine quinoa with vegetables',
        'Drizzle with dressing and garnish with parsley'
      ],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      prepTime: 15,
      cookTime: 15,
      servings: 2,
      calories: 420,
      protein: 15,
      carbs: 58,
      fat: 16,
      createdBy: { name: 'Alex Rodriguez' },
      likes: 89,
    },
    {
      _id: '3',
      title: 'Grilled Salmon with Asparagus',
      description: 'Omega-3 rich salmon perfectly grilled with seasonal asparagus and lemon',
      category: 'non-veg',
      ingredients: [
        '4 oz salmon fillet',
        '1 bunch asparagus, trimmed',
        '2 tbsp olive oil',
        '1 lemon, sliced',
        '2 garlic cloves, minced',
        'Fresh dill',
        'Salt and black pepper',
        '1 tsp paprika'
      ],
      instructions: [
        'Preheat grill to medium-high heat',
        'Season salmon with salt, pepper, and paprika',
        'Toss asparagus with olive oil, garlic, salt, and pepper',
        'Grill salmon 4-5 minutes per side',
        'Grill asparagus 3-4 minutes, turning frequently',
        'Serve with lemon slices and fresh dill'
      ],
      image: 'https://food-guide.canada.ca/sites/default/files/2020-07/grilled_salmon.jpg',
      prepTime: 10,
      cookTime: 15,
      servings: 1,
      calories: 350,
      protein: 32,
      carbs: 8,
      fat: 22,
      createdBy: { name: 'Michael Chen' },
      likes: 156,
    },
    {
      _id: '4',
      title: 'Healing Turmeric Soup',
      description: 'Anti-inflammatory soup with turmeric, ginger, and coconut milk',
      category: 'soups',
      ingredients: [
        '2 cups vegetable broth',
        '1 can coconut milk',
        '1 tbsp fresh turmeric, grated',
        '1 inch fresh ginger, grated',
        '2 carrots, sliced',
        '1 sweet potato, cubed',
        '1 onion, diced',
        '2 garlic cloves, minced',
        'Salt and pepper to taste',
        'Fresh cilantro for garnish'
      ],
      instructions: [
        'Sauté onion and garlic in a large pot until fragrant',
        'Add turmeric and ginger, cook for 1 minute',
        'Add vegetables and broth, bring to a boil',
        'Simmer for 20 minutes until vegetables are tender',
        'Stir in coconut milk and season with salt and pepper',
        'Garnish with fresh cilantro before serving'
      ],
      image: 'https://static01.nyt.com/images/2020/12/13/dining/aw-chicken-and-rice-soup-with-turmeric-and-ginger/merlin_166828779_35a6b5cf-3582-410f-9ca8-aa4e82e4a376-threeByTwoLargeAt2X.jpg',
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      calories: 180,
      protein: 4,
      carbs: 22,
      fat: 10,
      createdBy: { name: 'Emma Davis' },
      likes: 203,
    },
    {
      _id: '5',
      title: 'Chocolate Protein Shake',
      description: 'Rich and creamy chocolate shake perfect for post-workout recovery',
      category: 'shakes',
      ingredients: [
        '1 scoop chocolate protein powder',
        '1 banana, frozen',
        '1 cup unsweetened almond milk',
        '1 tbsp natural peanut butter',
        '1 tsp cocoa powder',
        '1/2 cup ice',
        '1 tsp vanilla extract'
      ],
      instructions: [
        'Add all ingredients to a blender',
        'Blend on high speed for 1-2 minutes',
        'Check consistency and add more almond milk if needed',
        'Pour into a glass and enjoy immediately'
      ],
      image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/05/chocolate-protein-shake-recipe-02.jpg',
      prepTime: 3,
      cookTime: 0,
      servings: 1,
      calories: 320,
      protein: 28,
      carbs: 28,
      fat: 12,
      createdBy: { name: 'David Kim' },
      likes: 178,
    },
    {
      _id: '6',
      title: 'Grilled Chicken Power Bowl',
      description: 'High-protein bowl with grilled chicken, brown rice, and roasted vegetables',
      category: 'non-veg',
      ingredients: [
        '6 oz chicken breast',
        '1/2 cup brown rice, cooked',
        '1 cup broccoli florets',
        '1 bell pepper, sliced',
        '1/2 avocado, sliced',
        '2 tbsp olive oil',
        '1 tsp garlic powder',
        '1 tsp paprika',
        'Salt and pepper to taste',
        '2 tbsp balsamic vinegar'
      ],
      instructions: [
        'Season chicken with garlic powder, paprika, salt, and pepper',
        'Grill chicken for 6-7 minutes per side until cooked through',
        'Roast broccoli and bell pepper with olive oil at 400°F for 15 minutes',
        'Cook brown rice according to package instructions',
        'Slice chicken and assemble bowl with rice, vegetables, and avocado',
        'Drizzle with balsamic vinegar before serving'
      ],
      image: 'https://scontent.fdel29-1.fna.fbcdn.net/v/t39.30808-6/475772754_1138645941240279_5884050407854632991_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=105&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=VX7-_p8kKSwQ7kNvwF6pZmd&_nc_oc=AdmuQitzaOSA0kY7wVovFE_dWgUwdhIkK-fzgEk23Rj5V4Ie0dCZnFo7mDjcVrA2VKU&_nc_zt=23&_nc_ht=scontent.fdel29-1.fna&_nc_gid=Kt8x03tLAKU8HcojYfHKNw&oh=00_AfQtKGtO88XlDWdRYWbD1oeinVtblpW7iF9vEbdPUfXFPw&oe=6883F00D',
      prepTime: 15,
      cookTime: 25,
      servings: 1,
      calories: 520,
      protein: 45,
      carbs: 42,
      fat: 18,
      createdBy: { name: 'Lisa Johnson' },
      likes: 134,
    },
  ];

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      // Find the recipe with matching ID from our sample data
      const foundRecipe = sampleRecipes.find(r => r._id === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        setRecipe(null);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h2>
          <Link to="/diet" className="text-primary-600 hover:text-primary-700">
            ← Back to recipes
          </Link>
        </div>
      </div>
    );
  }

  // Generate health benefits based on recipe category and nutrition
  const getHealthBenefits = () => {
    const benefits = [];
    
    if (recipe.protein > 20) {
      benefits.push('High in protein for muscle recovery');
    }
    
    if (recipe.category === 'shakes') {
      benefits.push('Quick and easy to prepare for busy schedules');
      benefits.push('Great for post-workout recovery');
    }
    
    if (recipe.category === 'veg' || recipe.category === 'soups') {
      benefits.push('Rich in vitamins and minerals from vegetables');
      benefits.push('High in dietary fiber for digestion');
    }
    
    if (recipe.category === 'non-veg') {
      benefits.push('Excellent source of complete proteins');
    }
    
    if (recipe.fat < 15) {
      benefits.push('Low in unhealthy fats');
    }
    
    if (recipe.carbs > 30) {
      benefits.push('Good source of energy-boosting carbohydrates');
    }
    
    // Add some default benefits if none matched
    if (benefits.length === 0) {
      benefits.push('Balanced meal with complete nutrition');
      benefits.push('Customizable based on dietary preferences');
    }
    
    return benefits;
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/diet"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Recipes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recipe Image and Basic Info */}
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {recipe.category === 'non-veg' ? 'Non-Vegetarian' : 
                     recipe.category === 'veg' ? 'Vegetarian' : 
                     recipe.category === 'shakes' ? 'Smoothie & Shake' : 
                     recipe.category === 'soups' ? 'Soup' : recipe.category}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{recipe.likes} likes</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
                <p className="text-gray-600 mb-6 leading-relaxed">{recipe.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">
                      {recipe.prepTime + recipe.cookTime}
                    </div>
                    <div className="text-sm text-gray-600">Total Time</div>
                    <div className="text-xs text-gray-500">minutes</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary-600">{recipe.servings}</div>
                    <div className="text-sm text-gray-600">Servings</div>
                    <div className="text-xs text-gray-500">portions</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-accent-600">{recipe.calories}</div>
                    <div className="text-sm text-gray-600">Calories</div>
                    <div className="text-xs text-gray-500">per serving</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-red-50 text-red-700 px-3 py-2 rounded text-center">
                    <div className="font-semibold text-lg">{recipe.protein}g</div>
                    <div>Protein</div>
                  </div>
                  <div className="bg-yellow-50 text-yellow-700 px-3 py-2 rounded text-center">
                    <div className="font-semibold text-lg">{recipe.carbs}g</div>
                    <div>Carbs</div>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded text-center">
                    <div className="font-semibold text-lg">{recipe.fat}g</div>
                    <div>Fat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Details */}
          <div className="bg-white rounded-xl shadow-lg">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'ingredients'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('instructions')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'instructions'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Instructions
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'nutrition'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Nutrition
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'instructions' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h3>
                  <ol className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-4 mt-1 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 leading-relaxed">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Nutrition Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{recipe.calories}</div>
                      <div className="text-sm text-gray-600">Calories per serving</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-red-700">{recipe.protein}g</div>
                      <div className="text-sm text-red-600">Protein</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-700">{recipe.carbs}g</div>
                      <div className="text-sm text-yellow-600">Carbohydrates</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">{recipe.fat}g</div>
                      <div className="text-sm text-blue-600">Fat</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                    <h4 className="font-semibold text-primary-800 mb-2">Health Benefits</h4>
                    <ul className="text-sm text-primary-700 space-y-1">
                      {getHealthBenefits().map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recipe Creator Info */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-semibold">
                  {recipe.createdBy?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Created by {recipe.createdBy?.name}</h4>
                <p className="text-sm text-gray-600">Wellness enthusiast and recipe developer</p>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;