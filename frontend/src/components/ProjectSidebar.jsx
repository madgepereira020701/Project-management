import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function ProjectSidebar({
  onStartAddProject,
  onSelectProject,
  selectedProjectId,
}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project list from backend
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("http://localhost:3000/projects");
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <aside className="w-1/3 py-8 bg-green-900 text-stone-50 md:w-72 rounded-r-xl">
        <p className="px-6">Loading projects…</p>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="w-1/3 py-8 bg-green-900 text-red-400 md:w-72 rounded-r-xl">
        <p className="px-6">Error: {error}</p>
      </aside>
    );
  }

  return (
    <aside className="w-1/3 py-8 bg-green-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200 mx-6">
        Your Projects
      </h2>
      <div className="mx-6">
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8 mx-6">
        {projects.map((project) => {
          const isSelected = project._id === selectedProjectId;
          const cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 " +
            (isSelected
              ? "bg-green-800 text-stone-200"
              : "hover:bg-one-800 text-stone-400");

          return (
            <li key={project._id}>
              <button
                className={cssClasses}
                onClick={() => onSelectProject(project._id)}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
