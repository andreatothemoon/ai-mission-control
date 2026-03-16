import MissionHeader from "./MissionHeader";
import StrategicVectorDiagram from "./StrategicVectorDiagram";
import OperatingModeIndicator from "./OperatingModeIndicator";

export default function SystemOverview() {
  return (
    <div className="col-start-2 row-start-2 row-span-2 flex flex-col overflow-hidden">
      <MissionHeader />
      <StrategicVectorDiagram />
      <OperatingModeIndicator />
    </div>
  );
}
