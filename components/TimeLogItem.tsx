type Props = {
  taskName: string;
  startTime: string;
  endTime: string;
};

export default function TimeLogItem({ taskName, startTime, endTime }: Props) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMs = end.getTime() - start.getTime();
  const durationMin = Math.round(durationMs / 60000);

  return (
    <div className="border p-2 rounded shadow">
      <p className="font-semibold">{taskName}</p>
      <p className="text-sm text-gray-600">
        Duration: {durationMin} minutes
      </p>
      <p className="text-xs text-gray-500">
        {new Date(startTime).toLocaleTimeString()} - {new Date(endTime).toLocaleTimeString()}
      </p>
    </div>
  );
}
