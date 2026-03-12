import { useState, useCallback } from "react";
import TelemetryBar from "@/components/TelemetryBar";
import NavigationRail from "@/components/NavigationRail";
import CommandDisplay from "@/components/CommandDisplay";
import AgentNetwork from "@/components/AgentNetwork";
import SystemStatus from "@/components/SystemStatus";
import { demoScenarios, DemoScenario } from "@/data/demoResponses";

const Index = () => {
  const [currentScenario, setCurrentScenario] = useState<DemoScenario>(demoScenarios[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [displayedResponse, setDisplayedResponse] = useState(demoScenarios[0].response);
  const [activityStep, setActivityStep] = useState("");

  const handleScenarioSelect = useCallback((scenario: DemoScenario) => {
    if (isGenerating) return;

    setDisplayedResponse("");
    setCurrentScenario(scenario);
    setIsGenerating(true);
    setActiveAgents(["MASTER_AGENT"]);
    setActivityStep(scenario.activitySteps[0]);

    // Step through activity phases
    scenario.activitySteps.forEach((step, i) => {
      if (i > 0) {
        setTimeout(() => setActivityStep(step), 600 * i);
      }
    });

    // Activate specialist agents
    setTimeout(() => {
      setActiveAgents(scenario.involvedAgents);
    }, 600);

    // Show response
    setTimeout(() => {
      setDisplayedResponse(scenario.response);
      setIsGenerating(false);
      setActiveAgents([]);
      setActivityStep("");
    }, 600 * scenario.activitySteps.length + 400);
  }, [isGenerating]);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <div className="grid grid-cols-[12%_1fr] grid-rows-[10%_1fr_auto_auto] h-full">
        <TelemetryBar isGenerating={isGenerating} />
        <NavigationRail />
        <CommandDisplay
          prompt={currentScenario.prompt}
          response={displayedResponse}
          isGenerating={isGenerating}
          activityStep={activityStep}
        />
        <AgentNetwork activeAgents={activeAgents} />
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
