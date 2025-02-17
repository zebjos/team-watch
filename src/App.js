import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Content from './components/Content';
import Fixtures from './components/Fixtures';

function App() {
  const teamIds = [];

  return (
    <div className="App">
      <Navbar/>
      <Fixtures teamIds={teamIds}/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;
