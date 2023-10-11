function addTaskToArray(TaskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: TaskText,
        completed: false
    };

    ArrayOfTasks.push(task);
    addElementsToPageFrom(ArrayOfTasks);
}
