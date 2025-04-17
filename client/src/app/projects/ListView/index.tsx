import TaskCard from "@/components/TaskCard";
import { Task, useGetTasksQuery } from "@/state/api";
import Header from "../../../components/Header";

type Props = { id: string; setIsModalTaskOpen: (isOpen: boolean) => void };
const ListView = ({ id, setIsModalTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An errorr occurred while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          isSmallText
          buttonComponent={
            <button
              className="bg-blue-primary flex items-center rounded px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalTaskOpen(true)}
            >
              Add Task
            </button>
          }
        />
      </div>
      <div className="lg:grid-cols-3.lg:gap-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default ListView;
