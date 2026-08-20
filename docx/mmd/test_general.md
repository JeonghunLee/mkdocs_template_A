```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -- Yes --> C[Success]
    B -- No --> D[Debug]
    D --> B
    
```