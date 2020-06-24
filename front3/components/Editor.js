import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';



const Editor = () => {


    // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

    const imageHandler = () => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const range = ReactQuill.getSelection();
            ReactQuill.insertEmbed(range.index, "image", `https://cdn.pixabay.com/photo/2020/05/12/17/04/wind-turbine-5163993_960_720.jpg`);
        }


    }


   const modules = {
       toolbar: {
           container : [
               [{ header: '1' }, { header: '2' }],
               ['bold', 'italic', 'underline', 'strike'],
               [{ list: 'ordered' }, { list: 'bullet' }],
               ['blockquote', 'code-block', 'link', 'image']
           ],
           handlers: {
               image: imageHandler
           }
       }
   }



    return(
        <>
            <div>
                <ReactQuill
                    value=''
                    theme={'snow'}
                    modules={modules}
                />
            </div>
        </>
    )
}

export default Editor;