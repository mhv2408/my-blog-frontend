import Hero from '../layout/Hero'
import BlogPost from '../blog/BlogPost/BlogPost'
export default function Main(){

    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
        <Hero />
        <BlogPost />
        </main>
    )
}