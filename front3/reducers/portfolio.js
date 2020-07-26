import produce from 'immer';



export const initialState = {
    addPortfolioLoading: false, // 포트폴리오 등록
    addPortfolioDone: false,
    addPortfolioError: null,

    portfolios: [],
    prevPortfolio: null,
    nextPortfolio: null,
    hasMorePortfolios: true,

    addImageLoading: false, // 이미지 업로드
    addImageDone: false,
    addImageError: null,
    imagePaths : [],

};





export const ADD_PORTFOLIO_REQUEST = 'ADD_POST_REQUEST';
export const ADD_PORTFOLIO_SUCCESS = 'ADD_PORTFOLIO_SUCCESS';
export const ADD_PORTFOLIO_FAILURE = 'ADD_PORTFOLIO_FAILURE';

export const PORTFOLIO_IMAGE_UPLOAD_REQUEST = 'PORTFOLIO_IMAGE_UPLOAD_REQUEST';
export const PORTFOLIO_IMAGE_UPLOAD_SUCCESS = 'PORTFOLIO_IMAGE_UPLOAD_SUCCESS';
export const PORTFOLIO_IMAGE_UPLOAD_FAILURE = 'PORTFOLIO_IMAGE_UPLOAD_FAILURE';

export const PORTFOLIO_IMAGE_REMOVE_SUCCESS = 'PORTFOLIO_IMAGE_REMOVE_SUCCESS';



const reducer = (state = initialState, action ) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_PORTFOLIO_REQUEST:
                draft.addPortfolioLoading = true;
                draft.addPortfolioDone = false;
                draft.addPortfolioError = null;
                break;
            case ADD_PORTFOLIO_SUCCESS:
                draft.addPortfolioLoading = false;
                draft.addPortfolioDone = true;
                draft.mainPosts.unshift(action.data);
                break;
            case ADD_PORTFOLIO_FAILURE:
                draft.addPortfolioLoading = true;
                draft.addPortfolioError = action.error;
                break;
            case PORTFOLIO_IMAGE_UPLOAD_REQUEST:
                draft.addImageLoading = true;
                draft.addImageDone = false;
                draft.addImageError = null;
                break;
            case PORTFOLIO_IMAGE_UPLOAD_SUCCESS:
                draft.addImageLoading = false;
                draft.addImageDone = true;
                draft.imagePaths = [...draft.imagePaths, ...action.data];
                // draft.imagePaths.unshift(action.data);
                break;
            case PORTFOLIO_IMAGE_UPLOAD_FAILURE:
                draft.addImageLoading = true;
                draft.addImageError = action.error;
                break;
            case PORTFOLIO_IMAGE_REMOVE_SUCCESS:
                draft.imagePaths = draft.imagePaths.filter(( v, i ) => i !== action.data)
                break;
            default:
                return state;
        }
    });

}

export default reducer;