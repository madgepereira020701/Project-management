import Button from "../components/Button";

export default function ProjectSidebar({
    onStartAddProject,projects, onSelectProject,
     selectedProjectId})
{
    return  (<aside className="w-1/3 py-8 py-16 bg-green-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200 mx-6">Your Projects</h2>
        <div>
            <Button onClick={onStartAddProject}>
            + Add Project
            </Button>
        </div>
        <ul className="mt-8">
{projects.map((project) => {
   let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1  hover:bg-one-800";
   if(project.id === selectedProjectId)
   {
    cssClasses +=' bg-green-800 text-stone-200'
   }
   else
   {
     cssClasses += ' text-stone-400'
   }

    return (
    <li key={project.id}>
    <button className={cssClasses}
    onClick={() => onSelectProject(project.id)}>
    {project.title}
    </button>
    </li>
    );
   } 
   )}
</ul>    
</aside> 
);
}