import { PrizeType } from "../../enum/PrizeType";

interface PrizeModel {
    id?: number;
    title: string;
    description: string;
    url: string;
    prizeType: PrizeType;
};

export default PrizeModel;