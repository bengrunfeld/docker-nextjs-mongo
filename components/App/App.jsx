import { useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { DataPointList } from "../";

import { PageLayout, Title, Message } from "./App.styles";

export const GET_DATA_POINTS = gql`
  query DataPoints {
    dataPoints {
      id
      value
      timestamp
    }
  }
`;

const App = () => {
  const [getDataPoints, { called, loading, error, data }] = useLazyQuery(
    GET_DATA_POINTS
  );

  useEffect(() => {
    getDataPoints();
  }, []);

  if ((called && loading) || !data) {
    return <PageLayout />;
  }

  if (error) {
    console.log(error);
    return (
      <PageLayout>
        <Message type="error">There was an error. Check the console.</Message>
      </PageLayout>
    );
  }

  console.log("==> D:", data);

  return (
    <PageLayout>
      <Title>Docker Next App</Title>
      <DataPointList data={data} />
    </PageLayout>
  );
};

export default App;
