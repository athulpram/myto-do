const getToDos = function(req, res) {
  let todos = [
    {
      title: "title of todo",
      desc: "todo description",
      items: [
        { desc: "this is first todo", isDone: false },
        { desc: "this is second todo", isDone: false },
        { desc: "this is third todo", isDone: true }
      ]
    },
    {
      title: "title of todo",
      desc: "todo description",
      items: [
        { desc: "this is first todo", isDone: false },
        { desc: "this is second todo", isDone: false },
        { desc: "this is third todo", isDone: true }
      ]
    }
  ];
  res.write(JSON.stringify(todos));
  res.end();
};

module.exports = {
  getToDos
};
