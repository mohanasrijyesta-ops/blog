import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: title.trim(),
            content: content.trim()
          })
        }
      );

      const data = await response.json();

      console.log("POST RESPONSE:", data);

      if (!response.ok) {
        alert(
          data.message ||
          "Failed to create post"
        );
        return;
      }

      alert("Post published successfully!");

      setTitle("");
      setContent("");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        "Cannot connect to backend. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">

      <h1>Create New Post</h1>

      <form
        className="create-form"
        onSubmit={handleSubmit}
      >

        <label htmlFor="title">
          Title
        </label>

        <input
          id="title"
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <label htmlFor="content">
          Content
        </label>

        <div className="editor">

          <div className="toolbar">

            <button type="button">
              <b>B</b>
            </button>

            <button type="button">
              <i>I</i>
            </button>

            <button type="button">
              <u>U</u>
            </button>

            <button type="button">
              •
            </button>

            <button type="button">
              ☷
            </button>

            <button type="button">
              🔗
            </button>

            <button type="button">
              ↗
            </button>

          </div>

          <textarea
            id="content"
            placeholder="Write your content here..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

        </div>

        <div className="form-buttons">

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="publish-button"
            disabled={loading}
          >
            {loading
              ? "Publishing..."
              : "Publish Post"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default CreatePost;