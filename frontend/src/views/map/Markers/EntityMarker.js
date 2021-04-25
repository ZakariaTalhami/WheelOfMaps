import React from "react";
import { Marker } from "react-leaflet";
import { useDispatch } from "react-redux";
import { setSelectedEntity } from "../../../actions/NavigationAction";

const EntityMarker = (props) => {
    const dispatch = useDispatch();
    const selectEntity = () => dispatch(setSelectedEntity(props.entity));

    return (
        <Marker
            eventHandlers={{
                click: selectEntity,
            }}
            {...props}
        />
    );
};

export default EntityMarker;
