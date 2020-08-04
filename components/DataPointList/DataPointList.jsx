import { DataPoint } from "./components";
import { ListContainer } from "./DataPointList.styles";

const DataPointList = ({ data }) => {
  if (!data) return null;

  const { dataPoints } = data;

  return (
    <ListContainer>
      {dataPoints.map(item => (
        <DataPoint key={item.id} {...item} />
      ))}
    </ListContainer>
  );
};

export default DataPointList;
