package com.springboot.CRUD.controller;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.springboot.CRUD.Message.ResponseFile;
import com.springboot.CRUD.Message.ResponseMessage;
import com.springboot.CRUD.exception.TodoCollectionException;
import com.springboot.CRUD.model.FileInfo;
import com.springboot.CRUD.model.TodoDTO;
import com.springboot.CRUD.model.User;
import com.springboot.CRUD.model.Weather;
import com.springboot.CRUD.model.WeatherApi;
import com.springboot.CRUD.repository.TodoRepository;
import com.springboot.CRUD.service.TodoService;

import jakarta.validation.ConstraintViolationException;

@RestController
@CrossOrigin
public class TodoController {
	
	@Autowired
	private TodoRepository todoRepo;
	
	@Autowired
	private TodoService todoService;
	
	@GetMapping("/todos")
	public ResponseEntity<?> getAllTodos()
	{
		List<TodoDTO> todos = todoService.getAllTodos();
		return new ResponseEntity<List<TodoDTO>>(todos, todos.size()>0 ? HttpStatus.OK : HttpStatus.NOT_FOUND );
	}
	
	@PostMapping("/todos")
	public ResponseEntity<?> createTodo(@RequestBody TodoDTO todo)
	{
		try
		{
			todoService.createTodo(todo);
			return new ResponseEntity<TodoDTO>(todo, HttpStatus.OK);
		}
		catch(ConstraintViolationException e)
		{
			return new ResponseEntity<>(e.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
		}
		catch(TodoCollectionException e)
		{
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	
	@GetMapping("/todos/{id}")
	public ResponseEntity<?> getSingleTodo(@PathVariable("id") String id)
	{
		try
		{
			return new ResponseEntity<>(todoService.getSingleTodo(id), HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/todos/{id}")
	public ResponseEntity<?> updateById(@PathVariable("id") String id, @RequestBody TodoDTO todo)
	{
		try
		{
			todoService.updateTodo(id, todo);
			return new ResponseEntity<>("Update Todo With id " +id, HttpStatus.OK);
		}
		catch(ConstraintViolationException e)
		{
			return new ResponseEntity<>(e.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
		}
		catch(TodoCollectionException e)
		{
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("todos/{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") String id)
	{
		try
		{
			todoService.deleteTodoById(id);
			return new ResponseEntity<>("Successfully deleted with id" +id, HttpStatus.OK);
		}
		catch(TodoCollectionException e)
		{
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	
	//creating user data
	
	@PostMapping("/user")
	public ResponseEntity<?> createNewUser(@RequestBody User user)
	{

		
			User user2 =todoService.createUser(user);
			System.out.println(user2);
			
			if(user2!=null)
			{
				
				System.out.println(" working");
		        return new ResponseEntity<User>(user2, HttpStatus.OK);
				
			}
			else
			{
			
			System.out.println("not working");
			return new ResponseEntity<User>(user2, HttpStatus.INTERNAL_SERVER_ERROR);
			}	
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User user)
	{
		User user1=todoService.login(user.getEmail(), user.getPassword());
		
		if(user1 == null)
		{
			return new ResponseEntity<User>(user1, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		else {
			return new ResponseEntity<User>(user1, HttpStatus.OK);
		}
		
	}
	
	
	//for files
	
	@PostMapping("/uploadFile")
	  public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
	    try {
	    	todoService.store(file);
	      return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("file uploaded successfully: " + file.getOriginalFilename()));
	    } catch (Exception e) {
	      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage("Could not upload the file: " + file.getOriginalFilename() + "!"));
	    }
	  }
	
	
	@GetMapping("/getFile")
	  public ResponseEntity<List<ResponseFile>> getListFiles()
	{
	    List<ResponseFile> files = todoService.getAllFiles().map(dbFile -> {
	      String fileDownloadUri = ServletUriComponentsBuilder
	          .fromCurrentContextPath()
	          .path("/download-files/")
	          .path(dbFile.getId())
	          .toUriString();

	      return new ResponseFile(
	          dbFile.getFilename(),
	          fileDownloadUri,
	          dbFile.getType(),
	          dbFile.getId());
	    }).collect(Collectors.toList());

	    return ResponseEntity.status(HttpStatus.OK).body(files);
	  }
	
	@GetMapping("/download-files/{id}")
	public ResponseEntity<?> getFile(@PathVariable String id)
	{
		FileInfo fileDB = todoService.getFile(id);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getFilename() + "\"")
				.body(HttpStatus.OK);
        //		.body(fileDB);
	}
	
	@DeleteMapping("/download-files/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable("id") String id) {
		todoService.deleteFile(id);
        return ResponseEntity.ok().build();
    }
	
	@PostMapping("/uploadFiles")
	public ResponseEntity<ResponseMessage> uploadFiles(@RequestParam("files") MultipartFile[] files) {
	   
	    if(files.length > 5)
		{
			throw new RuntimeException("too many files");
		}
	    
	    try {
	        List<String> fileNames = new ArrayList<>();

	        Arrays.asList(files).stream().forEach(file -> {
	            try {
					todoService.store(file);
				} catch (IOException e) {
					e.printStackTrace();
				}
	            fileNames.add(file.getOriginalFilename());
	        });
	        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Files uploaded successfully: " + fileNames));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage("Could not upload the files!"));
	    }
	}
	
	
	
	
	// for weather
	
	@GetMapping("/weather/{city}")
    public void getWeather(@PathVariable String city) {
          todoService.getweather(city);
    }
	
	@GetMapping("/humid")
	public List<Weather> getData()
	{
		return todoService.getDetails();
	}
	
	
	// for first static way of weather
	@GetMapping("/current")
	public WeatherApi getCurrent() {

		return todoService.getaWeatherDetails();

	}
	
	// for second static way of weather
	@GetMapping("/currentSecond")
	public WeatherApi getaCurrent() {

		return todoService.getWeatherDetail();

	}

	// for third static way of weather
	@GetMapping("/currentThird")
	public WeatherApi getbCurrent() {

		return todoService.getaWeatherDetail();

	}

	@GetMapping("/detailsThird")
	public List<WeatherApi> fetchbData() {
		return todoService.getaWeather();
	}

	
	
	}
	
	
	
	






































//@GetMapping("/todos")
//public ResponseEntity<?> getAllTodos()
//{
//	List<TodoDTO> todos = todoRepo.findAll();
//	if(todos.size() > 0)
//	{
//		return new ResponseEntity<List<TodoDTO>>(todos, HttpStatus.OK);
//	}
//	else
//	{
//		return new ResponseEntity<>("No todos available", HttpStatus.NOT_FOUND);
//	}
//}



//@PostMapping("/todos")
//public ResponseEntity<?> createTodo(@RequestBody TodoDTO todo)
//{
//	try
//	{
//		todo.setCreatedAt(new Date(System.currentTimeMillis()));
//		todoRepo.save(todo);
//		return new ResponseEntity<TodoDTO>(todo, HttpStatus.OK);
//	}
//	catch(Exception e)
//	{
//		return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//	}
//}


//@GetMapping("/todos/{id}")
//public ResponseEntity<?> getSingleTodo(@PathVariable("id") String id)
//{
//	Optional<TodoDTO> todoOptional = todoRepo.findById(id);
//	if(todoOptional.isPresent())
//	{
//		return new ResponseEntity<>(todoOptional.get(),HttpStatus.OK);
//	}
//	else
//	{
//		return new ResponseEntity<>("Todo not found with id" +id, HttpStatus.NOT_FOUND);
//	}
//}


//@PutMapping("/todos/{id}")
//public ResponseEntity<?> updateById(@PathVariable("id") String id, @RequestBody TodoDTO todo)
//{
//	Optional<TodoDTO> todoOptional = todoRepo.findById(id);
//	if(todoOptional.isPresent())
//	{
//		TodoDTO todoToSave=todoOptional.get();
//		todoToSave.setCompleted(todo.getCompleted() != null ? todo.getCompleted() : todoToSave.getCompleted());
//		todoToSave.setTodo(todo.getTodo() != null ? todo.getTodo() : todoToSave.getTodo());
//		todoToSave.setDescription(todo.getDescription() != null? todo.getDescription() :todoToSave.getDescription());
//		todoToSave.setUpdatedAt(new Date(System.currentTimeMillis()));
//		todoRepo.save(todoToSave);
//		return new ResponseEntity<>(todoToSave, HttpStatus.OK);
//	}
//	else
//	{
//		return new ResponseEntity<>("Todo not found with id" +id, HttpStatus.NOT_FOUND);
//	}
//}


//@DeleteMapping("todos/{id}")
//public ResponseEntity<?> deleteById(@PathVariable("id") String id)
//{
//	try
//	{
//		todoRepo.deleteById(id);
//		return new ResponseEntity<>("Successfully deleted with id" +id, HttpStatus.OK);
//	}
//	catch(Exception e)
//	{
//		return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//	}
//}