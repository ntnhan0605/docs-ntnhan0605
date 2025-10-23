import useProfileManagement from '../../stores/ProfileManagement';

import logo from '../../logo.svg';

const Header = () => {
  const [profileMgtState, profileMgtActions] = useProfileManagement();
  const { activeUser } = profileMgtState;
  const { username, fullname, phone } = activeUser ?? {};
  const { setProfileInfo, reset } = profileMgtActions;

  const onSetProfile = () => {
    setProfileInfo({
      ...profileMgtState,
      activeUser: {
        username: 'nguyenntd',
        fullname: 'nguyen thanh duy nguyen',
        phone: '0909.241.812',
      },
    });
  };

  const onReset = () => {
    reset();
  };

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <p>User Profile: {username}</p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
      <button onClick={onSetProfile}>Set Profile</button>
      <button onClick={onReset}>Clear</button>
    </header>
  );
};

export default Header;
