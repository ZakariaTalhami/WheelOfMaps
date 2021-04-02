import React, { useEffect } from "react";
import MarkerOverlayConfig from "./MarkerOverlayConfig";
import { useSelector } from "react-redux";
import _ from "lodash";
import ObjectUtils from "../../../utils/ObjectUtils";

const MarkerLayerGroup = () => {
    const state = useSelector((state) => state);

    useEffect(() => {});

    const markerList = _.map(Object.keys(MarkerOverlayConfig), (markerType) => {
        const markerConfig = MarkerOverlayConfig[markerType];
        const MarkerComponent = markerConfig["component"];
        const markerData = ObjectUtils.evaluateObjectPath(
            state,
            markerConfig["state"]
        );

        // TODO: skip marker depending on selected chapter

        return _.map(markerData, (data) => (
            <MarkerComponent key={data._id} entity={data} />
        ));
    });

    return <>{markerList}</>;
};

export default MarkerLayerGroup;
