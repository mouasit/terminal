
import './App.css';
import ResourcesNav from './Components/ResourcesNav';
import Tabs from './Components/Tabs';

function App() {
  return(
    <main className='container mx-auto p-5 '>
      <section className='flex gap-8 '>
        <ResourcesNav />
          <Tabs />
      </section>
    </main>
  )
}

export default App;
