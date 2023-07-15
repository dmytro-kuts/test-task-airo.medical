import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { RecipeList } from './components/RecipeList';
import { RecipePage } from './components/RecipePage';

const App: React.FC = () => {
  return (
    <main className="page">
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </main>
  );
};

export default App;