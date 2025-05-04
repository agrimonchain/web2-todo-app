import { NextResponse } from "next/server";

const todos:{id:number, title:string} [] = [];


export function GET(){
    return NextResponse.json(todos);
}

export async function POST(req: Request){

    const body = await req.json();
    const {title} = body;

    if(!title){
        return NextResponse.json({
            message: "Title Required",
            status: 401
        })
    }

    const id = Date.now()
    const addTodos = {id, title};
    todos.push(addTodos);

    return NextResponse.json({
        message: "Todo Added",
        addTodos
    })
}

// PUT request: Updates an existing item in the array.
export async function PUT(req: Request){

    const body = await req.json();
    const {id, title} = body;

    const foundTodo = todos.find((todo) => todo.id === id)
    if(foundTodo){
        if(title){
            foundTodo.title = title;
        }
        return NextResponse.json({
            message: "Todo updated successfully",
            updatedTodo: foundTodo,
        });
    }
    return NextResponse.json({
        message: "Todo updated successfully"
    })
}

// DELETE request: Removes an item from the array.
export async function DELETE(req: Request){

    const body = await req.json();
    const {id} = body;

    const findTodo = todos.findIndex((todo) => todo.id === id);
    if(findTodo !== -1){
        todos.splice(findTodo, 1);
    }
    return NextResponse.json({
        message: "Todo deleted successfully"
    })
}