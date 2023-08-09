import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogClientItem() {
    const param = useParams();
    console.log(param);
    return <div>BlogClientItem</div>;
}
