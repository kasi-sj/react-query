import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <TodoList />
      {/* </Suspense> */}
    </main>
  );
}
