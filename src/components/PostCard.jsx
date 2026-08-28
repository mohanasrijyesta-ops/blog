import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="post-card">

      <img
        src={post.image}
        alt={post.title}
        className="post-image"
      />

      <div className="post-content">

        <h2>
          {post.title}
        </h2>

        <p>
          {post.excerpt}
        </p>

        <div className="post-info">

          <span>
            👤 {post.author}
          </span>

          <span>
            {post.date}
          </span>

          <span>
            {post.readTime}
          </span>

        </div>

        <Link
          to={`/posts/${post.id}`}
          className="read-button"
        >
          Read More
        </Link>

      </div>

    </div>
  );
}

export default PostCard;