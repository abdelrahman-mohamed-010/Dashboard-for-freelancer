import Modal from "./Modal";
import ShowModal from "./ShowSavedCases";

import { Box, ChevronDown, CirclePlus, CornerUpRight } from "lucide-react";
import { useState, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  ReactFlowProvider,
  Node,
  Edge,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Component A" },
    position: { x: 400, y: 100 },
    draggable: true,
  },
];

const initialEdges: Edge[] = [];

interface UseCase {
  nodes: Node[];
  edges: Edge[];
  usecase: number;
}

const UseCases = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedComponent, setSelectedComponent] = useState<number | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [showCases, setShowCases] = useState(false);
  const flowContainerRef = useRef<HTMLDivElement | null>(null);

  const onConnect = (params: any) =>
    setEdges((eds: Edge<any>[]) => addEdge(params, eds));

  const handleComponentClick = (id: number) => {
    setSelectedComponent((prev) => (prev === id ? null : id));
  };

  const handleCreateNewUseComponent = (letter: string) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      data: { label: `Component ${letter}` },
      position: { x: 500, y: 400 },
      draggable: true,
    };

    setNodes((prevNodes: any) => [...prevNodes, newNode]);
  };

  const handleSaveUseCase = () => {
    setUseCases((prevUseCases) => [
      ...prevUseCases,
      { nodes, edges, usecase: useCases.length + 1 },
    ]);
    setShowModal(true);
  };

  const handleShowUseCase = (id: number) => {
    setNodes(useCases[id - 1].nodes);
    setEdges(useCases[id - 1].edges);
    setShowCases(false);
  };

  const handleCreateNewUseCase = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  return (
    <>
      {showModal && (
        <Modal open={showModal}>
          <ShowModal onClose={() => setShowModal(false)} useCases={useCases} />
        </Modal>
      )}
      <div
        ref={flowContainerRef}
        className="w-full relative border border-light-gray rounded-lg p-2"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(236, 236, 236, 1) 1px, transparent 1px)`,
          backgroundSize: "10px 10px",
        }}
      >
        <div className="absolute top-3 left-3 flex flex-col gap-3 z-10 h-full">
          <div className="flex gap-3">
            <div className=" flex flex-col gap-2">
              <button
                onClick={handleCreateNewUseCase}
                className="font-bold z-30 flex gap-6 items-center bg-white rounded-lg border border-light-gray p-3 shadow-lg"
              >
                Create New Use Case <CirclePlus className="text-tertiary" />
              </button>
              <button className="w-[300px] text-sm text-nowrap flex justify-between items-center bg-white rounded-lg border border-light-gray p-4 shadow-md hover:bg-gray-100 transition">
                <span className="text-tertiary font-semibold mr-4">
                  Use Case : Use Case 1
                </span>
                <CornerUpRight className="font-bold w-5 h-5 text-black" />
                <span className="text-xs font-thin ml-2">5 Connections</span>
              </button>
            </div>

            <div className=" flex flex-col">
              <button
                onClick={() => {
                  setShowCases(!showCases);
                }}
                className="font-bold flex gap-6 items-center bg-white rounded-lg border border-light-gray p-3 shadow-lg"
              >
                Your Use Cases <ChevronDown />
              </button>

              <div className="flex flex-col absolute gap-1 z-30 mt-14">
                {useCases.length > 0 &&
                  showCases === true &&
                  useCases.map((caseItem) => (
                    <span
                      key={caseItem.usecase}
                      className=" w-[186px] p-2 font-semibold bg-white border-2 rounded-lg cursor-pointer"
                      onClick={() => handleShowUseCase(caseItem.usecase)}
                    >
                      Use Case{caseItem.usecase}
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-[307px] overflow-scroll scrollbar-hide text-sm text-nowrap flex flex-col justify-between font-bold bg-white rounded-lg border border-light-gray p-3 shadow-lg h-full mb-6 ">
            {Array.from({ length: 6 }).map((_, index) => {
              const componentId = index + 1;
              return (
                <div
                  key={componentId}
                  className="flex flex-col bg-primary p-2 py-3 gap-3 bg-light-gray rounded-lg r mb-2"
                  onClick={() => handleComponentClick(componentId)}
                >
                  <div className=" flex justify-between items-center font-bold font-poppins">
                    <span>Component {componentId}</span>
                    <ChevronDown className=" w-5 h-5 mr-2" />
                  </div>

                  {selectedComponent === componentId && (
                    <div className="flex flex-col gap-3">
                      <div
                        className="text-sm flex gap-3 items-center cursor-pointer text-gray-700 p-2 bg-white border-light-gray rounded-lg"
                        onClick={() => handleCreateNewUseComponent("A")}
                      >
                        <Box className=" w-4 h-4" /> Component A
                      </div>

                      <div
                        onClick={() => handleCreateNewUseComponent("B")}
                        className="text-sm flex gap-3 items-center cursor-pointer text-gray-700 p-2 bg-white border-light-gray rounded-lg"
                      >
                        <Box className=" w-4 h-4" /> Component B
                      </div>
                      <div
                        onClick={() => handleCreateNewUseComponent("C")}
                        className="text-sm flex gap-3 items-center cursor-pointer text-gray-700 p-2 bg-white border-light-gray rounded-lg"
                      >
                        <Box className=" w-4 h-4" /> Component C
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className=" absolute bottom-7 right-2 z-10">
          <button
            onClick={handleSaveUseCase}
            className="font-semibold ml-[54px] mb-2 flex gap-6 items-center bg-tertiary text-white rounded-lg border border-light-gray p-3 shadow-lg"
          >
            Save Use Case
          </button>
          <button className="font-semibold flex gap-6 items-center bg-second_blue text-white rounded-lg border border-light-gray p-3 shadow-lg">
            add use case to home
          </button>
        </div>

        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            style={{ width: "100%", height: "500px" }}
          >
            <Controls
              style={{
                position: "absolute",
                bottom: "8px",
                left: "317px",
                zIndex: 10,
                padding: "8px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default UseCases;
