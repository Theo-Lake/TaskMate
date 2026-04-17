let _signOut: () => void = () => {};

export const registerSignOut = (fn: () => void) => {
	_signOut = fn;
};

export const signOut = () => _signOut();
