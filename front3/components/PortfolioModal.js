import React, { useCallback , useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {backUrl} from "../config/config";


import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const Modal = styled.div`
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    box-sizing: border-box;
    & .back{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
    & .content{
        background-color: #fff;
        position: relative;
        z-index: 100;
        max-width: 1400px;
        width: 100%;
        height: 100%;
        max-height: 800px;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 5px 32px 0 rgba(15,15,15,.15);
        border: 1px solid #c7c7c7;
    }
    & .content .close_box{
        text-align: right;
        margin-bottom: 0.5rem;
    }
    & .content .close_box button:hover{
        color: #536DFE;
    }
    & .content_body{
        width: 100%;
        max-height: calc(100% - 2.5rem);
        overflow-y: auto;
    }
    & .content_body img{
        display: block;
        max-width: 100%;
        height: auto;
        margin: 0 auto;
    }
    & .link_btn{
        margin-top: 1rem;
        text-align: center;
    }
`;

const PortfolioModal = ({ modalOpen, setModalOpen, modalItem }) => {
    const modalRef = useRef()


    const opacityOn = (target, duration = 500) => {
        target.style.removeProperty("display");
        target.style.opacity = 0;
        target.style.display = 'flex';
        target.style.transitionProperty = "opacity";
        target.style.transitionDuration = duration + "ms";
        window.setTimeout(() => {
            target.style.opacity = 1;
        }, 100)
        window.setTimeout(() => {
            target.style.removeProperty("opacity");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
        }, duration)
    }

    useEffect(() => {
        if (modalOpen) {
            opacityOn(modalRef.current, 300)
        }
    }, [modalOpen])

    const onClickModalClose = useCallback(() => {
        setModalOpen(false)
    }, [setModalOpen])



    return(
        <>
            {modalOpen ? (
                <Modal ref={modalRef}>
                    <div className="content">
                        <div className="close_box">
                            <button onClick={onClickModalClose}>
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="content_body">
                            <img src={`${modalItem.Images[1].src}`} alt=""/>
                            <div className="link_btn">
                                <Button variant="outlined" color="primary" href={modalItem.link} target="_blank">
                                    바로가기
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="back" onClick={onClickModalClose} />
                </Modal>
            ) : (
                <></>
            )}

        </>
    )
}

export default PortfolioModal;