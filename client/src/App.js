import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userAPI';


const App = observer(() => {
  const { user } = React.useContext(Context)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
    }, 1000)

    
  }, [user])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter >
       <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
