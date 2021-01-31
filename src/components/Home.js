import React ,{useState,useEffect}from 'react';
import {Link} from 'react-router-dom';
import {db} from '../database/firebase';


export default function Home() {
    const [blogPosts,setBlogPosts] =useState([]);
    const fetchPosts=()=>{
        db.collection('posts')
            .get()
            .then((querySnapshot) =>{
                const data=querySnapshot.docs.map(doc=>
                    doc.data());
                setBlogPosts(data);
                console.log(data);
            } )
    };

    useEffect(() => {
        fetchPosts();

    }, [])
    return ( <>
            <h1>Blog posts</h1>
            <p>
                Welcome to the starter code! We're showing hard-coded data right now.
            </p>
            {blogPosts.map((blogPost,index) => (
                    <section key={index} className="card">
                        <Link to="/create">CREATE</Link>
                        <img src={blogPost.image} alt="" />
                        <div className="card-content">
                            <h2>{blogPost.category}</h2>
                            <h2>
                                {blogPost.title} &mdash;{" "}

                            </h2>
                            <p>{blogPost.state.slice(0, 200)}</p>
                            <Link to={`/${blogPost.slug}`}>Continue reading...</Link>
                        </div>
                    </section>
                )
            )}
        </>
    );
}
