export const formatStackBarData = (graphData) => {
  const formattedData = graphData.data.map((chart) => {
    const chartData = chart.data.map((item) => ({
      ...item,
      groupValue: chart.groupValue,
    }));

    return {
      ...chart,
      data: chartData,
    };
  });

  return {
    ...graphData,
    data: formattedData,
  };
};

export const blank = () => {};
