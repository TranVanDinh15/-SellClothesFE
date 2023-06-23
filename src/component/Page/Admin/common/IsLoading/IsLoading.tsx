import React from 'react';
import { BounceLoader } from 'react-spinners';
import './IsLoading.css';
export default function IsLoading() {
    return (
        <div className="IsLoadingWrapper">
            <BounceLoader color="#1677ff" />
        </div>
    );
}
