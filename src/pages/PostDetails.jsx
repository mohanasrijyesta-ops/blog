import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PostDetails.css";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================
  // LOAD POST
  // ==========================

  const loadPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Post not found");
        navigate("/");
        return;
      }

      setPost(data);
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend");
    }
  };

  // ==========================
  // LOAD COMMENTS
  // ==========================

  const loadComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${id}/comments`
      );

      const data = await response.json();

      if (response.ok) {
        setComments(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadPost();
      await loadComments();
      setLoading(false);
    };

    loadData();
  }, [id]);

  // ==========================
  // ADD COMMENT
  // ==========================

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please write a comment");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add a comment");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${id}/comments`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            text: comment.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add comment");
        return;
      }

      setComments([
        ...comments,
        data,
      ]);

      setComment("");

    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend");
    }
  };

  // ==========================
  // DELETE POST
  // ==========================

  const handleDelete = async () => {
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
        alert(
          data.message ||
            "Failed to delete post"
        );
        return;
      }

      alert("Post deleted successfully!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend");
    }
  };

  if (loading) {
    return (
      <div className="details-loading">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="post-details-page">

      {/* ==========================
          LEFT SIDE - POST
      ========================== */}

      <main className="post-main">

        <article className="post-card">

          <h1 className="post-title">
            {post.title}
          </h1>

          <div className="post-meta">

            <span className="author">
              👤{" "}
              {post.author?.name ||
                "BlogHub User"}
            </span>

            <span>
              •{" "}
              {post.createdAt
                ? new Date(
                    post.createdAt
                  ).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                : "Aug 25, 2026"}
            </span>

            <span>
              • 5 min read
            </span>

          </div>

          {/* POST IMAGE */}

          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="post-detail-image"
            />
          ) : (
            <div className="post-image-placeholder">
              📝
            </div>
          )}

          {/* CONTENT */}

          <div className="post-content">
            {post.content}
          </div>

          {/* ACTION BUTTONS */}

          <div className="post-actions">

            <button
              className="edit-button"
              onClick={() =>
                navigate(
                  `/edit-post/${post._id}`
                )
              }
            >
              ✎ Edit
            </button>

            <button
              className="delete-button"
              onClick={handleDelete}
            >
              Delete
            </button>

          </div>

        </article>

      </main>

      {/* ==========================
          RIGHT SIDE - COMMENTS
      ========================== */}

      <aside className="comments-sidebar">

        <h2>
          Comments ({comments.length})
        </h2>

        <div className="comments-list">

          {comments.length === 0 ? (
            <p className="no-comments">
              No comments yet.
            </p>
          ) : (
            comments.map((item) => (

              <div
                className="comment-item"
                key={item._id}
              >

                <div className="comment-avatar">
                  {item.author?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </div>

                <div className="comment-body">

                  <h3>
                    {item.author?.name ||
                      "User"}
                  </h3>

                  <span className="comment-date">
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : ""}
                  </span>

                  <p>
                    {item.text}
                  </p>

                </div>

              </div>

            ))
          )}

        </div>

        {/* ADD COMMENT */}

        <div className="add-comment">

          <h2>
            Add a Comment
          </h2>

          <form onSubmit={handleComment}>

            <textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
            />

            <button type="submit">
              Add Comment
            </button>

          </form>

        </div>

      </aside>

    </div>
  );
}

export default PostDetails;