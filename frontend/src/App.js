import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import MainSection from './components/Main';
import ViewEmployeesScreen from './screens/ViewEmployeesScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import AdminPanel from './screens/AdminPanel';
import { Provider } from './context'

 function App() {

  return (
   <Provider>
     <Router> 
       <Header/>
        <MainSection>
            <Route path='/sign-in' component={SignInScreen}/>
            <Route path='/sign-up' component={SignUpScreen}/>
            <Route path='/admin-panel' component={AdminPanel}/>
            <Route path='/' component={ViewEmployeesScreen} exact/>
        </MainSection>
        <Footer/>
     </Router> 
   </Provider>
  );
}

export default App;
