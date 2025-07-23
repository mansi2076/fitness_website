import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Diet = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '',
    category: 'veg',
    ingredients: [''],
    instructions: [''],
    image: '',
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const categories = [
    { value: 'all', label: 'All Recipes', icon: '🍽️' },
    { value: 'veg', label: 'Vegetarian', icon: '🥗' },
    { value: 'non-veg', label: 'Non-Vegetarian', icon: '🍖' },
    { value: 'shakes', label: 'Smoothies & Shakes', icon: '🥤' },
    { value: 'soups', label: 'Soups', icon: '🍲' },
  ];

  // Sample recipes data
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
    // In a real app, this would fetch from the API
    setRecipes(sampleRecipes);
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (index, field, value) => {
    setNewRecipe(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setNewRecipe(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setNewRecipe(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, this would submit to the API
      console.log('Submitting recipe:', newRecipe);
      setShowAddRecipe(false);
      // Reset form
      setNewRecipe({
        title: '',
        description: '',
        category: 'veg',
        ingredients: [''],
        instructions: [''],
        image: '',
        prepTime: 0,
        cookTime: 0,
        servings: 1,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      });
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nutrition Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover healthy recipes and meal ideas to fuel your wellness journey
          </p>
        </div>

        {/* Search and Add Recipe */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={() => setShowAddRecipe(true)}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            Add Recipe
          </button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.value
                    ? 'bg-primary-500 text-white transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {categories.find(c => c.value === recipe.category)?.icon} {recipe.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
                    {recipe.calories} cal
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {recipe.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                    <span>👥 {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>❤️ {recipe.likes}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <div className="bg-red-50 text-red-700 px-2 py-1 rounded text-center">
                    <div className="font-semibold">{recipe.protein}g</div>
                    <div>Protein</div>
                  </div>
                  <div className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-center">
                    <div className="font-semibold">{recipe.carbs}g</div>
                    <div>Carbs</div>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-center">
                    <div className="font-semibold">{recipe.fat}g</div>
                    <div>Fat</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>By {recipe.createdBy?.name}</p>
                  </div>
                  <Link
                    to={`/recipe/${recipe._id}`}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Recipe Modal */}
        {showAddRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Recipe</h2>
                  <button
                    onClick={() => setShowAddRecipe(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipe Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newRecipe.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={newRecipe.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                      <option value="shakes">Smoothies & Shakes</option>
                      <option value="soups">Soups</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newRecipe.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={newRecipe.image}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prep Time (min)
                    </label>
                    <input
                      type="number"
                      name="prepTime"
                      value={newRecipe.prepTime}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cook Time (min)
                    </label>
                    <input
                      type="number"
                      name="cookTime"
                      value={newRecipe.cookTime}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Servings
                    </label>
                    <input
                      type="number"
                      name="servings"
                      value={newRecipe.servings}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calories
                    </label>
                    <input
                      type="number"
                      name="calories"
                      value={newRecipe.calories}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ingredients
                  </label>
                  {newRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleArrayInputChange(index, 'ingredients', e.target.value)}
                        placeholder="Enter ingredient"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'ingredients')}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('ingredients')}
                    className="text-primary-500 hover:text-primary-700 text-sm"
                  >
                    + Add Ingredient
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructions
                  </label>
                  {newRecipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start space-x-2 mb-2">
                      <span className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mt-2">
                        {index + 1}
                      </span>
                      <textarea
                        value={instruction}
                        onChange={(e) => handleArrayInputChange(index, 'instructions', e.target.value)}
                        placeholder="Enter instruction step"
                        rows={2}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'instructions')}
                        className="text-red-500 hover:text-red-700 mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('instructions')}
                    className="text-primary-500 hover:text-primary-700 text-sm"
                  >
                    + Add Instruction
                  </button>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddRecipe(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                  >
                    Add Recipe
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diet;