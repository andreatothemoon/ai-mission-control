import { useState, useCallback } from "react";
import TelemetryBar from "@/components/TelemetryBar";
import NavigationRail from "@/components/NavigationRail";
import CommandDisplay from "@/components/CommandDisplay";
import AgentNetwork from "@/components/AgentNetwork";
import MissionTimeline from "@/components/MissionTimeline";
import SystemStatus from "@/components/SystemStatus";
import { demoScenarios, DemoScenario } from "@/data/demoResponses";
import { scenarioRoutes } from "@/data/scenarioData";

const Index = () => {
  const [currentScenario, setCurrentScenario] = useState<DemoScenario>(demoScenarios[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [activeKnowledge, setActiveKnowledge] = useState<string[]>([]);
  const [displayedResponse, setDisplayedResponse] = useState(demoScenarios[0].response);
  const [activityStep, setActivityStep] = useState("");
  const [routeLabel, setRouteLabel] = useState("");
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [activePhase, setActivePhase] = useState(-1);

  const handleScenarioSelect = useCallback((scenario: DemoScenario) => {
    if (isGenerating) return;

    const route = scenarioRoutes[scenario.id];

    setDisplayedResponse("");
    setCurrentScenario(scenario);
    setIsGenerating(true);
    setActiveAgents(["MASTER_AGENT"]);
    setActiveKnowledge([]);
    setActivityStep(scenario.activitySteps[0]);
    setCompletedPhases([]);
    setActivePhase(-1);

    // Build route label
    const agentNames = route.agentPath.map((id) =>
      id.replace(/_AGENT$/, "").replace(/_/g, " ")
    );
    if (route.knowledgePath.length > 0) {
      agentNames.push(route.knowledgePath[0].replace(/_/g, " "));
    }
    setRouteLabel(agentNames.join(" → "));

    // Step through activity phases
    scenario.activitySteps.forEach((step, i) => {
      if (i > 0) {
        setTimeout(() => setActivityStep(step), 600 * i);
      }
    });

    // Activate specialist agents after master
    setTimeout(() => {
      setActiveAgents(route.agentPath);
    }, 500);

    // Activate knowledge nodes
    setTimeout(() => {
      setActiveKnowledge(route.knowledgePath);
    }, 900);

    // Animate timeline phases
    route.timelinePhases.forEach((phaseIdx, i) => {
      setTimeout(() => {
        setCompletedPhases((prev) => [...prev, phaseIdx]);
        setActivePhase(phaseIdx);
      }, 400 + i * 400);
    });

    // Show response and reset active states
    const totalDuration = 600 * scenario.activitySteps.length + 400;
    setTimeout(() => {
      setDisplayedResponse(scenario.response);
      setIsGenerating(false);
      setActiveAgents([]);
      setActiveKnowledge([]);
      setActivityStep("");
      // Keep timeline and route label visible after completion
    }, totalDuration);
  }, [isGenerating]);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <div className="grid grid-cols-[12%_1fr] grid-rows-[10%_1fr_auto_auto_auto] h-full">
        <TelemetryBar isGenerating={isGenerating} />
        <NavigationRail />
        <CommandDisplay
          prompt={currentScenario.prompt}
          response={displayedResponse}
          isGenerating={isGenerating}
          activityStep={activityStep}
        />
        <AgentNetwork
          activeAgents={activeAgents}
          activeKnowledge={activeKnowledge}
          routeLabel={routeLabel}
        />
        <MissionTimeline
          completedPhases={completedPhases}
          activePhase={activePhase}
        />
        <SystemStatus
          scenarios={demoScenarios}
          onSelectScenario={handleScenarioSelect}
          isGenerating={isGenerating}
        />
      </div>
    </main>
  );
};

export default Index;
