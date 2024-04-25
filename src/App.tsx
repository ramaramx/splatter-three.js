import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home'
import {Scene1} from './views/Scene1';
import Scene2 from './views/Scene2';
import Scene3 from './views/Scene3';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/scene1' element={<Scene1 />} />
      <Route path='/scene2' element={<Scene2 />} />
      <Route path='/scene3' element={<Scene3 />} />
    </Routes>
  </BrowserRouter>
)

export default App
