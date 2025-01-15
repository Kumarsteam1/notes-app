import { React, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useContext } from "react";
import { Data } from "../ContextApi/NotesAppContext";

function SideContent() {
	const [groupName, setGroupName] = useState("");
	const [colorPicked, setColorPicked] = useState("");
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { state, setState, setSelectedNote, selectedNote, setShowMainContent } = useContext(Data);

	const handleColorPicked = (color) => {
		setColorPicked(color)
	}


	const handleCreate = (e) => {
		e.preventDefault();

		if (groupName.trim() === "") {
			alert("Group Name cannot be empty!");
			return;
		}

		let sameNameEntered = state.some((obj) => {
			return obj.group_name === groupName
		})

		if (sameNameEntered) {
			alert("Group Name cannot be 	SAME");
			return;
		}

		console.log(state)
		const newGroup = {
			id: state.length + 1,
			group_name: groupName,
			color: colorPicked,
			records: []
		}
		setState([...state, newGroup]);

		setGroupName("");
		handleClose();
	}


	const handleSingleListSelected = (id) => {
		let filteredNote = state.find((val) => {
			return val.id === id
		});
		console.log(filteredNote);

		setShowMainContent(true)

		setSelectedNote(filteredNote)
	}

	console.log(selectedNote);

	return (
		<div className="side-overall">
			<div className="side-heading">
				<h3>Pocket Notes</h3>
			</div>
			<div className="side-main" style={{ height: "90vh", overflowY: "auto" }}>
				<ul >
					{
						state.map((list) => {
							console.log(list);
							let initialVariable = list.group_name.split(" ");
							console.log(initialVariable);

							let initialName = "";
							// Generate initials based on available words
							if (initialVariable.length === 1) {
								initialName = initialVariable[0][0];
							} else {
								initialName = initialVariable[0][0] + (initialVariable[1]?.[0] || "");
							}

							return (
								<li
									key={list.id}
									style={{
										display: "flex",
										flexDirection: "row",
										gap: "1rem",
										alignItems: "center",
										padding: "10px 10px",
									}}
									className="sidebarList"
									onClick={() => handleSingleListSelected(list.id)}
								>
									<span
										style={{
											backgroundColor: list.color || "orange",
										}}
										className="group-initials"
									>
										{initialName.toUpperCase()}
									</span>
									{list.group_name}
								</li>
							);
						})
					}
				</ul>
			</div>
			<div onClick={handleShow} className="side-footer">
				<FaPlus className="add-icon-footer" size={25} style={{ color: "#ffffff" }} />
			</div>

			{/* MODEL */}

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Group</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="modal-div">
						<div className="modal-row">
							<span className="modal-label">Group Name</span>
							<input onChange={(e) => { setGroupName(e.target.value) }} value={groupName} className="modal-input" placeholder="Enter group name" />
						</div>
						<div className="modal-row">
							<span className="modal-label">Choose Colours</span>
							<section className="color-options">
								<span style={{ backgroundColor: "#b38bfa" }} onClick={() => handleColorPicked("#b38bfa")} className="color-circle"></span>
								<span style={{ backgroundColor: "#ff79f2" }} onClick={() => handleColorPicked("#ff79f2")} className="color-circle"></span>
								<span style={{ backgroundColor: "#43e6fc" }} onClick={() => handleColorPicked("#43e6fc")} className="color-circle"></span>
								<span style={{ backgroundColor: "#f19576" }} onClick={() => handleColorPicked("#f19576")} className="color-circle"></span>
								<span style={{ backgroundColor: "#0047ff" }} onClick={() => handleColorPicked("#0047ff")} className="color-circle"></span>
								<span style={{ backgroundColor: "#6691ff" }} onClick={() => handleColorPicked("#6691ff")} className="color-circle"></span>
							</section>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleCreate}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>

		</div>
	)
}

export default SideContent;