
import { ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import SocialLink from './SocialLink';
export default function Hero(){

    return (
        <div>
            <section className="mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Hi, I'm a software engineer who loves to write.
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
                    I write about web development, software engineering practices, and the intersection of technology and creativity. 
                    Welcome to my corner of the internet where I share my thoughts and learnings.
                </p>
            </section>
        </div>
    )
}