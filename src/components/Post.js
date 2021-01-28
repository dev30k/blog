import React from 'react';
import {Redirect} from 'react-router-dom';


function Post({match}) {
    const slug=match.params.slug;
    const postSlugs=["my-first-blog-post","my-second-blog-post"];
    const postNotExist=postSlugs.indexOf(slug) === -1;
    if (postNotExist) {
        return <Redirect to="/404" />;
    }
    return (
        <div>
              <h1>This is a template for blog posts.</h1>
                <p>We'll get to this once we've hooked up Firebase!</p>
          
        </div>
    )
}

export default Post
