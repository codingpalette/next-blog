import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { backUrl } from '../config/config';

import styled from '@emotion/styled';

import Button from "@material-ui/core/Button";
import {PORTFOLIO_IMAGE_REMOVE_SUCCESS, PORTFOLIO_IMAGE_UPLOAD_REQUEST} from "../reducers/portfolio";
import CircularProgress from "@material-ui/core/CircularProgress";

const UploadBox = styled.div`
    margin-top: 1rem;
    & .title{
        display: block;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }
`;

const ImageBox = styled.div`
    padding: 1rem;
    box-sizing: border-box;
    & img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    & .image_list_box{
        display: flex;
        align-items: center;
    }
    & .image_list_box li{
        width: 33.33%;
    }
`;

const CircularProgressTag = styled(CircularProgress)`
    color: #fff;
`

const PortfolioImageUpload = () => {
    const dispatch = useDispatch();
    const { addImageLoading, imagePaths } = useSelector((state) => state.portfolio)

    const onChangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f)
        });
        dispatch({
            type: PORTFOLIO_IMAGE_UPLOAD_REQUEST,
            data: imageFormData
        })
    }, [])

    const onClickRemoveImage = (index) => () => {
        dispatch({
            type: PORTFOLIO_IMAGE_REMOVE_SUCCESS,
            data: index
        })
    }

    return(

        <div>
            <UploadBox>
                <strong className="title">이미지 업로드</strong>
                <input type="file" name="image" id="image_upload" accept="image/*" multiple hidden onChange={onChangeImages}  />
                <label htmlFor="image_upload">
                    <Button variant="contained" color="primary" component="span">
                        {addImageLoading ? <CircularProgressTag size={20}/> : 'Upload'}
                    </Button>
                </label>
            </UploadBox>

            <ImageBox>
                {imagePaths.length > 0 && (
                    <ul className="image_list_box">
                        {imagePaths.map((v, i) => (
                            <li key={i} onClick={onClickRemoveImage(i)}>
                                <img src={`${backUrl}/${v}`} alt=""/>
                            </li>
                        ))}
                    </ul>
                )}
            </ImageBox>
        </div>

    )
};


export default PortfolioImageUpload;