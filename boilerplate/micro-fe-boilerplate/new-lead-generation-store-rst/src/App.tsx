import Header from './components/header';
import withProfileManagementPersist from './stores/ProfileManagement/withProfileManagement';

import './stores/middlewares/';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
    </div>
  );
};

export default withProfileManagementPersist(App);
