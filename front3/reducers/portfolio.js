import produce from 'immer';



export const initialState = {
    addPortfolioLoading: false, // 포트폴리오 등록
    addPortfolioDone: false,
    addPortfolioError: null,

    portfolios: [],
    prevPortfolio: null,
    nextPortfolio: null,

    hasMorePortfolios: true,


};





export const ADD_PORTFOLIO_REQUEST = 'ADD_POST_REQUEST';
export const ADD_PORTFOLIO_SUCCESS = 'ADD_PORTFOLIO_SUCCESS';
export const ADD_PORTFOLIO_FAILURE = 'ADD_PORTFOLIO_FAILURE';





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
            default:
                return state;
        }
    });

}

export default reducer;