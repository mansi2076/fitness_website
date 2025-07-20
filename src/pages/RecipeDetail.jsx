import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');

  // Sample recipe data (in real app, this would come from API)
  const sampleRecipe = {
    _id: id,
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
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    calories: 280,
    protein: 25,
    carbs: 35,
    fat: 8,
    createdBy: { name: 'Sarah Wilson' },
    likes: 124,
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      // In a real app, this would fetch from API
      // const response = await axios.get(`/api/recipes/${id}`);
      // setRecipe(response.data);
      setRecipe(sampleRecipe);
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
                    {recipe.category}
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
                      <li>• High in protein for muscle recovery</li>
                      <li>• Rich in vitamins and minerals from leafy greens</li>
                      <li>• Natural sugars from banana for energy</li>
                      <li>• Healthy fats from almond butter</li>
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
            <button className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;