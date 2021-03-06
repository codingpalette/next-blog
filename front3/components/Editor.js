import {useState, useRef, useEffect, useCallback} from 'react';
import styled from '@emotion/styled';
import { useSelector } from "react-redux";
import axios from 'axios';
import {backUrl} from "../config/config";
axios.defaults.baseURL = `${backUrl}`;
axios.defaults.withCredentials = true;

const EditorContainer = styled.div`
    margin-top: 1rem;
`;

const QuillWrapper = styled.div`
    /* 최소 크기 지정 및 padding 제거 */
    .ql-editor {
        min-height: 320px;
        font-size: 1rem;
        line-height: 1.5;
    }
    
`;


const Editor = ({ content, setContent }) => {
    const { loadPostDone } = useSelector((state) => state.post)

    const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
    const quillInstance = useRef(null); // Quill 인스턴스를 설정

    const imageHandler = () => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const imageFormData = new FormData();
            imageFormData.append('image', file)
            const res = await axios.post('/image', imageFormData);
            // console.log(res);
            const range = quillInstance.current.getSelection();
            quillInstance.current.insertEmbed(range.index, "image", `${res.data[0]}`);
        }


    }

    useEffect(() => {
        const Quill = typeof window === 'object' ? require('quill') : () => false;
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'snow',
            placeholder: '내용을 작성하세요...',
            modules: {
                // 더 많은 옵션
                // https://quilljs.com/docs/modules/toolbar/ 참고
                toolbar: {
                    container : [
                        [{ header: '1' }, { header: '2' }],
                        ['bold', 'underline', 'strike', { 'color': [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['blockquote', 'code-block', 'link', 'image']
                    ],
                    handlers: {
                        image: imageHandler
                    }
                }
            }
        });
        // quill에 text-change 이벤트 핸들러 등록
        // 참고: https://quilljs.com/docs/api/#events
        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                // console.log(quill.root.innerHTML )
                setContent(quill.root.innerHTML)
            }
        });
    }, [setContent])

    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current) return;
        if (content !== '' && loadPostDone) {
            mounted.current = true;
            quillInstance.current.root.innerHTML = content;
        }
    }, [content, loadPostDone])



    return(
        <>
            <EditorContainer>
                <QuillWrapper>
                    <div ref={quillElement} />
                </QuillWrapper>
            </EditorContainer>
        </>
    )
}

export default Editor;
