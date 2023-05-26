import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Article from './components/pages/Article';
import CreateArticle from './components/pages/CreateArticle';
import EditArticle from './components/pages/EditArticle';
import Profile from './components/pages/Profile';
import Settings from './components/pages/Settings';
import Signup from './components/pages/Signup';
import Signin from './components/pages/Signin';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article:URLSlug" element={<Article />} />
          <Route path="/editor" element={<CreateArticle />} />
          <Route path="/editor:URLSlug" element={<EditArticle />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
