import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';



export const initialState = {
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,

    loadPostsLoading: false, // 포스트리스트
    loadPostsDone: false,
    loadPostsError: null,

    loadPostLoading: false, // 포스트
    loadPostDone: false,
    loadPostError: null,

    mainPosts: [],
    detailPost: null,
    imagePaths: [],
    hasMorePost: false,

    postWriteMode: 'create',

    modifyPostLoading: false,
    modifyPostDone: false,
    modifyPostError: null,
};

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id: shortId.generate(),
    title: faker.name.title(),
    date:'2020.06.10',
    description: faker.lorem.paragraph(),
    tags: faker.company.suffixes(),
    content: `
        <p>소셜 로그인에 필요한 ID, Secret, Redirect URL을&nbsp;<code style="color: rgb(36, 41, 46); background-color: rgba(27, 31, 35, 0.05);">.env</code>&nbsp;파일에서 관리 할 것이다. 아래 명령어로 dotenv 라이브러리를 설치 해준다.</p><pre class="ql-syntax" spellcheck="false">
$ npm i dotenv
// app.js

const dotenv = require('dotenv')
dotenv.config()
</pre><p>위와 같이 설정 해주면, 코드에서&nbsp;<code style="color: rgb(36, 41, 46); background-color: rgba(27, 31, 35, 0.05);">process.env['key']</code>&nbsp;로&nbsp;<code style="color: rgb(36, 41, 46); background-color: rgba(27, 31, 35, 0.05);">.env</code>&nbsp;에 있는 값을 접근 할 수 있다.</p><p><br></p><h2>3. session 설정</h2><p>필자는&nbsp;<code style="color: rgb(36, 41, 46); background-color: rgba(27, 31, 35, 0.05);">app.js</code>&nbsp;가 더러워지는 것을 별로 좋아하지 않아, 설정 관련된 코드는 최대한 파일로 분리 시킨다.</p><pre class="ql-syntax" spellcheck="false">// app.js

/**
 * 세션 세팅
 */
const configureSession = require('./config/session')
configureSession(app)

// config/session.js
const session = require('express-session')

module.exports = (app) =&gt; {
  app.use(
    session({
      secret: process.env['SESSION_SECRET'],
      cookie: { maxAge: 60 * 60 * 1000 },
      resave: false,
      saveUninitialized: true,
    })
  )
}
</pre><p>세션 만료 기간은 1시간으로 설정 했으며,&nbsp;<strong>secret</strong>&nbsp;은&nbsp;<code style="color: rgb(36, 41, 46); background-color: rgba(27, 31, 35, 0.05);">.env</code>&nbsp;에서 가져온다.</p><p><strong>resave</strong>&nbsp;는 세션을 언제나 저장할 지 정하는 값입니다. express-session doc 에서는 이 값을 false 로 하는 것을 권장하고 필요에 따라 true로 설정합니다.</p><p><strong>saveUninitialized</strong>&nbsp;는 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장합니다.</p>
    `
}));

// initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

export const RESET_SUCCESS = 'RESET_SUCCESS'

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const WRITE_MODE_CREATE = 'WRITE_MODE_CREATE';
export const WRITE_MODE_MODIFY = 'WRITE_MODE_MODIFY';

export const MODIFY_POST_REQUEST = 'MODIFY_POST_REQUEST'
export const MODIFY_POST_SUCCESS = 'MODIFY_POST_SUCCESS'
export const MODIFY_POST_FAILURE = 'MODIFY_POST_FAILURE'




export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const dummyPost = (data) => ({
    id: shortId.generate(),
    title: data.title,
    date:'2020.06.10',
    description: data.description,
    tags: data.tags,
    content: data.content,
});


const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: '제로초',
    },
});

const reducer = (state = initialState, action ) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case RESET_SUCCESS:
                draft.addPostDone = false;
                draft.modifyPostDone = false;
                draft.detailPost = null;
                break;
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.hasMorePosts = draft.mainPosts.length < 50;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = true;
                draft.loadPostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(dummyPost(action.data));

                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = true;
                draft.addPostError = action.error;
                break;
            case LOAD_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;
            case LOAD_POST_SUCCESS:
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                // console.log(action.data)
                draft.detailPost = draft.mainPosts[draft.mainPosts.findIndex(i => i.id === action.data)];
                break;
            case LOAD_POST_FAILURE:
                draft.loadPostLoading = true;
                draft.loadPostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                // const post = { ...state.mainPosts[postIndex] };
                // post.Comments = [dummyComment(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
                // return {
                //   ...state,
                //   mainPosts,
                //   addCommentLoading: false,
                //   addCommentDone: true,
                // };
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case MODIFY_POST_REQUEST:
                draft.modifyPostLoading = true;
                draft.modifyPostDone = false;
                draft.modifyPostError = null;
                break
            case MODIFY_POST_SUCCESS:
                draft.modifyPostLoading = false;
                draft.modifyPostDone = true;
                draft.mainPosts[draft.mainPosts.findIndex(i => i.id === action.data.id)] = action.data;
                break
            case MODIFY_POST_FAILURE:
                draft.modifyPostLoading = false;
                draft.modifyPostError = action.error;
                break
            case WRITE_MODE_CREATE:
                draft.postWriteMode = 'create';
                break
            case WRITE_MODE_MODIFY:
                draft.postWriteMode = 'modify';
                break
            default:
                return state;
        }
    });

}

export default reducer;