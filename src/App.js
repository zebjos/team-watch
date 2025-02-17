import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Content from './components/Content';
import Fixtures from './components/Fixtures';

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Fixtures/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;
