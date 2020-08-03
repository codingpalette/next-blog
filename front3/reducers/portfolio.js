import produce from 'immer';



export const initialState = {
    addPortfolioLoading: false, // 포트폴리오 등록
    addPortfolioDone: false,
    addPortfolioError: null,

    modifyPortfolioLoading: false, // 포트폴리오 하나 불러오기
    modifyPortfolioDone: false,
    modifyPortfolioError: null,

    loadPortfoliosLoading: false, // 포트폴리오 여러개 불러오기
    loadPortfoliosDone: false,
    loadPortfoliosError: null,

    loadPortfolioLoading: false, // 포트폴리오 하나 불러오기
    loadPortfolioDone: false,
    loadPortfolioError: null,
    detailPortfolio: null,

    portfolios: [],
    prevPortfolio: null,
    nextPortfolio: null,
    hasMorePortfolios: true,

    addImageLoading: false, // 이미지 업로드
    addImageDone: false,
    addImageError: null,
    imagePaths : [],

};





export const ADD_PORTFOLIO_REQUEST = 'ADD_PORTFOLIO_REQUEST';
export const ADD_PORTFOLIO_SUCCESS = 'ADD_PORTFOLIO_SUCCESS';
export const ADD_PORTFOLIO_FAILURE = 'ADD_PORTFOLIO_FAILURE';

export const LOAD_PORTFOLIOS_REQUEST = 'LOAD_PORTFOLIOS_REQUEST';
export const LOAD_PORTFOLIOS_SUCCESS = 'LOAD_PORTFOLIOS_SUCCESS';
export const LOAD_PORTFOLIOS_FAILURE = 'LOAD_PORTFOLIOS_FAILURE';

export const LOAD_PORTFOLIO_REQUEST = 'LOAD_PORTFOLIO_REQUEST';
export const LOAD_PORTFOLIO_SUCCESS = 'LOAD_PORTFOLIO_SUCCESS';
export const LOAD_PORTFOLIO_FAILURE = 'LOAD_PORTFOLIO_FAILURE';

export const MODIFY_PORTFOLIO_REQUEST = 'MODIFY_PORTFOLIO_REQUEST';
export const MODIFY_PORTFOLIO_SUCCESS = 'MODIFY_PORTFOLIO_SUCCESS';
export const MODIFY_PORTFOLIO_FAILURE = 'MODIFY_PORTFOLIO_FAILURE';

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
                draft.portfolios.unshift(action.data);
                break;
            case ADD_PORTFOLIO_FAILURE:
                draft.addPortfolioLoading = true;
                draft.addPortfolioError = action.error;
                break;
            case LOAD_PORTFOLIOS_REQUEST:
                draft.loadPortfoliosLoading = true;
                draft.loadPortfoliosDone = false;
                draft.loadPortfoliosError = null;
                break;
            case LOAD_PORTFOLIOS_SUCCESS:
                draft.loadPortfoliosLoading = false;
                draft.loadPortfoliosDone = true;
                draft.portfolios = action.data
                break;
            case LOAD_PORTFOLIOS_FAILURE:
                draft.loadPortfoliosLoading = true;
                draft.loadPortfoliosError = action.error;
                break;
            case LOAD_PORTFOLIO_REQUEST:
                draft.loadPortfolioLoading = true;
                draft.loadPortfolioDone = false;
                draft.loadPortfolioError = null;
                break;
            case LOAD_PORTFOLIO_SUCCESS:
                draft.loadPortfolioLoading = false;
                draft.loadPortfolioDone = true;
                draft.detailPortfolio = action.data;
                draft.imagePaths = action.data.Images.map(v => v.src);
                break;
            case LOAD_PORTFOLIO_FAILURE:
                draft.loadPortfolioLoading = true;
                draft.loadPortfolioError = action.error;
                break;
            case MODIFY_PORTFOLIO_REQUEST:
                draft.modifyPortfolioLoading = true;
                draft.modifyPortfolioDone = false;
                draft.modifyPortfolioError = null;
                break;
            case MODIFY_PORTFOLIO_SUCCESS:
                draft.modifyPortfolioLoading = false;
                draft.modifyPortfolioDone = true;
                draft.portfolios[draft.portfolios.findIndex(i => i.id === action.data.id)] = action.data;
                break;
            case MODIFY_PORTFOLIO_FAILURE:
                draft.modifyPortfolioLoading = true;
                draft.modifyPortfolioError = action.error;
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
