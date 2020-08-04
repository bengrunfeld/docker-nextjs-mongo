import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { GET_DATA_POINTS } from "../../../App/App";

import { Point, Editable, Text, DeleteButton } from "./DataPoint.styles";

const SET_DATA_POINT = gql`
  mutation UpdateDataPoint($id: ID!, $value: String!, $timestamp: String!) {
    updateDataPoint(id: $id, value: $value, timestamp: $timestamp) {
      id
      value
      timestamp
    }
  }
`;

const DELETE_DATA_POINT = gql`
  mutation DeleteDataPoint($id: ID!) {
    deleteDataPoint(id: $id) {
      id
    }
  }
`;

const DataPoint = ({ id, value, timestamp }) => {
  const time = new Date(parseInt(timestamp)).toLocaleString();
  const [pointValue, setPointValue] = useState(value);
  const oldValue = useRef(pointValue);

  const updateCache = (
    cache,
    {
      data: {
        deleteDataPoint: { id },
      },
    }
  ) => {
    const { dataPoints } = cache.readQuery({
      query: GET_DATA_POINTS,
    });

    const updatedData = dataPoints.reduce((a, b) => {
      if (b.id === id) return a;

      const newItem = b;
      return [...a, newItem];
    }, []);

    cache.writeQuery({
      query: GET_DATA_POINTS,
      data: { dataPoints: updatedData },
    });
  };

  const [updateDataPoint, { data: updateData }] = useMutation(SET_DATA_POINT);
  const [deleteDataPoint, { data: deleteData }] = useMutation(
    DELETE_DATA_POINT,
    { update: updateCache }
  );

  const onKeyPress = e => {
    setPointValue(e.target.value);
  };

  const saveChange = e => {
    if (oldValue.current === pointValue) return;

    updateDataPoint({
      variables: { id, value: pointValue, timestamp },
    });

    oldValue.current = pointValue;
  };

  const deleteItem = () => {
    deleteDataPoint({ variables: { id } });
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
      <DeleteButton onClick={deleteItem}>✗</DeleteButton>
    </Point>
  );
};

export default DataPoint;
