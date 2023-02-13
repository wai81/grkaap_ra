import { IResourceComponentsProps, GetListResponse } from "@pankod/refine-core";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

export const Booking_transportList: React.FC<IResourceComponentsProps<GetListResponse<{}>>> = () => {
    return <MuiInferencer />;
};
