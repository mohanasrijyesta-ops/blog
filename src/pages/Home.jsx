import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="home-page">

      <section className="hero">

        <h1>
          Welcome to{" "}
          <span>BlogHub</span>
        </h1>

        <p>
          Share your ideas, knowledge and stories
          with the world.
        </p>

        <Link
          to="/create"
          className="create-post-button"
        >
          Create New Post
        </Link>

      </section>

      <section className="latest-posts">

        <h2>Latest Posts</h2>

        {posts.length === 0 ? (

          <div className="no-posts">
            <h3>No posts yet</h3>
            <p>
              Be the first person to create a post!
            </p>
          </div>

        ) : (

          <div className="post-list">

            {posts.map((post) => (

              <article
                className="post-card"
                key={post._id}
              >

                {post.image ? (

                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-card-image"
                  />

                ) : (

                  <div className="post-image-placeholder">
                    📝
                  </div>

                )}

                <div className="post-card-content">

                  <h3>
                    {post.title}
                  </h3>

                  <p>
                    {post.content}
                  </p>

                  <div className="post-meta">

                    <span>
                      👤{" "}
                      {post.author?.name ||
                        "BlogHub User"}
                    </span>

                    <span>
                      •
                    </span>

                    <span>
                      {post.createdAt
                        ? new Date(
                            post.createdAt
                          ).toLocaleDateString()
                        : ""}
                    </span>

                  </div>

                  <Link
                    to={`/posts/${post._id}`}
                    className="read-more"
                  >
                    Read More
                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Home;