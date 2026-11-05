import { useEffect, useState, type FormEvent } from "react";

import { fetchPosts, type ApiPost } from "../services/api";

import {
  getAuditRecords,
  saveAuditRecords,
  type AuditRecord,
} from "../services/auditCatalog";

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

  const [records, setRecords] = useState<AuditRecord[]>(() =>
    getAuditRecords()
  );

  const [newIssue, setNewIssue] = useState("");
  const [newPriority, setNewPriority] =
    useState<AuditRecord["priority"]>("Medium");
  const [newStatus, setNewStatus] =
    useState<AuditRecord["status"]>("Needs review");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editIssue, setEditIssue] = useState("");
  const [editPriority, setEditPriority] =
    useState<AuditRecord["priority"]>("Medium");
  const [editStatus, setEditStatus] =
    useState<AuditRecord["status"]>("Needs review");

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

  useEffect(() => {
    try {
      localStorage.setItem("audit-category", selectedCategory);
    } catch {
      console.warn("Unable to save category preference.");
    }
  }, [selectedCategory]);

  useEffect(() => {
    try {
      localStorage.setItem("audit-sort", sortOrder);
    } catch {
      console.warn("Unable to save sorting preference.");
    }
  }, [sortOrder]);

  function handleAddFinding(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const issue = newIssue.trim();

    if (!issue) return;

    const newRecord: AuditRecord = {
      id: records.length
        ? Math.max(...records.map((record) => record.id)) + 1
        : 1,
      issue,
      priority: newPriority,
      status: newStatus,
    };

    const updatedRecords = [...records, newRecord];

    setRecords(updatedRecords);
    saveAuditRecords(updatedRecords);

    setNewIssue("");
    setNewPriority("Medium");
    setNewStatus("Needs review");
  }

  function startEditing(record: AuditRecord) {
    setEditingId(record.id);
    setEditIssue(record.issue);
    setEditPriority(record.priority);
    setEditStatus(record.status);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditIssue("");
  }
  function handleDeleteFinding(id: number) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this audit finding?"
  );

  if (!confirmed) return;

  const updatedRecords = records.filter(
    (record) => record.id !== id
  );

  setRecords(updatedRecords);
  saveAuditRecords(updatedRecords);

  if (editingId === id) {
    cancelEditing();
  }
}

  function handleUpdateFinding(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const issue = editIssue.trim();

    if (!issue || editingId === null) return;

    const updatedRecords = records.map((record) =>
      record.id === editingId
        ? {
            ...record,
            issue,
            priority: editPriority,
            status: editStatus,
          }
        : record
    );

    setRecords(updatedRecords);
    saveAuditRecords(updatedRecords);
    cancelEditing();
  }

  const filteredRecords = records.filter((record) =>
    record.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <h3>Manage Audit Findings</h3>

      <form onSubmit={handleAddFinding}>
        <div className="form-group">
          <label htmlFor="new-issue">Accessibility Issue</label>
          <input
            id="new-issue"
            type="text"
            value={newIssue}
            onChange={(event) => setNewIssue(event.target.value)}
            placeholder="Enter a new accessibility issue"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="new-priority">Priority</label>
          <select
            id="new-priority"
            value={newPriority}
            onChange={(event) =>
              setNewPriority(
                event.target.value as AuditRecord["priority"]
              )
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="new-status">Status</label>
          <select
            id="new-status"
            value={newStatus}
            onChange={(event) =>
              setNewStatus(
                event.target.value as AuditRecord["status"]
              )
            }
          >
            <option value="Needs review">Needs review</option>
            <option value="In progress">In progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <button type="submit">Add Finding</button>
      </form>

      <h3>Audit Findings Catalog</h3>

      {editingId !== null && (
        <form onSubmit={handleUpdateFinding}>
          <h3>Edit Audit Finding</h3>

          <div className="form-group">
            <label htmlFor="edit-issue">Accessibility Issue</label>
            <input
              id="edit-issue"
              type="text"
              value={editIssue}
              onChange={(event) => setEditIssue(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-priority">Priority</label>
            <select
              id="edit-priority"
              value={editPriority}
              onChange={(event) =>
                setEditPriority(
                  event.target.value as AuditRecord["priority"]
                )
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-status">Status</label>
            <select
              id="edit-status"
              value={editStatus}
              onChange={(event) =>
                setEditStatus(
                  event.target.value as AuditRecord["status"]
                )
              }
            >
              <option value="Needs review">Needs review</option>
              <option value="In progress">In progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <button type="submit">Save Changes</button>

          <button type="button" onClick={cancelEditing}>
            Cancel
          </button>
        </form>
      )}

      <div>
        <label htmlFor="audit-search">Search audit findings:</label>
        <input
          id="audit-search"
          type="search"
          placeholder="Search findings..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <caption>Manageable accessibility audit findings</caption>

          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Issue</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.issue}</td>
                <td>{record.priority}</td>
                <td>{record.status}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => startEditing(record)}
                    aria-label={`Edit ${record.issue}`}
                  >
                    Edit
                  </button>
                  <button
  type="button"
  onClick={() => handleDeleteFinding(record.id)}
  aria-label={`Delete ${record.issue}`}
>
  Delete
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRecords.length === 0 && (
          <p role="status">No matching audit findings found.</p>
        )}
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
        <div role="status">
          <p>Loading API data...</p>
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
            <caption>Posts retrieved from JSONPlaceholder API</caption>

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
