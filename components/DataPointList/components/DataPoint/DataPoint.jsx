import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { GET_DATA_POINTS } from "../../../App/App";

import { Point, Editable, Text } from "./DataPoint.styles";

const SET_DATA_POINT = gql`
  mutation UpdateDataPoint($id: String!, $value: String!) {
    updateDataPoint(id: $id, value: $value) {
      id
      value
      timestamp
    }
  }
`;

const DataPoint = ({ id, value, timestamp }) => {
  const time = new Date(parseInt(timestamp)).toLocaleString();
  const [pointValue, setPointValue] = useState(value);
  const oldValue = useRef(pointValue);

  const updateCache = (cache, { data: { updateDataPoint } }) => {
    const existingDataPoint = cache.readQuery({
      query: GET_DATA_POINTS,
    });

    cache.writeQuery({
      query: GET_DATA_POINTS,
      data: { dataPoints: updateDataPoint },
    });
  };

  const [updateDataPoint] = useMutation(SET_DATA_POINT, {
    update: updateCache,
  });

  const onKeyPress = e => {
    setPointValue(e.target.value);
  };

  const saveChange = e => {
    if (oldValue.current !== pointValue) return;

    // Save to db
  };

  return (
    <Point>
      <Text>Time: {time}</Text>
      <Editable
        type="number"
        value={pointValue}
        onChange={onKeyPress}
        onBlur={saveChange}
      />
    </Point>
  );
};

export default DataPoint;
