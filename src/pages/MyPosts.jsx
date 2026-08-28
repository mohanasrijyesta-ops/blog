import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyPosts.css";

function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/posts"
      );

      const data = await response.json();

      if (response.ok) {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete post");
        return;
      }

      alert("Post deleted successfully!");

      setPosts((oldPosts) =>
        oldPosts.filter((post) => post._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend");
    }
  };

  return (
    <div className="my-posts-page">

      <div className="my-posts-container">

        <h1>My Posts</h1>

        {posts.length === 0 ? (
          <div className="empty-posts">

            <h2>No Posts Yet</h2>

            <p>
              Create your first blog post!
            </p>

            <Link
              to="/create"
              className="create-button"
            >
              Create New Post
            </Link>

          </div>
        ) : (

          <div className="my-post-list">

            {posts.map((post) => (

              <div
                className="my-post-card"
                key={post._id}
              >

                {/* IMAGE */}

                <div className="my-post-image-container">

                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="my-post-image"
                    />
                  ) : (
                    <div className="my-post-image-placeholder">
                      📝
                    </div>
                  )}

                </div>

                {/* POST INFORMATION */}

                <div className="my-post-content">

                  <h2>
                    {post.title}
                  </h2>

                  <p>
                    {post.content}
                  </p>

                  {/* AUTHOR AND DATE */}

                  <div className="my-post-meta">

                    <span>
                      👤{" "}
                      {post.author?.name ||
                        "BlogHub User"}
                    </span>

                    <span>•</span>

                    <span>
                      {post.createdAt
                        ? new Date(
                            post.createdAt
                          ).toLocaleDateString(
                            "en-GB"
                          )
                        : ""}
                    </span>

                  </div>

                  {/* BUTTONS */}

                  <div className="my-post-buttons">

                    <Link
                      to={`/posts/${post._id}`}
                      className="read-button"
                    >
                      Read More
                    </Link>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(post._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyPosts;