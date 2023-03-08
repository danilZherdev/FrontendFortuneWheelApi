
export const editModel = (e: React.ChangeEvent<HTMLElement>, stateModel: any): any => {
    console.log("Change event ", e);
    var resultObject = Object.create(stateModel);
    var target: any;
    var isSelect = false;
    if(e.target instanceof HTMLInputElement) {
        target = e.target as HTMLInputElement;
    }
    if(e.target instanceof HTMLSelectElement) {
        target = e.target as HTMLSelectElement;
    }

    const key = target.name;
    const value = target.value;
    //has state model key with caption equals name 
    if (!Object.keys(stateModel).includes(key)) {
        return;
    }
    //
    if(isSelect) {
        resultObject = {
            ...stateModel,
            [key]: Number(value)
        };
        return;
    }

    resultObject = {
        ...stateModel,
        [key]: value
    };

    return resultObject;
}