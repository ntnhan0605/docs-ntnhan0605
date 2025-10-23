import useProfileManagement from 'newLeadGenerationStoreRST/profileManagementStore';
import mountComponent from '../../utils/mount';

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
    <header className="bg-green-700 text-white font-bold text-3xl p-5 flex">
      <div className="flex-grow mr-4">User Profile: {username}</div>
      <button className="bg-indigo-800 text-white font-bold py-2 px-4 rounded mr-5" onClick={onSetProfile}>
        Set Profile
      </button>
      <button className="bg-indigo-800 text-white font-bold py-2 px-4 rounded" onClick={onReset}>
        Clear
      </button>
    </header>
  );
};

const mount = (el: any, props: any) => mountComponent(el, Header, props);

export { mount };

export default Header;
