import { useState, useCallback } from "react";
import TelemetryBar from "@/components/TelemetryBar";
import NavigationRail, { ActiveView } from "@/components/NavigationRail";
import CommandDisplay from "@/components/CommandDisplay";
import AgentNetwork from "@/components/AgentNetwork";
import MissionTimeline from "@/components/MissionTimeline";
import SystemStatus from "@/components/SystemStatus";
import SystemOverview from "@/components/SystemOverview";
import EngineeringAccel from "@/components/EngineeringAccel";
import GovernanceView from "@/components/GovernanceView";
import { demoScenarios, DemoScenario } from "@/data/demoResponses";
import { scenarioRoutes } from "@/data/scenarioData";

const Index = () => {
  const [activeView, setActiveView] = useState<ActiveView>("network");
  const [currentScenario, setCurrentScenario] = useState<DemoScenario>(demoScenarios[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [displayedResponse, setDisplayedResponse] = useState(demoScenarios[0].response);
  const [activityStep, setActivityStep] = useState("");
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [activePhase, setActivePhase] = useState(-1);

  const handleScenarioSelect = useCallback((scenario: DemoScenario) => {
    if (isGenerating) return;

    const route = scenarioRoutes[scenario.id];

    setDisplayedResponse("");
    setCurrentScenario(scenario);
    setIsGenerating(true);
    setActiveAgents(["MASTER_AGENT"]);
    setActivityStep(scenario.activitySteps[0]);
    setCompletedPhases([]);
    setActivePhase(-1);

    scenario.activitySteps.forEach((step, i) => {
      if (i > 0) {
        setTimeout(() => setActivityStep(step), 600 * i);
      }
    });

    setTimeout(() => {
      setActiveAgents(scenario.involvedAgents);
    }, 600);

    route.timelinePhases.forEach((phaseIdx, i) => {
      setTimeout(() => {
        setCompletedPhases((prev) => [...prev, phaseIdx]);
        setActivePhase(phaseIdx);
      }, 400 + i * 400);
    });

    setTimeout(() => {
      setDisplayedResponse(scenario.response);
      setIsGenerating(false);
      setActiveAgents([]);
      setActivityStep("");
    }, 600 * scenario.activitySteps.length + 400);
  }, [isGenerating]);

  return (
    <main className="h-screen w-screen overflow-hidden grid grid-cols-[12%_1fr] grid-rows-[10%_auto_1fr_auto]">
      <TelemetryBar isGenerating={isGenerating} />
      <NavigationRail activeView={activeView} onViewChange={setActiveView} />

      {activeView === "network" ? (
        <>
          <MissionTimeline
            completedPhases={completedPhases}
            activePhase={activePhase}
          />

          <div className="col-start-2 row-start-3 grid grid-cols-2 gap-0 min-h-0">
            <CommandDisplay
              prompt={currentScenario.prompt}
              response={displayedResponse}
              isGenerating={isGenerating}
              activityStep={activityStep}
            />
            <AgentNetwork activeAgents={activeAgents} />
          </div>

          <SystemStatus
            scenarios={demoScenarios}
            onSelectScenario={handleScenarioSelect}
            isGenerating={isGenerating}
          />
        </>
      ) : activeView === "engineering" ? (
        <EngineeringAccel />
      ) : activeView === "governance" ? (
        <GovernanceView />
      ) : (
        <SystemOverview />
      )}
    </main>
  );
};

export default Index;
