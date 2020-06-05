import React from "react";
import {Spinner} from "./Spinner";

export const LoadingText = ({title, value, label}) => (
    <>
        {title}: <span className="text-info">{value || <Spinner/>} {label}</span>
    </>
)