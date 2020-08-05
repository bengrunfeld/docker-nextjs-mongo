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

  const updateCacheDelete = (
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

  const updateCacheCreate = (
    cache,
    {
      data: {
        updateDataPoint: { id, timestamp, value },
      },
    }
  ) => {
    const { dataPoints } = cache.readQuery({
      query: GET_DATA_POINTS,
    });

    const updatedData = [
      ...dataPoints,
      { id, timestamp, value, __typename: "DataPoint" },
    ];

    cache.writeQuery({
      query: GET_DATA_POINTS,
      data: { dataPoints: updatedData },
    });
  };

  const [createDataPoint, { data: createData }] = useMutation(SET_DATA_POINT, {
    update: updateCacheCreate,
  });

  const [updateDataPoint, { data: updateData }] = useMutation(SET_DATA_POINT);

  const [deleteDataPoint, { data: deleteData }] = useMutation(
    DELETE_DATA_POINT,
    { update: updateCacheDelete }
  );

  const onKeyPress = e => {
    setPointValue(e.target.value);
  };

  const saveChange = e => {
    if (oldValue.current === pointValue) return;
    if (pointValue === "") return;

    if (oldValue.current === "") {
      createDataPoint({
        variables: { id, value: pointValue, timestamp: timestamp.toString() },
      });
      return;
    }

    console.log(timestamp, typeof timestamp);

    updateDataPoint({
      variables: { id, value: pointValue, timestamp: timestamp.toString() },
    });

    oldValue.current = pointValue;
  };

  const deleteItem = () => {
    if (pointValue === "") return;

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
