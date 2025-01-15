import { createContext, useState, useEffect, React } from "react";
export const Data = createContext();

function NotesAppContext({ children }) {
	const [state, setState] = useState([]);
	const [selectedNote, setSelectedNote] = useState({});

	const [showMainContent, setShowMainContent] = useState(false);

	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		// Cleanup event listener
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	console.log(width);
	
	return (
		<Data.Provider value={{ state, setState, setSelectedNote, selectedNote, showMainContent, setShowMainContent, setWidth, width }}>
			{children}
		</Data.Provider>
	)
}

export default NotesAppContext;