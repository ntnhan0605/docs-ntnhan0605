import './App.scss';

import Header from './components/header';

import 'newLeadGenerationStoreRST/middlewares';
import withProfileManagementPersist from 'newLeadGenerationStoreRST/withProfileManagementPersist';
import mountComponent from './utils/mount';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <Header />
    </div>
  );
};

const PersistedApp = withProfileManagementPersist(App);

const mount = (el: any, props: any) => mountComponent(el, PersistedApp, props);

export { mount };

/**
 * use as separated app
 */
// const rootElement = document.getElementById('root');
// if (!rootElement) throw new Error('Failed to find the root element');

// const root = ReactDOM.createRoot(rootElement);

// root.render(<PersistedApp />);
