import React from "react";
import {TSort} from "../App/type";

export type TTaskFooter = {
    active: number
    clearCompleted: () => void,
    sortList: (e: React.MouseEvent<HTMLDivElement>) => void,
    activeType: TSort
}
