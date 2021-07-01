import logo from './logo.svg';
import './App.css';
import AppMarket from './marketComps/appMarket';
import PhpComp from './test/phpComp';
import { useEffect } from 'react';
import LazyLoading from './test/lazyLoading';
import LoadMoreLazy from './test/loadMoreLazy';
import OwnHookComp from './test/ownHookComp';


function App() {

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = "http://localhost/ort/l55_12_5/test_query.php?cat=food";
    let resp = await fetch(url);
    let data = await resp.json();
    console.log(data);
  }

  return (
    <div className="App">
      {/* <OwnHookComp /> */}
      {/* <LazyLoading /> */}
      <AppMarket />
      {/* <PhpComp /> */}
      {/* <LoadMoreLazy /> */}
     
    </div>
  );
}
// 10:50
export default App;
