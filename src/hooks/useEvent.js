import { useEffect } from 'react';

export default (event, handler) => {
	useEffect(() => {
		//initiate the event handler
		window.addEventListener(event, handler);

		//This Clean up the event every time the component is re-rendered
		return () => {
			window.removeEventListener(event, handler);
		};
	});
};
