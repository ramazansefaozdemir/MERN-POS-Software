import React from 'react';
import Categories from './components/categories/Categories';
import Header from './components/header/Header'

function App() {
  return (
   <React.Fragment>
     <Header />
     <div className="home px-6 flex justify-between gap-10">
      <div className="categories flex-1 overflow-auto max-h-[calc(100vh-_-100px)] pb-72">
        <Categories />
      </div>
      <div className="products flex-[8]">
        <div>products</div>
      </div>
      <div className="card-totals">
        <div>card totals</div>
      </div>
     </div>
   </React.Fragment>
  );
}

export default App;
