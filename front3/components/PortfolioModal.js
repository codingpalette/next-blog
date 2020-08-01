import React, { useCallback , useEffect } from 'react';
import styled from '@emotion/styled';

import CloseIcon from '@material-ui/icons/Close';

const Modal = styled.div`
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
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
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 5px 32px 0 rgba(15,15,15,.15);
        border: 1px solid #c7c7c7;
    }
    & .content .close_box{
        text-align: right;
    }
    & .content .close_box button:hover{
        color: #536DFE;
    }
`;

const PortfolioModal = ({ modalOpen, setModalOpen, modalItem }) => {

    useEffect(() => {
        console.log('aaaa')
    }, [])

    const onClickModalClose = useCallback(() => {
        setModalOpen(false)
    }, [setModalOpen])



    return(
        <>
            {modalOpen ? (
                <Modal>
                    <div className="content">
                        <div className="close_box">
                            <button onClick={onClickModalClose}>
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="content_body">
                            <h4>{modalItem.title}</h4>
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