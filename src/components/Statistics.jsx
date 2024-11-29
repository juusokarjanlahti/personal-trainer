import React, { useContext, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DataContext } from "../context/DataProvider";
import { groupBy, sumBy } from "lodash";

function Statistics() {
  const { trainings } = useContext(DataContext);

  // Group trainings by activity and sum the duration for each activity
  const activityData = useMemo(() => {
    const grouped = groupBy(trainings, "activity");
    return Object.keys(grouped).map((activity) => ({
      activity,
      duration: sumBy(grouped[activity], "duration"),
    }));
  }, [trainings]);

  return (
    <div>
      <h1>Training Statistics</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Statistics;