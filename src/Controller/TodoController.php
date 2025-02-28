<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Form\TodoType;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;


#[Route('/api/todo', name: 'api_todo')]

final class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository){


        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'api_todo_read', methods: ['GET'])]
    public function index()
    {
       $todos = $this->todoRepository->findAll();

       $arrayOfTodos = [];

       foreach ($todos as $todo) {
        $arrayOfTodos[] = $todo->toArray();
       }
       return $this->json($arrayOfTodos);
    }

    #[Route('/create', name: 'api_todo_create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);

        $form = $this->createForm(TodoType::class);
        $form->submit((array)$content);

        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(true, true) as $error) {
                $errors[] = $error->getMessage();
            }
        
            return $this->json([
                'message' => [
                    'text' => $errors, // Tömbként küldjük el!
                    'level' => 'error'
                ]
            ], 400);
        }
        
      /*  if (!isset($content['name'])) {
            return $this->json(['error' => 'Missing name field'], 400);
        }
    
        if (strlen($content['name']) > 10) {
            return $this->json([
                'message' => [
                    'text' => ['Task name cannot exceed 10 characters.'],
                    'level' => 'error'
                ]
            ], 400);
        }*/
    
        $todo = new Todo();
        $todo->setName($content['name']);
        $todo->setDescription($content['description']);
    
        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            return $this->json([
                'message' => [
                    'text' => ['Could not reach database when attempting to create To-Do.'],
                    'level' => 'error'
                ],
                'details' => $exception->getMessage()
            ], 500);
        }
    
        return $this->json([
            'todo' => $todo->toArray(),
            'message' => [
                'text' => ['To-Do has been created!', 'Task: ' . $content['name']],
                'level' => 'success'
            ]
        ]);
    }
    
    


    #[Route('/update/{id}', name: 'api_todo_update', methods: ['PUT'])]
    public function update(Request $request, Todo $todo)
    {
        $content = json_decode($request->getContent(), true);
    
        $form = $this->createForm(TodoType::class);
        $nonObject = (array)$content;
        unset($nonObject['id']);
        $form->submit($nonObject);
    
        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(true, true) as $error) {
                $errors[] = $error->getMessage();
            }
    
            return $this->json([
                'message' => [
                    'text' => $errors, // Tömbként küldjük el, hogy a frontend több sort kezeljen
                    'level' => 'error'
                ]
            ], 400);
        }
    
        if ($todo->getName() === $content['name'] && $todo->getDescription() === $content['description']) {
            return $this->json([
                'message' => [
                    'text' => ['There was no change to the To-Do. Neither the name nor the description was changed.'],
                    'level'=> 'error'
                ]
            ], 400);
        }
    
        $todo->setName($content['name']);
        $todo->setDescription($content['description']);
    
        try {
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            return $this->json([
                'message' => [
                    'text' => ['Could not reach database when attempting to update a To-Do.'],
                    'level' => 'error'
                ],
                'details' => $exception->getMessage()
            ], 500);
        }
    
        return $this->json([
            'todo' => $todo->toArray(),
            'message' => [
                'text' => ['To-Do successfully updated!'],
                'level' => 'success'
            ]
        ]);
    }
    

    #[Route('/delete/{id}', name: 'api_todo_delete', methods: ['DELETE'])]
    public function delete(Todo $todo)
    {
        try{
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
          return $this->json([
            'message' => [
                   'text' => ['Could not reach database when attempting to delete a To-Do.'],
                   'level' => 'error'
                 ],
             'details' => $exception->getMessage()
         ], 500);
        }

        return $this-> json([
          'message' => [
              'text' => ['To-Do successfully deleted!'],
              'level' => 'success'
          ]
      ]);
    }

}
