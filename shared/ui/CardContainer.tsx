import React from "react";

type CardContainerProps = {
    ContentSide: React.ComponentType;
    ImageSide: React.ComponentType;
    styles?: string;
    handleOnClick?:()=>void;
};

export function CardContainerBase({ContentSide,ImageSide, handleOnClick=()=>{} }:CardContainerProps){
    return(
        <div className="h-base px-2" onClick={handleOnClick} >
            <div className="px-2  rounded-xl  flex items-center justify-start overflow-hidden cursor-pointer hover:bg-primary-150" >
                <ImageSide/>
                <ContentSide/>
            </div>
        </div>
    )
}

export function CardContainerNormal({ContentSide,ImageSide, handleOnClick=()=>{} }:CardContainerProps){
    return(
        <div className="h-normal px-2" onClick={handleOnClick} >
            <div className="mx-2.5  rounded-xl  flex items-center justify-start overflow-hidden cursor-pointer hover:bg-primary-150">
                <ImageSide/>
                <ContentSide/>
            </div>
        </div>
    )
}

export function CardContainer({ImageSide, ContentSide,styles, handleOnClick=()=>{} }:CardContainerProps){
    return(
        <div className={`h-normal px-2 ${styles}`} onClick={handleOnClick} >
            <div className="mx-2.5  rounded-xl  flex items-center justify-start overflow-hidden cursor-pointer hover:bg-primary-150">
                <ImageSide/>
                <ContentSide/>
            </div>
        </div>
    )
}