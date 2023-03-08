import PrizeData from "./PrizeData";
import SpinData from "./SpinData";

interface SpinPrizeData {
    given: boolean;
    spin: SpinData;
    prize: PrizeData;
    createdAt: Date;
    updatedAt: Date;
}

export default SpinPrizeData;