import { SpinStatusType } from "../../enum/SpinStatusType";
import { UserData } from "./UserData";

interface SpinData {
    hash: string;
    status: SpinStatusType;
    user: UserData;
};

export default SpinData;