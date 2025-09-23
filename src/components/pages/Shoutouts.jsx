
export default function Shoutouts() {
  const creators = [
    {
      name: "Eli Bendersky",
      url: "https://eli.thegreenplace.net/",
      comment: "My current favourite. His passion for knowledge across domains is scary and his blog is a testament for this.",
      tags: ["Systems Programming", "Compilers", "Algorithms"]
    },
    {
      name: "Dave Cheney",
      url: "https://dave.cheney.net/",
      comment: "Go programming expert who writes incredibly insightful articles about software engineering practices, performance optimization, and clean code principles.",
      tags: ["Go Programming", "Performance", "Best Practices"],
      featuredPost: {
        title: "",
        url: "https://dave.cheney.net/2019/05/07/prefer-table-driven-tests"
      }
    },
    {
      name: "Three Dots Labs",
      url: "https://threedots.tech/",
      comment: "Fairly new addition but it is touted to be an amazing resource for Go developers!",
      tags: ["Go", "Tutorials", "Architecture"]
    },
    {
      name: "Robert Heaton",
      url: "https://robertheaton.com/",
      comment: "Master at explaining complex technical concepts in an accessible way. His explanation of how Tor works is legendary(Got to know his blog through a class discussion page ).",
      tags: ["Security", "Privacy", "Explainers"],
      featuredPost: {
        title: "How does Tor work?",
        url: "https://robertheaton.com/2019/04/06/how-does-tor-work/"
      }
    },
    {
      name: "Ryan Schachte",
      url: "https://ryanschachte.com/",
      comment: "Good resource and a fellow Sun Devil! His sliding window video was very helpful to me for understanding the concept.",
      tags: ["System Design", "Career", "Web Development"],
      featuredPost: {
        title: "Sliding Window Technique - Algorithmic Mental Models",
        url: "https://www.youtube.com/watch?v=MK-NZ4hN7rs"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-8">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Inspiring Voices
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Curated collection of brilliant minds who shape the way I think about technology, design, and craft.
          </p>
        </div>

        {/* Creators List */}
        <div className="space-y-1">
          {creators.map((creator, index) => (
            <div key={creator.name} className="group hover:bg-gray-100  hover:shadow-sm transition-all duration-200 rounded-lg p-6 cursor-pointer">
              
              {/* Creator Header */}
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-2xl font-light text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  {creator.name}
                </h3>
                
                <a
                  href={creator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-blue-600 transition-colors font-mono uppercase tracking-widest"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit ↗
                </a>
              </div>

              {/* Comment */}
              <p className="text-gray-600 leading-relaxed mb-4 font-light">
                {creator.comment}
              </p>

              {/* Featured Post */}
              {creator.featuredPost && (
                <div className="mb-4 pl-4 border-l-2 border-blue-100 group-hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    <a
                      href={creator.featuredPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {creator.featuredPost.title}
                    </a>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {creator.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full font-mono tracking-wide group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Call to Action */}
        <div className="mt-20 pt-12 text-center border-t border-gray-100">
          <div className="space-y-3">
            <h2 className="text-lg font-light text-gray-700">
              Know someone who deserves recognition?
            </h2>
            <a 
              href="mailto:your-email@example.com" 
              className="inline-block text-blue-600 hover:text-blue-700 transition-colors font-mono text-sm tracking-wide underline underline-offset-4"
            >
              suggest@yoursite.com
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-xs font-mono tracking-widest uppercase">
            Thank you for sharing knowledge freely
          </p>
        </div>
      </div>
    </div>
  );
}