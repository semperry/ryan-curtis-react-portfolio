import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogForm from "../blog/blog-form";

import BlogFeaturedImage from "../blog/blog-featured-image";

export default function BlogDetail(props) {
	const [currentId, setCurrentId] = useState(props.match.params.slug)
	const [blogItem, setBlogItem] = useState({})
	const [editMode, setEditMode] = useState(false)

	const handleUpdateFormSubmission = blog => {
		setBlogItem(blog)
		setEditMode(false)
	};

	const handleFeaturedImageDelete = () => {
		setBlogItem({
			featured_image_url: ""
		})
	};

	const handleEditClick = () => {
		if (props.loggedInStatus === "LOGGED_IN") {
			setEditMode(true)
		}
	};

	const getBlogItem = () => {
		axios
			.get(
				`https://semperry.devcamp.space/portfolio/portfolio_blogs/${
				currentId
				}`
			)
			.then(response => {
				setBlogItem(response.data.portfolio_blog)
			})
			.catch(error => {
				console.log("getBlogItem error", error);
			});
	};

	useEffect(() => {
		getBlogItem()
	}, [])

	const {
		title,
		content,
		featured_image_url,
		blog_status
	} = blogItem;

	const contentManager = () => {
		if (editMode) {
			return (
				<BlogForm
					handleFeaturedImageDelete={handleFeaturedImageDelete}
					handleUpdateFormSubmission={handleUpdateFormSubmission}
					editMode={editMode}
					blog={blogItem}
				/>
			);
		} else {
			return (
				<div className="content-container">
					<h1 onClick={handleEditClick}>{title}</h1>
					<BlogFeaturedImage img={featured_image_url} />
					<div className="content">{ReactHtmlParser(content)}</div>
				</div>
			);
		}
	};

	return <div className="blog-container">{contentManager()}</div>;
}
