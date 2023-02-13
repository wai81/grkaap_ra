import { IResourceComponentsProps, GetListResponse } from "@pankod/refine-core";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

export const TransportList: React.FC<IResourceComponentsProps<GetListResponse<{}>>> = () => {
    return <MuiInferencer />;
};
