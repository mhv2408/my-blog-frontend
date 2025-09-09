import { useNavigate } from "react-router-dom";



// BlogPost component for individual post rendering
export default function BlogPostItem({ title, excerpt, date, readTime, slug }) {
  const navigate = useNavigate()

  const handleClick=()=>{
    console.log("Blog clicked")
    navigate(`/${slug}`)
  }
  return (
    <article className="border-b border-gray-200 pb-8 last:border-b-0">
      <div className="flex flex-col space-y-3">
        <h4 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
          onClick={handleClick}
        >
          {title}
        </h4>
        <p className="text-gray-600 leading-relaxed">
          {excerpt}
        </p>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>{date}</span>
        </div>
      </div>
    </article>
  );
}