import React from "react";
import ReactModal from "react-modal";

import BlogForm from "../blog/blog-form";

ReactModal.setAppElement(".app-wrapper");

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "800px"
	},
	overlay: {
		backgroundColor: "rgba(1,1,1,0.75)"
	}
}

export default function BlogModal(props) {
	const handleSuccessfulFormSubmission = blog => {
		props.handleSuccessfulNewBlogSubmission(blog);
	};

	return (
		<ReactModal
			style={customStyles}
			onRequestClose={() => {
				props.handleModalClose();
			}}
			isOpen={props.modalIsOpen}
		>
			<BlogForm handleSuccessfulFormSubmission={handleSuccessfulFormSubmission} />
		</ReactModal>
	);
}
