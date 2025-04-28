const create = (func) => {
	const set = (_store) => {
		store = { ...store, ..._store };
		emit(store);
	};
	const get = () => {};
	let store = func(set, get);

	let eventId = 1;
	const events = {};
	const addEvent = (callback) => {
		eventId++;
		events[eventId] = callback;
		return eventId;
	};
	const removeEvent = (id) => {
		delete events[id];
	};
	const emit = (store) => {
		Object.values(events).map((callback) => callback(store));
	};

	const useStore = () => {
		const [store, setStore] = useState();
		useEffect(() => {
			const id = addEvent((store) => setStore(store));
			return () => removeEvent(id);
		}, []);
		return store;
	};

	useStore.getState = () => store;

	return useStore;
};
