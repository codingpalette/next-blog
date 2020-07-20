import produce from 'immer';



export const initialState = {
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    removePostLoading: false, // 포스트 지우기
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
    prevPost: null,
    nextPost: null,
    imagePaths: [],
    hasMorePost: false,

    postWriteMode: 'create',

    modifyPostLoading: false,
    modifyPostDone: false,
    modifyPostError: null,

    hasMorePosts: true,
};




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

export const LOAD_TAG_POSTS_REQUEST = 'LOAD_TAG_POSTS_REQUEST'
export const LOAD_TAG_POSTS_SUCCESS = 'LOAD_TAG_POSTS_SUCCESS'
export const LOAD_TAG_POSTS_FAILURE = 'LOAD_TAG_POSTS_FAILURE'

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
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
            case LOAD_TAG_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
            case LOAD_TAG_POSTS_SUCCESS:
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.mainPosts = draft.mainPosts.concat(action.data);
                draft.hasMorePosts = action.data.length === 20;
                break;
            case LOAD_POSTS_FAILURE:
            case LOAD_TAG_POSTS_FAILURE:
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
                draft.mainPosts.unshift(action.data);
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
                draft.detailPost = action.data.now;
                draft.prevPost = action.data.prev;
                draft.nextPost = action.data.next;
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
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
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
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
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