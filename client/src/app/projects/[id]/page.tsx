"use client";
import ProjectHeader from "@/app/projects/ProjectHeader";
import ModalNewTask from "@/components/ModalNewTask";
import { useParams } from "next/navigation";
import { useState } from "react";
import Board from "../BoardView";
import List from "../ListView";
import Table from "../TableView";
import Timeline from "../TimelineView";

const Page = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board id={id} setIsModalTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <Table id={id} setIsModalTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Page;
