import React, { ReactElement } from 'react';
import './Content.css';
interface propsContent {
    title: String;
    children: React.ReactNode;
}
export default function Content({ title, children }: propsContent) {
    return (
        <div className="CommonContent">
            <div className="CommonContent__title">
                <span>{title}</span>
            </div>
            <div className="CommonContent__middle">
                <div className="CommonContent__middle__children">{children}</div>
            </div>
        </div>
    );
}
