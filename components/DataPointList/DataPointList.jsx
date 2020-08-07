import { DataPoint } from "./components";
import { ListContainer } from "./DataPointList.styles";

const DataPointList = ({ data }) => {
  if (!data) return null;

  const { dataPoints } = data;

  const dataNotEmpty = dataPoints.length !== 0;

  const lastId = dataNotEmpty
    ? parseInt(dataPoints[dataPoints.length - 1].id)
    : 0;

  return (
    <ListContainer>
      {dataNotEmpty &&
        dataPoints.map(item => <DataPoint key={item.id} {...item} />)}
      <DataPoint
        key={lastId + 1}
        id={lastId + 1}
        value=""
        timestamp={Date.now()}
      />
    </ListContainer>
  );
};

export default DataPointList;
