import { useEffect, useState } from "react";
import { fetchPosts, type ApiPost } from "../services/api";

const auditData = [
  {
    id: 1,
    issue: "Page structure and landmarks",
    priority: "High",
    status: "Needs review",
  },
  {
    id: 2,
    issue: "ARIA roles and hidden content",
    priority: "High",
    status: "Needs review",
  },
  {
    id: 3,
    issue: "Colour contrast",
    priority: "High",
    status: "Needs review",
  },
  {
    id: 4,
    issue: "Touch target size",
    priority: "Medium",
    status: "Needs review",
  },
  {
    id: 5,
    issue: "Links and list semantics",
    priority: "Medium",
    status: "Needs review",
  },
];

function getSavedPreference(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export default function DataTable() {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(() =>
    getSavedPreference("audit-category", "All")
  );

  const [sortOrder, setSortOrder] = useState(() =>
    getSavedPreference("audit-sort", "id-asc")
  );

  async function loadPosts() {
    try {
      setLoading(true);
      setError("");

      const data = await fetchPosts();

      setPosts(data);
    } catch {
      setError("Unable to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  // Save category preference
  useEffect(() => {
    try {
      localStorage.setItem("audit-category", selectedCategory);
    } catch {
      console.warn("Unable to save category preference.");
    }
  }, [selectedCategory]);

  // Save sorting preference
  useEffect(() => {
    try {
      localStorage.setItem("audit-sort", sortOrder);
    } catch {
      console.warn("Unable to save sorting preference.");
    }
  }, [sortOrder]);

  // Search and category filtering
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const category = Math.ceil(post.id / 34);

    const matchesCategory =
      selectedCategory === "All" ||
      category === Number(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Sorting
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOrder) {
      case "id-desc":
        return b.id - a.id;

      case "title-asc":
        return a.title.localeCompare(b.title);

      case "title-desc":
        return b.title.localeCompare(a.title);

      default:
        return a.id - b.id;
    }
  });

  return (
    <section aria-labelledby="table-heading">
      <p className="eyebrow">AUDIT RECORDS</p>

      <h2 id="table-heading">Accessibility Audit Data</h2>

      <p className="muted">
        A structured overview of the identified accessibility issues.
      </p>

      <h3>Original Audit Findings</h3>

      <div className="table-container">
        <table>
          <caption>
            India.gov.in accessibility audit findings and review status
          </caption>

          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Accessibility issue</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            {auditData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.issue}</td>
                <td>{item.priority}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Live API Data</h3>

      <div className="category-tabs" aria-label="Post categories">
        <button
          type="button"
          aria-pressed={selectedCategory === "All"}
          onClick={() => setSelectedCategory("All")}
        >
          All Posts
        </button>

        <button
          type="button"
          aria-pressed={selectedCategory === "1"}
          onClick={() => setSelectedCategory("1")}
        >
          Category 1
        </button>

        <button
          type="button"
          aria-pressed={selectedCategory === "2"}
          onClick={() => setSelectedCategory("2")}
        >
          Category 2
        </button>

        <button
          type="button"
          aria-pressed={selectedCategory === "3"}
          onClick={() => setSelectedCategory("3")}
        >
          Category 3
        </button>
      </div>

      <div>
        <label htmlFor="post-search">Search posts by title:</label>

        <input
          id="post-search"
          type="search"
          placeholder="Type to search posts..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="sorting-control">
        <label htmlFor="sort-posts">Sort posts:</label>

        <select
          id="sort-posts"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="id-asc">ID: Low to High</option>
          <option value="id-desc">ID: High to Low</option>
          <option value="title-asc">Title: A to Z</option>
          <option value="title-desc">Title: Z to A</option>
        </select>
      </div>

      {loading && (
  <div role="status" aria-label="Loading API data">
    <p>Loading API data...</p>

    <div className="table-container">
      <table aria-hidden="true">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td>
                <span className="skeleton skeleton-id" />
              </td>
              <td>
                <span className="skeleton skeleton-title" />
              </td>
              <td>
                <span className="skeleton skeleton-description" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

     {error && (
  <div className="error-banner" role="alert">
    <p>{error}</p>

    <button type="button" onClick={loadPosts}>
      Try Again
    </button>
  </div>
)}

      {!loading && !error && (
        <div className="table-container">
          <table>
            <caption>
              Posts retrieved from JSONPlaceholder API
            </caption>

            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
              </tr>
            </thead>

            <tbody>
              {sortedPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedPosts.length === 0 && (
            <p role="status">No matching posts found.</p>
          )}
        </div>
      )}
    </section>
  );
}
