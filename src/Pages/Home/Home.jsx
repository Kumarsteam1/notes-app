import { React, useState, useEffect } from "react";
import SideContent from "../../Components/SideContent";
import MainContent from "../../Components/MainContent";
import './Home.css'

import { useContext } from "react";
import { Data } from "../../ContextApi/NotesAppContext";

function Home() {
	const { showMainContent, width } = useContext(Data);


	const clasNameDynamic = width < 450 ? "home-content-dynamic" : "home-content";

	return (
		<div className={clasNameDynamic}>
			{width < 450 ? (
				showMainContent ? (
					<MainContent />
				) : (
					<SideContent />
				)
			) : (
				<>
					<SideContent />
					<MainContent />
				</>
			)}
		</div>
	)
}

export default Home;