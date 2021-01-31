import React,{useState,createRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar,{modules,formats} from '../Editor/Editor';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {db,storage} from '../database/firebase';
import firebase from "firebase";
import moment from 'moment';
import Moment from "react-moment";
import * as url from "url";

function Create() {
    const [title,setTitle]=useState("");
    const [slug,setSlug] =useState("");
    const [category,setCategory]=useState("");
    const [image,setImage]=useState(null);
    const [state,setState]=useState("");
    const [open,setOpen]=useState(false);
    const [progress,setProgress] = useState(0);
    const file=createRef();


    const handleChange=event=>{
        if (event.target.files[0]){
            setImage(event.target.files[0])
        }
    };

    const handleUpload=()=>{
        const uploadImage=storage.ref(`images/${image.name}`).put(image);
        uploadImage.on(
            "statechange",
            (snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred/snapshot.totalBytes)*100);
                    setProgress(progress);
                },
                    (error) =>{
                        console.log("Error=>",error);
                        alert("An Error has Occured=>>",error.message);

                    },
                    storage.ref("images")
                        .child(image.name)
                        .getDownloadURL().then(url=>{
                        db.collection("posts").add({
                            title,
                            slug,
                            category,
                            image:url,
                            state,
                            timestamp:firebase.firestore.FieldValue.serverTimestamp()
                        }).then(()=>{
                            console.log("Saved in database successfully");
                            alert("Saved to Database successfully");
                        }).catch((error)=>{
                            alert.message("Error=>>",error.message);
                        })


                    })
            ))
    };
    return (
        <div className="container">
            <div className="input-container">
                <label>Title</label>
                <input className="input" type="text" value={title} onChange={({target:{value}})=>{
                    setTitle(value)
                }} />

                <label>Slug</label>
                <input className="input" type="text" placeholder="" value={slug} onChange={({target:{value}})=>{
                    setSlug(value)
                }} />

                <label>Category</label>
                <Select value={category} open={open}
                        onClose={()=>{setOpen(false)}} onOpen={()=>{setOpen(true)}}
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
                    <progress value={progress} max={100} />
                    <input type="file"  onChange={handleChange} ref={file} />

               b</div>

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
                <button type="submit" className="post-button" onClick={handleUpload}>POST</button>

            </div>
        </div>
    )
}

export default Create
