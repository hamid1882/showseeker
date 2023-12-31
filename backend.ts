import { User } from "./app/types";


addEventListener('fetch', (event) => {
    // @ts-ignore
    event.respondWith(handleRequest(event.request));
  });
  
  //   @ts-ignore
  async function handleRequest(request: Request): Promise<Response> {
    const data: User[] = [
        {
            email: "user1@example.com",
            password: "password1",
        },
        {
            email: "user2@example.com",
            password: "password2",
        },
        {
            email: "user3@example.com",
            password: "password3",
        }
    ];
  
    const jsonResponse: string = JSON.stringify(data);
  
    return new Response(jsonResponse, {
      headers: { 'Content-Type': 'application/json' },
    });
  }