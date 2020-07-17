import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

function Blog(props) {
	const [blogItems, setBlogItems] = useState([])
	const [totalCount, setTotalCount] = useState(0)
	const [currentPage, setCurrentPage] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [blogModalIsOpen, setBlogModalIsOpen] = useState(false)

	window.addEventListener("scroll", onScroll, false);

	const handleDeleteClick = blog => {
		axios
			.delete(
				`https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,
				{ withCredentials: true }
			)
			.then(response => {
				setBlogItems(blogItems.filter(blogItem => {
					return blog.id !== blogItem.id
				}))
				return response.data;
			})
			.catch(error => {
				console.log("del error", error);
			});
	};

	const handleSuccessfulNewBlogSubmission = blog => {
		setBlogModalIsOpen(false)
		setBlogItems([blog].concat(blogItems))
	};

	const handleNewBlogClick = () => {
		setBlogModalIsOpen(true)
	};

	const onScroll = () => {
		if (
			isLoading ||
			blogItems.length === totalCount
		) {
			return;
		}

		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			getBlogItems();
		}
	};

	const getBlogItems = () => {
		setCurrentPage(currentPage + 1)

		axios
			.get(
				`https://semperry.devcamp.space/portfolio/portfolio_blogs?page=${
				currentPage
				}`,
				{
					withCredentials: true
				}
			)
			.then(response => {
				console.log("getting", response.data);
				setBlogItems(blogItems.concat(response.data.portfolio_blogs))
				setTotalCount(response.data.meta.total_records)
				setIsLoading(false)
			})
			.catch(error => {
				console.log("getBlogItems error", error);
			});
	};

	useEffect(() => {
		getBlogItems()
	}, [])

	useEffect(() => {
		return window.removeEventListener("scroll", onScroll, false);
	}, [])

	const blogRecords = blogItems.map(blogItem => {
		if (props.loggedInStatus === "LOGGED_IN") {
			return (
				<div key={blogItem.id} className="admin-blog-wrapper">
					<BlogItem blogItem={blogItem} />
					<a onClick={() => handleDeleteClick(blogItem)}>
						<FontAwesomeIcon icon="trash" />
					</a>
				</div>
			);
		} else {
			return <BlogItem key={blogItem.id} blogItem={blogItem} />;
		}
	});

	return (
		<div className="blog-container">
			<BlogModal
				handleSuccessfulNewBlogSubmission={handleSuccessfulNewBlogSubmission}
				handleModalClose={() => setBlogModalIsOpen(false)}
				modalIsOpen={blogModalIsOpen}
			/>

			{props.loggedInStatus === "LOGGED_IN" ? (
				<div className="new-blog-link">
					<a onClick={handleNewBlogClick}>
						<FontAwesomeIcon icon="plus-circle" />
					</a>
				</div>
			) : null}

			<div className="content-container">{blogRecords}</div>

			{isLoading ? (
				<div className="content-loader">
					<FontAwesomeIcon icon="spinner" spin />
				</div>
			) : null}
		</div>
	);
}

export default Blog;
