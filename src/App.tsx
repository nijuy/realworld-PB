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

{
  /* Home page (URL: /#/ )

Sign in/Sign up pages (URL: /#/login, /#/register )

Settings page (URL: /#/settings )

Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )

Article page (URL: /#/article/article-slug-here )

Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
 */
}
