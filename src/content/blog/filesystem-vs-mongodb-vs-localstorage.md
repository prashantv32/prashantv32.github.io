---
title: "File System vs MongoDB vs LocalStorage: Where Should You Store Data?"
description: "A practical comparison of Node.js file system storage, MongoDB, and browser LocalStorage, with examples, limitations, and use cases."
date: 2026-10-24
starred: false
draft: true
---
# step-1 :
lets create a small todo example that we will use to describe all 3 ways to store
Imagina a user adds these task
```
[
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build a REST API", completed: true }
]
```
where should these tasks be stored:
local storage : on user's browser
file system : in a file on nodejs server , such as tasks.json
mongodb : in a db collection on a mongodb server

* all three can store data but they differ in accessibility ,querying,concurrency and how they behave when app is deployed.

## 2.File System
###  Storing Data Using the Node.js File System

 Node.js provides a built-in `fs` module that allows us to read, write, update, and delete files.

For this experiment, I created a simple TODO storage system using a JSON file as the data store.

### Project structure

```text
todo-storage/
├── index.js
└── tasks.json
```

The `tasks.json` file contains an array of tasks:

```json
[
  {
    "id": 1,
    "title": "Task-1",
    "completed": false
  },
  {
    "id": 2,
    "title": "Task-2",
    "completed": false
  }
]
```

### Reading and writing data

Using Node.js, I read the JSON file, parsed its contents into a JavaScript array, added a new task, and wrote the updated array back to the file.

```javascript
const fs = require("node:fs/promises");

async function main() {
  const data = await fs.readFile("tasks.json", "utf8");
  const tasks = JSON.parse(data);

  tasks.push({
    id: 3,
    title: "Understand file system storage",
    completed: false,
  });

  await fs.writeFile(
    "tasks.json",
    JSON.stringify(tasks, null, 2)
  );
}

main();
```

After running `node index.js`, the new task appeared in `tasks.json`.

### What just happened?

- `fs.readFile()` reads the file's contents.
- `JSON.parse()` converts JSON text into a JavaScript value.
- `Array.prototype.push()` adds a task to the array in memory.
- `JSON.stringify()` converts the updated array back into JSON text.
- `fs.writeFile()` saves the updated data to the file.

**The important takeaway:** The JavaScript array exists in memory while the program runs, but the JSON file stores the data between program executions. As long as the file remains available and intact, the saved tasks can be loaded again when the program restarts.

This approach works for learning, small scripts, and simple prototypes. However, using a file as a database introduces limitations when multiple requests try to modify data, when the data grows, or when an application needs efficient querying and concurrent access. We'll explore those limitations next.
---
if file storage works, why do developers use databases like MongoDB?
3. Next experiment: discover the limitations
Before introducing MongoDB, let's test a fundamental question.

Suppose your TODO application receives 100 simultaneous requests, and every request tries to add a task to tasks.json. What could go wrong?

Think about the read → modify → write sequence. The issue isn't simply that files are slow; it's that multiple operations can interfere with one another.

Once you understand that, we can build a small demonstration of the problem and explain why databases exist.

## step 3 
suppose your orginal file contains task-1,task-2 and task-3
1. Both request the same file 
the concurrency issue in file system 
code : 

const fs = require("node:fs/promises");
const path = require("node:path");

const filePath = path.join(__dirname, "tasks.json");

async function main() {
  // Simulate two requests reading the same file
  const [dataA, dataB] = await Promise.all([
    fs.readFile(filePath, "utf8"),
    fs.readFile(filePath, "utf8"),
  ]);

  const tasksA = JSON.parse(dataA);
  const tasksB = JSON.parse(dataB);

  // Request A adds a task to its copy
  tasksA.push({
    id: 101,
    title: "Task from Request A",
    completed: false,
  });

  // Request B adds a different task to its copy
  tasksB.push({
    id: 102,
    title: "Task from Request B",
    completed: false,
  });

  // Both requests write their versions
  await fs.writeFile(
    filePath,
    JSON.stringify(tasksA, null, 2)
  );

  await fs.writeFile(
    filePath,
    JSON.stringify(tasksB, null, 2)
  );

  console.log("Both requests finished.");
  console.log("Final tasks:", JSON.parse(
    await fs.readFile(filePath, "utf8")
  ));
}

main().catch(console.error);
observe the result : 
1. Both requests read the same file

Request A and Request B each get a copy containing the original three tasks.




2. Each modifies its own copy
- Request A adds Task-101.
- Request B adds Task-102.
Neither copy contains the other's new task.




3. The second write overwrites the first

Request A writes its array, then Request B writes its older copy with Task-102 added.

Result: Task-101 disappears from the final file, while Task-102 remains.

### What happens when multiple requests modify the same file?

To understand the limitations of file-based storage, I created a small experiment simulating two requests adding tasks to the same `tasks.json` file.

Both requests read the file before either update was saved. Each request then modified its own copy of the data and wrote the result back.

The problem was that the second write overwrote the first update. One of the newly added tasks disappeared.

This is an example of a **lost update**, a concurrency problem that can occur when multiple operations read and modify shared data without suitable coordination.

The important lesson is that reading, modifying, and writing a file are separate operations. Simply using asynchronous file APIs does not make the entire sequence atomic.

For a real application, we would need appropriate locking, serialization, or another concurrency-control strategy. As the application's requirements grow, a database can provide useful mechanisms for managing concurrent operations and maintaining data integrity.

This experiment helped me understand why choosing a storage solution involves more than just saving data successfully.