
export interface IBaseAction {
    type: string;
    payload?: any;
}

export interface IBaseErrorAction extends IBaseAction {
    payload: {
        error: Error | string;
    }
}