import React, { useMemo, useState } from 'react';
import { Box, useTheme } from "@mui/material";
import Header from '../../components/Header';
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from '../../state/api';

const Monthly = () => {
    const { data, isLoading } = useGetSalesQuery();  // Ensure you're checking if the data is loading
    const theme = useTheme();
  
    // Safely check if data and monthlyData exist
    const formattedData = useMemo(() => {
      if (isLoading || !data || !data.monthlyData || !Array.isArray(data.monthlyData)) {
        return [
          { id: "totalSales", color: theme.palette.secondary.main, data: [] },
          { id: "totalUnits", color: theme.palette.primary.main, data: [] },
        ];
      }
  
      const totalSalesLine = {
        id: "totalSales",
        color: theme.palette.secondary.main,
        data: [],
      };
  
      const totalUnitsLine = {
        id: "totalUnits",
        color: theme.palette.primary.main,
        data: [],
      };
  
      data.monthlyData.forEach(({ month, totalSales, totalUnits }) => {
        totalSalesLine.data.push({ x: month, y: totalSales });
        totalUnitsLine.data.push({ x: month, y: totalUnits });
      });
  
      return [totalSalesLine, totalUnitsLine];
    }, [data, theme, isLoading]);
  
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="Monthly Sales" subtitle="Chart of monthly sales..." />
        <Box height="75vh">
          {/* Display loading text when the data is still being fetched */}
          {isLoading ? (
            <>Loading...</>
          ) : (
            formattedData[0].data.length > 0 || formattedData[1].data.length > 0 ? (
              <ResponsiveLine
                data={formattedData}
                theme={{
                  axis: {
                    domain: {
                      line: {
                        stroke: theme.palette.secondary[200],
                      },
                    },
                    legend: {
                      text: {
                        fill: theme.palette.secondary[200],
                      },
                    },
                    ticks: {
                      line: {
                        stroke: theme.palette.secondary[200],
                        strokeWidth: 1,
                      },
                      text: {
                        fill: theme.palette.secondary[200],
                      },
                    },
                  },
                  legends: {
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                  tooltip: {
                    container: {
                      color: theme.palette.primary.main,
                    },
                  },
                }}
                colors={{ datum: "color" }}
                margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: false,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                // curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 90,
                  legend: "Month",
                  legendOffset: 60,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Total",
                  legendOffset: -50,
                  legendPosition: "middle",
                }}
                enableGridX={false}
                enableGridY={false}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "top-right",
                    direction: "column",
                    justify: false,
                    translateX: 50,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            ) : (
              <>No data available</>
            )
          )}
        </Box>
      </Box>
    );
  };
  
  export default Monthly;
  