import React from 'react';
import { Box, useTheme } from "@mui/material";
import { useGetGeographyQuery } from '../../state/api';
import Header from '../../components/Header';
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from '../../state/geodata';

const Geography = () => {
    const theme = useTheme();
    const { data } = useGetGeographyQuery();

    // Define colors based on the theme mode
    const choroplethColors = theme.palette.mode === 'dark' 
        ? {
            unknownColor: "#666666",
            borderColor: "#ffffff",
            tooltipColor: theme.palette.primary.main,
            textColor: theme.palette.secondary[200],
          }
        : {
            unknownColor: "#e0e0e0",
            borderColor: "#333333",
            tooltipColor: theme.palette.primary.dark,
            textColor: theme.palette.secondary[800],
          };

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="GEOGRAPHY" subtitle="Find where your users are located." />
            <Box
                mt="40px"
                height="75vh"
                border={`1px solid ${theme.palette.secondary[200]}`}
                borderRadius="4px"
            >
                {data ? (
                    <ResponsiveChoropleth
                        data={data}
                        theme={{
                            axis: {
                                domain: {
                                    line: {
                                        stroke: choroplethColors.textColor,
                                    },
                                },
                                legend: {
                                    text: {
                                        fill: choroplethColors.textColor,
                                    },
                                },
                                ticks: {
                                    line: {
                                        stroke: choroplethColors.textColor,
                                        strokeWidth: 1,
                                    },
                                    text: {
                                        fill: choroplethColors.textColor,
                                    },
                                },
                            },
                            legends: {
                                text: {
                                    fill: choroplethColors.textColor,
                                },
                            },
                            tooltip: {
                                container: {
                                    color: choroplethColors.tooltipColor,
                                },
                            },
                        }}
                        features={geoData.features}
                        margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
                        domain={[0, 60]}
                        unknownColor={choroplethColors.unknownColor}
                        label="properties.name"
                        valueFormat=".2s"
                        projectionScale={150}
                        projectionTranslation={[0.45, 0.6]}
                        projectionRotation={[0, 0, 0]}
                        borderWidth={1.3}
                        borderColor={choroplethColors.borderColor}
                        legends={[
                            {
                                anchor: "bottom-right",
                                direction: "column",
                                justify: true,
                                translateX: 0,
                                translateY: -125,
                                itemsSpacing: 0,
                                itemWidth: 94,
                                itemHeight: 18,
                                itemDirection: "left-to-right",
                                itemTextColor: choroplethColors.textColor,
                                itemOpacity: 0.85,
                                symbolSize: 18,
                                effects: [
                                    {
                                        on: "hover",
                                        style: {
                                            itemTextColor: theme.palette.background.alt,
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                ) : (
                    <>Loading...</>
                )}
            </Box>
        </Box>
    );
};

export default Geography;
