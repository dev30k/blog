import React ,{useState,useEffect}from 'react';
import {Link} from 'react-router-dom';
import {db} from '../database/firebase';


export default function Home() {   
    const [blogPosts,setBlogPosts] =useState([]);
    // const [loading,setLoading] =useState(true);

    const fetchPosts=()=>{
        db.collection('posts')
        .get() 
        .then((querySnapshot) =>{
            const data=querySnapshot.docs.map(doc=>
                doc.data());
            setBlogPosts(data);
            console.log(data);
        } )


    }

    useEffect(() => {
        fetchPosts();
        
    }, [])

    return ( <>
      <h1>Blog posts</h1>
      <p>
        Welcome to the starter code! We're showing hard-coded data right now.
      </p>
      {blogPosts.map(blogPost => (
        <section key={blogPost.slug} className="card">
          <Link to="/createBlog">CREATE</Link>
          <img src={blogPost.coverImage} alt={blogPost.coverImageAlt} />
          <div className="card-content">
            <h2>
              {blogPost.title} &mdash;{" "}
              <p style={{ color: "#5e5e5e" }} >{blogPost.datePretty}</p>
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: `${blogPost.content.substring(0, 200)}...`
              }}
            ></p>
            <Link to={`/${blogPost.slug}`}>Continue reading...</Link>
          </div>
        </section>
      )
      )}
      </>
    );
}
