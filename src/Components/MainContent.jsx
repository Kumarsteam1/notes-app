import React, { useState, useEffect } from "react";
import threeDImage from "../assets/3D.png"
import { IoSend } from "react-icons/io5";
import { useContext } from "react";
import { Data } from "../ContextApi/NotesAppContext";
import { IoIosLock } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

function MainContent() {
	const { selectedNote, setSelectedNote, setState, state, showMainContent, setShowMainContent, width } = useContext(Data);

	const [tetAreaInput, setTextAreaInput] = useState("");

	let shortcutName = "";
	if (selectedNote?.group_name) {
		let nameSplit = selectedNote?.group_name.split(" ");

		if (nameSplit && nameSplit.length === 1) {
			shortcutName = nameSplit[0][0].toUpperCase()
		} else {
			shortcutName = nameSplit[0][0].toUpperCase() + nameSplit[1][0].toUpperCase()
		}
	}


	const handleSaveRecords = (e) => {
		e.preventDefault();

		if (tetAreaInput.trim() === "") {
			return
		}

		// Update the date state with the current time
		const currentDate = new Date();

		const options = {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		};

		const optionsTime = {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		};

		// Format the date and time
		const formattedDate = currentDate.toLocaleString('en-US', options);
		const formattedTime = currentDate.toLocaleString('en-US', optionsTime);

		// Create a new record
		const newRecord = {
			id: selectedNote.records ? selectedNote.records.length + 1 : 1,
			message: tetAreaInput,
			date: formattedDate,
			time: formattedTime,
		};

		let filteringSingleRecord = state.find((val) => {
			return val.id === selectedNote.id
		});
		// Update the selected note with the new record
		const updatedSelectedNote = {
			...filteringSingleRecord,
			records: filteringSingleRecord.records ? [...filteringSingleRecord.records, newRecord] : [newRecord],
		};

		console.log(updatedSelectedNote)


		const updatedState = state.map((note) =>
			note.id === selectedNote.id ? updatedSelectedNote : note
		);

		setState(updatedState);

		setTextAreaInput("");
	};

	console.log("STATE: ", state)
	console.log("Seleted Notes:", selectedNote);

	let singleRecord = state.find((record) => {
		return record.id === selectedNote.id
	});

	console.log("singleRecord: ", singleRecord)


	return (
		<div className="main-overall">
			{
				Object.keys(selectedNote).length === 0 &&
				<div className="main-content">
					<img src={threeDImage} alt="3D Illustration" />
					<div className="content">
						<h1>Pocket Notes</h1>
						<p>Send and receive messages without keeping your phone online. <br></br>
							Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
					</div>

					<div className="end-end-encrypted">
						<IoIosLock /><span>end-to-end encrypted</span>
					</div>
				</div>
			}

			{
				Object.keys(selectedNote).length > 0 &&
				<div>
					<div className="header">
						{
							width < 450 && showMainContent && <FaArrowLeft onClick={() => { setShowMainContent(false) }} size={25} color="white" />
						}

						<span
							className="group-initials"
						>
							{shortcutName}
						</span>
						<span
							className="group-name"
						>{selectedNote.group_name}</span>
					</div>
					<div className="main">
						{
							singleRecord?.records?.length > 0 ? (
								singleRecord.records.map((record) => {
									return (
										<div className="card">
											<p key={record.id}>{record.message}</p>
											<div className="record-footer">
												<span>{record.date}</span>
												<span className="dot">•</span>
												<span>{record.time}</span>
											</div>
										</div>
									)
								})
							) : (<p>No records found.</p>)
						}
					</div>
					<div className="footer">
						<textarea className="textarea" placeholder="Type something" value={tetAreaInput} onChange={(e) => { setTextAreaInput(e.target.value) }} onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault(); // Prevents adding a new line in the textarea
								handleSaveRecords(e);
							}
						}} />
						<IoSend
							style={{
								color: tetAreaInput ? "#16008B" : "#dcdcdc",
							}}
							size={25}
							onClick={handleSaveRecords}
							className="send-icon"
						/>
					</div>
				</div>
			}
		</div>
	)
}

export default MainContent;