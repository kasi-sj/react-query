'use server'
import { revalidatePath } from "next/cache";

const Todos = [
    { id: 1, title: 'Learn TypeScript', completed: true },
    { id: 2, title: 'Try Angular', completed: false },
    { id: 3, title: 'Build a website', completed: false },
    { id: 4, title: 'Build a mobile app', completed: false },
];

const fetchTodos = async () => {
    console.log("fetching")
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Todos;
}

const addTodo = async (title: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const todo = { id: Todos.length + 1, title, completed: false };
    Todos.push(todo);
    try{
        revalidatePath("/");
        console.log("validated")
    }catch(e){
        console.log("error")
    }
    return Todos;
}

const markTodo = async (id: number, completed: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const todo = Todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = completed;
    }
    // revalidatePath("/");
    return todo;
}

export { fetchTodos, addTodo, markTodo };