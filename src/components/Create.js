import React,{useState,createRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar,{modules,formats} from '../Editor/Editor';
import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';
import {db} from '../database/firebase';
import Moment from 'react-moment';


function Create() {
    const [title,setTitle]=useState("");
    const [slug,setSlug] =useState("");
    const [category,setCategory]=useState("");
    const [img,setImg]=useState({file:null});
    const [state,setState]=useState("");
    const [open,setOpen]=useState(false);
    const file=createRef();

    const handleImg=event=>{
        setImg({file:event.target.files[0]});
    }
    const generateDate=()=>{
        <Moment format="D MMM YYYY" withTitle fromNow ago />

    }
    const uploadBlogs=(e)=>{
        e.preventDefault();        
        const date=generateDate();
        const newPost= {
            title,
            slug,
            category,
            img,
            state,
            date,

    };
        db.collection("posts")
        // .doc("posted")
        .add(newPost)
        .then(( ) => {
            console.log("Saved successfully")
        })
        .catch(err=>{
            console.log("Error",err.message);
        })
    }



    return (
        <div className="container">
            <div className="input-container">
                <label>Title</label>
                <input className="input"type="text" value={title} onChange={({target:{value}})=>{
                    setTitle(value)
                }} />

                <label>Slug</label>
                <input className="input"type="text" placeholder="" value={slug} onChange={({target:{value}})=>{
                    setSlug(value)
                }} />

                <label>Category</label>
                <Select value={category}open={open} 
                onClose={()=>{setOpen(false)}}onOpen={()=>{setOpen(true)}}
                onChange={({target:{value}})=>{
                    setCategory(value);
                }}>
                    <MenuItem value="">
                    <em>None</em>                    
                    </MenuItem>
                    <MenuItem value={"World"}>World</MenuItem>
                    <MenuItem value={"Tech"}>Tech</MenuItem>
                    <MenuItem value={"Finance"}>Finance</MenuItem>                    
                </Select>              

                <div className="img-input">
                    <label>ImageUpload</label>
                    <input type="file" onChange={handleImg} ref={file} />
                    <img src={setImg} alt=""/>
                </div>
                
                <div className="text-editor">
                <label>Post Content</label>
                    <EditorToolbar />
                    <ReactQuill  
                        theme="snow" 
                        value={state}
                        onChange={setState}
                        placeholder={"Write something amazing...."}
                        modules={modules}
                        formats={formats}
                    />                    
                </div>
                <button type="submit" className="post-button" onClick={uploadBlogs}>POST</button>

            </div>
            </div>
    )
}

export default Create
