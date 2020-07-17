import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../forms/rich-text-editor";

export default function BlogForm(props) {
	const featuredImageRef = useRef()

	const [id, setId] = useState("")
	const [title, setTitle] = useState("")
	const [blog_status, setBlogStatus] = useState("")
	const [content, setContent] = useState("")
	const [featured_image, setFeaturedImage] = useState("")
	const [apiUrl, setApiUrl] = useState("https://semperry.devcamp.space/portfolio/portfolio_blogs")
	const [apiAction, setApiAction] = useState("post")

	const deleteImage = imageType => {
		axios
			.delete(
				`https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${
				props.blog.id
				}?image_type=${imageType}`,
				{ withCredentials: true }
			)
			.then(response => {
				props.handleFeaturedImageDelete();
			})
			.catch(error => {
				console.log("deleteImage", error);
			});
	};

	const handleFeaturedImageDrop = () => {
		return {
			addedfile: file => setFeaturedImage(file)
		};
	};

	const djsConfig = () => {
		return {
			addRemoveLinks: true,
			maxFiles: 1
		};
	};

	useEffect(() => {
		if (props.editMode) {
			setId(props.blog.id)
			setTitle(props.blog.title)
			setBlogStatus(props.blog.blog_status)
			setContent(props.blog.content)
			setApiUrl(`https://semperry.devcamp.space/portfolio/portfolio_blogs/${
				props.blog.id
				}`)
			setApiAction("patch")
		}
	}, [])

	const componentConfig = () => {
		return {
			iconFiletypes: [".jpg", ".png"],
			showFiletypeIcon: true,
			postUrl: "https://httpbin.org/post"
		};
	};

	const buildForm = () => {
		let formData = new FormData();

		formData.append("portfolio_blog[title]", title);
		formData.append("portfolio_blog[blog_status]", blog_status);
		formData.append("portfolio_blog[content]", content);

		if (featured_image) {
			formData.append(
				"portfolio_blog[featured_image]",
				featured_image
			);
		}

		return formData;
	};

	const handleSubmit = event => {
		axios({
			method: apiAction,
			url: apiUrl,
			data: buildForm(),
			withCredentials: true
		})
			.then(response => {
				if (featured_image) {
					featuredImageRef.current.dropzone.removeAllFiles();
				}
				setTitle("")
				setBlogStatus("")
				setContent("")
				setFeaturedImage("")

				if (props.editMode) {
					props.handleUpdateFormSubmission(response.data.portfolio_blog)
				} else {
					props.handleSuccessfulFormSubmission(
						response.data.portfolio_blog
					);
				}
			})
			.catch(error => {
				console.log("handleSubmit Error", error);
			});

		event.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit} className="blog-form-wrapper">
			<div className="two-column">
				<input
					type="text"
					onChange={e => setTitle(e.target.value)}
					placeholder="Blog Title"
					value={title}
				/>

				<input
					type="text"
					onChange={e => setBlogStatus(e.target.value)}
					placeholder="Blog Status"
					value={blog_status}
				/>
			</div>

			<div className="one-column">
				<RichTextEditor
					handleRichTextEditorChange={content => setContent(content)}
					editMode={props.editMode}
					contentToEdit={
						props.editMode && props.blog.content
							? props.blog.content
							: null
					}
				/>
			</div>

			<div className="image-uploaders">
				{props.editMode && props.blog.featured_image_url ? (
					<div className="portfolio-manager-image-wrapper">
						<img src={props.blog.featured_image_url} />

						<div className="image-removal-link">
							<a
								onClick={() => {
									deleteImage("featured_image");
								}}
							>
								Remove file
                </a>
						</div>
					</div>
				) : (
						<DropzoneComponent
							ref={featuredImageRef}
							config={componentConfig()}
							djsConfig={djsConfig()}
							eventHandlers={handleFeaturedImageDrop()}
						>
							<div className="dz-message">Featured Image</div>
						</DropzoneComponent>
					)}
			</div>

			<button className="btn">Save</button>
		</form>
	);
}
