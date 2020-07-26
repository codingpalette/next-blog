import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";

import styled from '@emotion/styled';

import Button from "@material-ui/core/Button";
import {PORTFOLIO_IMAGE_UPLOAD_REQUEST} from "../reducers/portfolio";

const UploadBox = styled.div`
    margin-top: 1rem;
    & .title{
        display: block;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }
`;

const ImageBox = styled.div`


`;

const PortfolioImageUpload = () => {
    const dispatch = useDispatch();
    const { addImageLoading } = useSelector((state) => state.portfolio)

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

    return(

        <div>
            <UploadBox>
                <strong className="title">이미지 업로드</strong>
                <input type="file" name="image" id="image_upload" multiple hidden onChange={onChangeImages}  />
                <label htmlFor="image_upload">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button>
                </label>
            </UploadBox>

            <ImageBox>
                <ul>
                    <li>이미지</li>
                </ul>
            </ImageBox>
        </div>

    )
};


export default PortfolioImageUpload;