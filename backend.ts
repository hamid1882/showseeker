addEventListener('fetch', (event) => {
    // @ts-ignore
    event.respondWith(handleRequest(event.request));
  });
  
//   @ts-ignore
  async function handleRequest(request: Request): Promise<Response> {
    const data = {
      message: 'Hello, World!',
      timestamp: new Date().toISOString(),
    };
  
    const jsonResponse = JSON.stringify(data);
  
    return new Response(jsonResponse, {
      headers: { 'Content-Type': 'application/json' },
    });
  }