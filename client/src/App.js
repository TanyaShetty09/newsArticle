import {BrowserRouter,Routes,Route} from 'react-router-dom'
import EditArticle from './components/EditArticle';
import NewArticle from './components/NewArticle';
import ArticleDetails from './components/ArticleDetails';
import ArticleStore from './components/ArticleStore';
function App(){
  return(
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route element={<ArticleStore/>} path="/articles" />
          <Route element={<NewArticle/>} path="/articles/new" />
          <Route element={<ArticleDetails/>} path="/articles/:id" />
          <Route element={<EditArticle/>} path="/articles/edit/:id" />
        </Routes>
      </BrowserRouter>
      {/* hii therey */}

    </div>
  )
}

export default App;