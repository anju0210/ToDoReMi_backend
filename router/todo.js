const express = require('express');
const router = express.Router();
const {Todo, Song} = require('../models/index');
const loginMiddle = require('../middleware/loginMiddle');

router.post('/', loginMiddle, async(req, res)=>{
    const userId = req.userId;
    const {todo, date} = req.body;

  try{
    const songCnt = await Song.count();
    const rand = Math.floor(Math.random()*songCnt);
    const randSong = await Song.findOne({offset: rand});

    const newTodo = await Todo.create({
      todo,
      date,
      completed: false,
      song_id: randSong.id,
      user_id: userId
    });

    res.status(201).json({message: 'todo 생성 성공', todo : newTodo});
  }catch(err){
    res.status(500).json({error: 'todo 생성 실패'});
    console.log(err);
  }
})

router.patch('/status/:id', loginMiddle, async(req, res)=>{
  const todoId = req.params.id;
  const userId = req.userId;

  try{
    const todo = await Todo.findOne({ where: { id: todoId, user_id: userId } });

    if(!todo){
      res.status(404).json({message: 'todo를 찾을 수 없습니다'});
    }

    todo.completed = !todo.completed;

    await todo.save();

    res.status(201).json({message: 'todo 상태 변경 완료', todo : todo});
  }catch(err){
    res.status(500).json({error: 'todo 상태 변경 실패'});
    console.log(err);
  }
})

router.patch('/:id', loginMiddle, async(req, res)=>{
  const todoId = req.params.id;
  const userId = req.userId;
  const {todo} = req.body;

  try{
    const todoItem = await Todo.findOne({ where: { id: todoId, user_id: userId } });

    if(!todoItem){
      res.status(404).json({message: 'todo를 찾을 수 없습니다'});
    }

    todoItem.todo = todo;

    await todoItem.save();
   
    res.status(201).json({message: 'todo 수정 완료', todo : todo});
  }catch(err){
    res.status(500).json({error: 'todo 수정 실패'});
    console.log(err);
  }
})

router.delete('/:id', loginMiddle, async(req, res)=>{
  const todoId = req.params.id;
  const userId = req.userId;

  try{
    await Todo.destroy({ where: { id: todoId, user_id: userId } });
   
    res.status(201).json({message: 'todo 삭제 완료'});
  }catch(err){
    res.status(500).json({error: 'todo 삭제 실패'});
    console.log(err);
  }
})

router.get('/', loginMiddle, async(req, res)=>{
  const userId = req.userId;

  try{
    const count = await Todo.count({ where: { user_id: userId } });
    res.json({ count: count});
  } catch (err) {
    res.status(500).json({ message: '전체 todo 수 조회 에러' });
    console.error(err);
  }
})

router.get('/completed', loginMiddle, async(req, res)=>{
  const userId = req.userId;

  try{
    const count = await Todo.count({ where: { user_id: userId, completed: true } });
    res.json({ completedCount: count});
  } catch (err) {
    res.status(500).json({ message: '완료한 todo 수 조회 에러' });
    console.error(err);
  }
})

router.get('/:date', loginMiddle, async(req, res)=>{
  const userId = req.userId;
  const date = req.params.date;

  try{
    const todos = await Todo.findAll({
      where: {user_id : userId, date: date},
      order: [['id', 'ASC']]
    });

    res.json({todos: todos})
  } catch (err) {
    res.status(500).json({ message: 'todo 조회 에러' });
    console.error(err);
  }
})

module.exports = router;